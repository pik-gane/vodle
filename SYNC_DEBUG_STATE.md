# Real-Time Sync Debugging State — February 17, 2026

## Current Status

**Latest fix deployed and running** at `http://localhost:4200/`. Needs testing by user.

## Architecture Overview

- **Angular/Ionic app** in Docker container `vodle-web`, port 4200, source volume-mounted from `/home/heitzig/Nextcloud/git/vodle`
- **Matrix Synapse** at localhost:8008, v1.142.0, Docker. ADMIN_TOKEN = `syt_ZGlhZ2FkbWlu_rnEdOdrSpfXBqIKLjszJ_3KKNej`
- **matrix-js-sdk v37.5.0**: `startClient({ initialSyncLimit: 10, lazyLoadMembers: true })`, no crypto, in-memory store only (no persistent store)
- **Environment**: `src/environments/environment.ts` has `useMatrixBackend: true`, `tallying.verify_updates: true`
- **CORS constraint**: Synapse doesn't allow `Cache-Control` in request headers. All fetch() calls use only `Authorization` header + `cache: 'no-store'`

### Room Architecture
- **Poll rooms** (public_chat, no E2EE): Poll metadata as state events, options as timeline events, voter announcements as timeline events
- **Voter rooms** (public_chat, no E2EE): One per voter per poll. Ratings stored as state events (`m.room.vodle.voter.rating.rating.{optionId}`). `state_key=''` for real voters, `state_key={vid}` for simulated voters
- **User settings rooms** (private): Per-user settings/poll state

### Key Data Flow
1. **Rating change**: slider → `set_my_own_rating` → `setv` → `setv_in_polldb` → stores in `poll_caches` + fires `matrixService.setVoterData` async
2. **setVoterData**: sends state event `m.room.vodle.voter.rating.rating.{oid}` with `{ value, voter_vid }` to voter room
3. **Incoming sync**: SDK `/sync` → `RoomState.events` emission → `stateRatingHandler` → `handleRatingEvent` → `onRatingUpdate` callback → `poll_caches` + `update_own_rating`
4. **Voter discovery**: `discoverVoterRooms` scans poll room timeline via REST API for `m.room.vodle.voter.announce` events, joins each voter room, populates `voterRooms` and `voterRoomReverseLookup`

### Key Internal Maps (matrix.service.ts)
- `voterRooms`: `Map<"pollId:voterId", roomId>` — cache of voter rooms
- `voterRoomReverseLookup`: `Map<roomId, { pollId, voterId }>` — O(1) event routing
- `voterVidMap`: `Map<"pollId:matrixUserId", vodleVid>` — Matrix ID → vodle vid
- `pollEventHandlersSetup`: `Set<pollId>` — prevents duplicate handler registration
- `voterDiscoveryTimers`: `Map<pollId, intervalId>` — periodic discovery timers

### Key Internal Maps (data.service.ts)
- `poll_caches`: `{ [pollId]: { [key]: value } }` — key format: `voter.{vid}§rating.{oid}`
- `_matrixPollListeners`: `{ [pollId]: { onRatingUpdate, onDataChange } }` — prevents duplicate registration

## Root Cause of Real-Time Sync Failure (Phase 33)

Diagnosed from creator.log (6784 lines) and joiner.log (21420 lines) from test poll TEST_683542:

### Finding 1: Creator's SDK fires ZERO events after initial sync
- All 146 `[GLOBAL RoomState.events]` occurred during initial sync (lines 1-151)
- After initial sync completed, no further state events were emitted
- 0 `Room.timeline` events fired at all (despite handler being registered)
- The SDK sync loop appears to be running (no `stopClient` called), but incremental sync responses don't trigger event emissions
- This could be a matrix-js-sdk v37.5.0 issue with in-memory-only stores, or related to how events are processed during incremental sync

### Finding 2: `discoverVoterRooms` was never called
- It was only called from inside `getRatings()` behind a ratingCaches check
- For the creator publishing a fresh poll, `getRatings()` with the `ratingCaches` populated path was used, so `discoverVoterRooms` was skipped
- Result: `voterRoomReverseLookup` was empty when stateRatingHandler ran during initial sync
- The stateRatingHandler DID fire for the joiner's voter room but couldn't dispatch: "No lookup or pollId mismatch. reverseLookup keys: (empty)"

### Finding 3: Joiner's ratings ARE correctly submitted
- Joiner.log confirms ratings dispatched for all 5 options (0bc9, 6db4, ba3f, f0e6, 9fac)
- State events stored on server (verified via admin API)
- Both users confirmed as joined members in each other's voter rooms

## Fix Applied (February 17, 2026)

Changes in `src/app/matrix.service.ts`:

### 1. Sync state monitor
Replaced noisy GLOBAL diagnostic with `'sync'` event listener:
```
[MatrixSync] PREPARED -> SYNCING
```
This logs state transitions so we can detect if the sync loop stops.

### 2. `discoverVoterRooms` called from `setupPollEventHandlers`
Now voter rooms are always discovered when handlers are set up, populating the reverse lookup BEFORE events arrive.

### 3. New method: `retroactiveScanVoterRooms(pollId)`
After discovery, iterates all voter rooms in `voterRoomReverseLookup` for the poll, reads the SDK's in-memory `room.currentState.events` (a `Map<eventType, Map<stateKey, MatrixEvent>>`), and calls `handleRatingEvent` for each rating. This catches events from the initial sync that were missed because handlers/lookup weren't ready.

### 4. New method: `startPeriodicVoterDiscovery(pollId)`
Every 15 seconds, re-runs `discoverVoterRooms` (1 REST request to poll room timeline). When new voter rooms are found, runs `retroactiveScanVoterRooms` to process their current state. Guards against concurrent execution and duplicate timers.

### 5. Cleanup
- Timers cleaned up in `teardownPollEventHandlers` and `logout`
- `voterDiscoveryTimers: Map<string, any>` field added to class
- Reduced diagnostic noise (removed verbose per-event stateRatingHandler logging)

## Testing Protocol

1. Create a fresh test poll as creator
2. Have joiner join via magic link
3. Joiner changes ratings → creator should see changes within 15 seconds
4. Creator changes ratings → joiner should see changes within 15 seconds
5. Check console for `[retroactiveScan]`, `[periodicDiscovery]`, `[MatrixSync]` logs

## Known Remaining Issues

### Option resorting on reload
After creator reloads, shows updated results but doesn't resort options. Not investigated yet.

### SDK incremental sync event emission
Even with the periodic discovery + retroactive scan workaround, real-time event-driven sync may not work if the SDK doesn't emit `RoomState.events` during incremental sync. The periodic discovery (15s) provides near-real-time updates as a fallback. Root cause of SDK event emission failure is unknown — could be:
- matrix-js-sdk v37.5.0 bug with in-memory store
- Missing store configuration
- Issue with how `_createAndReEmitRoom` works for rooms joined via `joinRoom` during runtime vs initial sync
- The SDK's `setStateEvents` at room-state.js L333 DOES emit `RoomStateEvent.Events` for every state event during `injectRoomEvents`, so the issue may be in the sync response processing path

### User constraints
- "DON'T CHANGE ANY DESIGN CHOICES!"
- "This is NOT AN MVP! It's a production-level app!"
- Issues are in data-service/matrix code, not in poll/tally logic
- Old CouchDB version worked fine — all issues are in Matrix migration

## Key Files

| File | Lines | Purpose |
|------|-------|---------|
| `src/app/matrix.service.ts` | ~3950 | Matrix SDK integration, room management, event handlers |
| `src/app/data.service.ts` | ~3438 | Data layer, poll_caches, bridges Matrix events to tally |
| `src/app/poll.service.ts` | ~2001 | Poll/tally logic, `update_own_rating`, `tally_all` |
| `src/app/poll/poll.page.ts` | ~825 | UI, `onDataChange` → `tally_all` + `update_order` |
| `src/environments/environment.ts` | - | `useMatrixBackend: true` |

## Key Line References (approximate, may shift with edits)

### matrix.service.ts
- `initializeWithToken`: ~L275 — client creation, startClient, sync monitor
- `waitForSync`: ~L315 — waits for 'PREPARED' state
- `voterRoomReverseLookup`: L171 — field declaration
- `voterDiscoveryTimers`: ~L199 — field declaration
- `getOrCreateMyVoterRoom`: ~L1920+ — voter room creation with mutex
- `announceVoterRoom`: ~L1985 — sends voter announce timeline event
- `retroactiveScanVoterRooms`: ~L2015 — new method, scans in-memory state
- `startPeriodicVoterDiscovery`: ~L2055 — new method, 15s interval
- `discoverVoterRooms`: ~L2095 — REST API timeline scan for announce events
- `setupPollEventHandlers`: ~L2860 — registers SDK event listeners + calls discover + retro scan
- `handleRatingEvent`: ~L3020 — resolves vodle vid, notifies listeners
- `setVoterData`: ~L2260 — sends state event to voter room
- `teardownPollEventHandlers`: ~L3290 — cleanup including timers

### data.service.ts
- `connect_to_remote_poll_db`: ~L920 — Matrix path: creates voter room, warmupCache, loads data, bridges ratings, calls start_poll_sync
- `change_poll_state`: ~L1181 — Matrix publish path, calls start_poll_sync at end
- `start_poll_sync`: ~L1689 — registers onRatingUpdate + onDataChange listeners, calls setupPollEventHandlers
- `setv_in_polldb`: ~L2181 — stores in poll_caches, fires matrixService.setVoterData async
- `replicate_once`: ~L1352 — returns Promise.resolve(true) immediately in Matrix mode
- `get_remote_poll_state_doc`: ~L1409 — returns dummy doc in Matrix mode

### poll.service.ts
- `Poll.end()`: ~L1821 — Matrix-mode early return skips PouchDB operations
- `set_my_own_rating`: L519 — entry point for rating changes
- `update_own_rating`: L1268 — incremental tally update
- `tally_all()`: L1183 — full tally recomputation

## Build & Deploy Commands

```bash
# Build locally
cd /home/heitzig/Nextcloud/git/vodle && npx ng build

# Container serves via ng serve (volume-mounted source)
docker restart vodle-web

# Wait ~3-4 minutes for build inside container
docker logs vodle-web --tail 5

# Verify deployed code
curl -s http://localhost:4200/main.js | grep -c "retroactiveScan"
```

## All Completed Fixes (Phases 1-33)

1. Magic link port fix
2. Joinpoll functionality
3. 403 join forbidden → power levels
4. Rate limiting relaxed on Synapse
5. Options storage as timeline events
6. Encryption removal
7. Voter room architecture
8. CORS fix (no Cache-Control header)
9. validatePollRoomPowerLevels → warn-only
10. Poll data loading fix
11. getRatings/getAllPollData → REST API
12. Ratings bridge
13. Vid mapping
14. Creator missing metadata race condition fix
15. Power level 403 error fix
16. Simulated voters state_key fix
17. Rating change sync (onRatingUpdate handler)
18. M_ROOM_IN_USE → voterRoomCreationMutex
19. Share page timing → _matrixStateChangePromises
20. Polling fallback removed (would cause N×M fetches)
21. PouchDB end() crash → Matrix-mode early return
22. replicate_once / get_remote_poll_state_doc → Matrix guards
23. Creator start_poll_sync → added to change_poll_state
24. **Sync fix: discoverVoterRooms + retroactiveScan + periodicDiscovery** ← LATEST
