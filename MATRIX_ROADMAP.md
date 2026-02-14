# Matrix Migration Roadmap — Path to a Fully Functional, Matrix-Only App

## Executive Summary

The Matrix backend infrastructure (MatrixService, IDataBackend, DataAdapter) is
fully implemented and tested. What remains is **wiring the main app to use it**.
The main app currently accesses all data through `GlobalService.D` (DataService),
which uses CouchDB/PouchDB. DataService already delegates user data
(`getu`/`setu`/`delu`) to Matrix when the flag is set, but poll data and voter
data still always go to CouchDB.

**Goal**: Make the app fully functional using only the Matrix backend, with no
CouchDB dependency.

**Approach**: Extend the existing conditional pattern in DataService (the same
`if (environment.useMatrixBackend)` approach already used in `getu`/`setu`/`delu`)
to cover poll data, voter data, and poll lifecycle operations. This is the
smallest-change path — no refactoring of GlobalService or app components needed.

---

## Current Architecture

```
┌─────────────────────────────────────────────────────────┐
│ App Components (poll.page, mypolls, settings, etc.)     │
│                        │                                │
│                        ▼                                │
│              ┌──────────────────┐                       │
│              │  GlobalService   │                       │
│              │  (G.D = DataService)                     │
│              └──────────────────┘                       │
│                        │                                │
│                        ▼                                │
│              ┌──────────────────┐    ┌────────────────┐ │
│              │  DataService     │───▶│ MatrixService  │ │
│              │                  │    │ (52+ methods)  │ │
│              │  getu/setu/delu ─┼──▶ │ ✅ Connected   │ │
│              │  getp/setp/delp ─┼──✗ │ ❌ Not wired   │ │
│              │  getv/setv/delv ─┼──✗ │ ❌ Not wired   │ │
│              │  change_poll_    │    │                │ │
│              │   state         ─┼──✗ │ ❌ Not wired   │ │
│              │  connect_to_    │    │                │ │
│              │   remote_poll_db┼──✗ │ ❌ Not wired   │ │
│              └──────────────────┘    └────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## Phase 10: Wire Poll Data to Matrix

**Goal**: `getp()`, `setp()`, `delp()` delegate to MatrixService when flag is on.

**Why first**: Poll metadata (title, description, options, state, due date) must
work before anything else can function.

### Files to change

| File | Method | Change |
|------|--------|--------|
| `src/app/data.service.ts` | `getp()` (L1596) | Add `if (environment.useMatrixBackend)` branch that reads from poll cache, which is populated from Matrix |
| `src/app/data.service.ts` | `setp()` (L1613) | Add Matrix branch: for draft polls, store locally; for non-draft, call `matrixService.setPollData()` |
| `src/app/data.service.ts` | `delp()` (L1645) | Add Matrix branch: call `matrixService.deletePollData()` |
| `src/app/data.service.ts` | `_setp_in_polldb()` (L1723) | Add Matrix branch: call `matrixService.setPollData()` instead of PouchDB store |

### Implementation pattern (same as existing `setu`):

```typescript
// In getp():
if (environment.useMatrixBackend) {
  // For non-draft polls, data comes from Matrix via poll_caches
  // (populated during sync/init). Draft polls remain in user_cache.
  if (this.pid_is_draft(pid)) {
    const ukey = get_poll_key_prefix(pid) + key;
    return this.user_cache[ukey] || '';
  }
  this.ensure_poll_cache(pid);
  return this.poll_caches[pid][key] || '';
}

// In setp() — add Matrix branch in the non-draft, non-userdb path:
if (environment.useMatrixBackend && !this.pid_is_draft(pid) 
    && !poll_keystarts_in_user_db.includes(subkey)) {
  this.poll_caches[pid][key] = value;
  this.matrixService.setPollData(pid, key, value).catch(err => {
    this.G.L.error("DataService.setp Matrix sync failed", pid, key, err);
  });
  return true;
}
```

### How to test

1. Set `useMatrixBackend: true` in environment.ts
2. Start a local Matrix homeserver (Synapse)
3. Create a poll → verify poll metadata appears as Matrix state events
4. Read poll data → verify it reads from Matrix room state
5. Run existing unit tests to verify no regressions

### Dependencies

- MatrixService methods used: `setPollData()`, `getPollData()`, `deletePollData()`
- These are already implemented (Phase 3)

---

## Phase 11: Wire Voter Data to Matrix

**Goal**: `getv()`, `setv()`, `delv()`, `setv_in_polldb()` delegate to Matrix.

**Why second**: Voter data (ratings, nicknames, delegation) depends on poll
rooms existing first.

### Files to change

| File | Method | Change |
|------|--------|--------|
| `src/app/data.service.ts` | `getv()` (L1674) | Add Matrix branch for non-draft polls: read from `matrixService.getVoterData()` |
| `src/app/data.service.ts` | `setv()` (L1693) | Add Matrix branch for non-draft polls |
| `src/app/data.service.ts` | `delv()` (L1709) | Add Matrix branch for non-draft polls |
| `src/app/data.service.ts` | `setv_in_polldb()` (L1772) | Add Matrix branch: call `matrixService.setVoterData()` |

### Implementation pattern:

```typescript
// In setv_in_polldb():
if (environment.useMatrixBackend) {
  const pkey = this.get_voter_key_prefix(pid, vid) + key;
  this.ensure_poll_cache(pid);
  this.poll_caches[pid][pkey] = value;
  this.matrixService.setVoterData(pid, vid || this.getp(pid, 'myvid'), key, value)
    .catch(err => {
      this.G.L.error("DataService.setv_in_polldb Matrix sync failed", pid, key, err);
    });
  return true;
}
```

### Key consideration: voter room creation

When `setv_in_polldb()` is called for the first time for a voter in a poll, the
Matrix voter room may not exist yet. `MatrixService.getOrCreateMyVoterRoom()`
handles this automatically — it creates the room on first access.

### Dependencies

- MatrixService methods: `setVoterData()`, `getVoterData()`, `deleteVoterData()`,
  `getOrCreateMyVoterRoom()`
- All already implemented (Phase 3)
- **Requires Phase 10** (poll rooms must exist)

---

## Phase 12: Wire Poll Lifecycle to Matrix

**Goal**: Poll state transitions (draft→running→closed) work with Matrix.

**Why third**: The poll lifecycle (creating rooms, changing states, connecting)
depends on both poll data and voter data working.

### Files to change

| File | Method | Change |
|------|--------|--------|
| `src/app/data.service.ts` | `change_poll_state()` (L1059) | Add Matrix branch: create Matrix poll room on draft→running, update state via `matrixService.changePollState()` |
| `src/app/data.service.ts` | `connect_to_remote_poll_db()` (L897) | Add Matrix branch: join Matrix poll room + create voter room instead of PouchDB replication |
| `src/app/data.service.ts` | `wait_for_poll_db()` | Add Matrix branch: wait for Matrix room sync |
| `src/app/data.service.ts` | `poll_has_db_credentials()` | Add Matrix branch: always return true (Matrix handles auth differently) |

### change_poll_state — Matrix branch:

```typescript
if (environment.useMatrixBackend) {
  if (old_state == 'draft') {
    // Create Matrix poll room with all draft data
    const title = this.getp(pid, 'title');
    await this.matrixService.createPollRoom(pid, title);
    
    // Set deadline for guard bot
    await this.matrixService.setPollDeadline(pid, p.due.toISOString());
    
    // Move all draft data to Matrix poll room
    for (const [ukey, value] of Object.entries(this.user_cache)) {
      if (ukey.startsWith(prefix)) {
        const key = ukey.substring(prefix.length);
        const subkey = (key+'.').slice(0, (key+'.').indexOf('.'));
        if (key != 'state' && key != 'due' 
            && !poll_keystarts_in_user_db.includes(subkey)) {
          await this.matrixService.setPollData(pid, key, value as string);
          this.delu(ukey);
        }
      }
    }
    
    // Lock metadata (raises power levels)
    await this.matrixService.lockPollMetadata(pid);
  }
  
  // Update state in Matrix
  await this.matrixService.changePollState(pid, new_state);
  this.setu(prefix + 'state', new_state);
  return;
}
```

### connect_to_remote_poll_db — Matrix branch:

```typescript
if (environment.useMatrixBackend) {
  // Join the poll room (instead of CouchDB replication)
  const pollRoom = await this.matrixService.getOrCreatePollRoom(pid, '');
  
  // Create voter room
  const myvid = this.getp(pid, 'myvid');
  await this.matrixService.getOrCreateMyVoterRoom(pid);
  
  // Sync poll data from Matrix to local cache
  await this.matrixService.warmupCache(pid);
  // ... populate poll_caches[pid] from Matrix data
  
  return;
}
```

### Dependencies

- MatrixService methods: `createPollRoom()`, `changePollState()`,
  `lockPollMetadata()`, `setPollDeadline()`, `getOrCreateMyVoterRoom()`,
  `warmupCache()`
- All already implemented (Phases 3-5)
- **Requires Phase 10 + 11**

---

## Phase 13: Wire Poll Joining (Magic Links) to Matrix

**Goal**: Joining a poll via magic link creates a Matrix room membership
instead of a CouchDB replication.

### Current magic link format
```
http://host/#/joinpoll/{db_server_url}/{db_password}/{pid}/{poll_password}
```

### New magic link format for Matrix
The magic link format needs to change because Matrix doesn't use db_server_url
or db_password. Options:

**Option A**: Keep same URL format, ignore CouchDB params when Matrix is active:
```
http://host/#/joinpoll/{ignored}/{ignored}/{pid}/{poll_password}
```

**Option B**: New URL format for Matrix:
```
http://host/#/joinpoll-matrix/{pid}/{poll_password}
```

**Recommended: Option A** — simplest, backward compatible during migration.

### Files to change

| File | Method | Change |
|------|--------|--------|
| `src/app/joinpoll/joinpoll.page.ts` | `onDataReady()` (L69) | Add Matrix branch: join Matrix poll room instead of CouchDB connect |
| `src/app/data.service.ts` | `connect_to_remote_poll_db()` | Already handled in Phase 12 |
| `src/app/inviteto/inviteto.page.ts` | Magic link generation | Update to generate Matrix-compatible links |

### joinpoll — Matrix branch:

```typescript
if (environment.useMatrixBackend) {
  // Join the Matrix poll room
  await this.G.D.matrixService.getOrCreatePollRoom(pid, '');
  
  // Create voter room
  p.init_myvid();
  await this.G.D.matrixService.getOrCreateMyVoterRoom(pid);
  
  // Sync poll data
  await this.G.D.matrixService.warmupCache(pid);
  
  // Navigate to poll
  this.router.navigate(['/poll/' + pid]);
}
```

### Dependencies

- **Requires Phase 12** (poll lifecycle must work)
- MatrixService methods: already implemented

---

## Phase 14: Wire Real-Time Sync to Matrix

**Goal**: Poll data changes from other voters appear in real-time (replaces
CouchDB live replication).

### Current CouchDB sync
DataService uses PouchDB live replication with `sync_handler.on('change', ...)`
to detect remote changes and update `poll_caches`.

### Matrix replacement
MatrixService already has `setupPollEventHandlers()` (Phase 4) which uses
Matrix SDK's event listeners. Need to wire these into DataService.

### Files to change

| File | Method | Change |
|------|--------|--------|
| `src/app/data.service.ts` | `start_poll_sync()` or equivalent | Add Matrix branch: call `matrixService.setupPollEventHandlers()` |
| `src/app/data.service.ts` | Data change callback | Update `poll_caches` when Matrix events arrive |
| `src/app/data.service.ts` | `stop_poll_sync()` | Add Matrix branch: call `matrixService.teardownPollEventHandlers()` |

### Implementation:

```typescript
if (environment.useMatrixBackend) {
  // Register for real-time updates
  this.matrixService.addPollEventListener(pid, (event) => {
    // Update local cache
    const key = event.key;
    const value = event.value;
    this.poll_caches[pid][key] = value;
    
    // Trigger UI update (same mechanism as CouchDB sync)
    this.G.P.on_data_change(pid, key, value);
  });
  
  await this.matrixService.setupPollEventHandlers(pid);
}
```

### Dependencies

- MatrixService methods: `setupPollEventHandlers()`, `addPollEventListener()`,
  `teardownPollEventHandlers()`
- All already implemented (Phase 4)
- **Requires Phase 12**

---

## Phase 15: Wire Ratings & Delegation to Matrix

**Goal**: Rating submission and delegation use Matrix events.

### Current flow
- Ratings stored via `setv_in_polldb(pid, 'rating.' + oid, value)` → CouchDB
- Delegation via DelegationService → DataService → CouchDB

### Matrix replacement
MatrixService already has `submitRating()`, `getRatings()`,
`requestDelegation()`, `respondToDelegation()` (Phase 4).

### Files to change

| File | Change |
|------|--------|
| `src/app/data.service.ts` | Rating writes in `setv_in_polldb()` already covered by Phase 11's voter data wiring. Ratings are just voter data with key `rating.{oid}`. |
| `src/app/delegation.service.ts` | Add Matrix branch for delegation operations |

### Key insight

**Ratings are already covered by Phase 11** — they're stored as voter data
(`setv_in_polldb(pid, 'rating.' + oid, rating_value)`). No additional wiring
needed if Phase 11 is done correctly.

Delegation needs its own wiring in `delegation.service.ts`.

### Dependencies

- **Requires Phase 11** (voter data)
- MatrixService delegation methods: already implemented (Phase 4)

---

## Phase 16: Enable Matrix Backend & End-to-End Testing

**Goal**: Flip the switch, test everything.

### Steps

1. **Set `useMatrixBackend: true`** in `src/environments/environment.ts`
2. **Deploy a test Matrix homeserver** (Synapse or Dendrite on localhost:8008)
3. **Test full poll lifecycle**:
   - Register/login → user data stored in Matrix
   - Create poll (draft) → data in local cache
   - Open poll (draft→running) → Matrix poll room created
   - Share magic link → join poll room
   - Submit ratings → voter data in Matrix voter rooms
   - Close poll → tally computed from Matrix data
4. **Test edge cases**:
   - Offline/online transitions
   - Multiple voters in same poll
   - Poll expiry (guard bot deadline enforcement)
5. **Remove CouchDB code** (optional, can be done later)

### Files to change

| File | Change |
|------|--------|
| `src/environments/environment.ts` | Set `useMatrixBackend: true` |
| `src/environments/environment.prod.ts` | Set `useMatrixBackend: true` (when ready for production) |

---

## Phase 17: Remove CouchDB (Final Cleanup)

**Goal**: Remove PouchDB dependency and all CouchDB-specific code.

### Steps

1. Remove `pouchdb` from `package.json`
2. Remove CouchDB-specific methods from `data.service.ts`
3. Remove `CouchDBBackend` class
4. Remove conditional branches (only Matrix path remains)
5. Simplify `DataService` or replace with `DataAdapter`
6. Update environment configs to remove `data_service` section
7. Update documentation

**This phase is optional and can be deferred** — the app will work fine with
the CouchDB code present but dormant.

---

## Dependency Graph

```
Phase 10: Poll Data ──────────────┐
                                  │
Phase 11: Voter Data ─────────────┤
                                  │
Phase 12: Poll Lifecycle ─────────┤── Phase 13: Magic Links
                                  │
Phase 14: Real-Time Sync ─────────┤
                                  │
Phase 15: Ratings & Delegation ───┘
                                  │
                                  ▼
                    Phase 16: Enable & Test
                                  │
                                  ▼
                    Phase 17: Remove CouchDB
```

Phases 10-11 can be done in parallel. Phase 12 depends on both.
Phases 13-15 depend on Phase 12.
Phase 16 requires all of 10-15.
Phase 17 is optional cleanup.

---

## Effort Estimates

| Phase | Effort | Risk | Notes |
|-------|--------|------|-------|
| 10: Poll Data | Small | Low | Pattern already exists in getu/setu |
| 11: Voter Data | Small | Low | Same pattern as Phase 10 |
| 12: Poll Lifecycle | Medium | Medium | Most complex — state machine + room creation |
| 13: Magic Links | Small | Low | URL handling change |
| 14: Real-Time Sync | Medium | Medium | Event plumbing, cache invalidation |
| 15: Ratings & Delegation | Small | Low | Mostly covered by Phase 11 |
| 16: Enable & Test | Medium | High | Integration testing, homeserver setup |
| 17: Remove CouchDB | Small | Low | Optional cleanup |

**Total remaining effort**: ~6-8 focused coding sessions.

The MatrixService API is already fully implemented (52+ methods, Phases 1-5).
The remaining work is purely **wiring** — adding `if (environment.useMatrixBackend)`
conditional branches to DataService methods, following the exact same pattern
that already works for user data.

---

## Infrastructure Requirements

### For Development/Testing

1. **Matrix homeserver**: Run Synapse locally
   ```bash
   docker run -d --name synapse \
     -p 8008:8008 \
     -v /tmp/synapse-data:/data \
     -e SYNAPSE_SERVER_NAME=localhost \
     -e SYNAPSE_REPORT_STATS=no \
     matrixdotorg/synapse:latest generate
   
   docker start synapse
   ```

2. **Environment config**: Already configured in `environment.ts`:
   ```typescript
   matrix: {
     homeserver_url: "http://localhost:8008",
     enable_e2ee: true,
     guard_bot_user_id: "@vodle-guard:localhost",
   }
   ```

3. **Guard bot** (for poll deadline enforcement):
   - Not yet implemented as a deployable service
   - Can be deferred — polls will work without automatic closing
   - Manual poll closing still works

### For Production

1. **Matrix homeserver** at `matrix.example.com` (update `environment.prod.ts`)
2. **Guard bot service** (Python or Node.js, see `planning/matrix-migration/05-server-side-poll-closing.md`)
3. **TLS certificates** for homeserver
4. **User registration** configured on homeserver

---

## Quick Reference: MatrixService Methods Available

All of these are already implemented and tested:

| Category | Methods |
|----------|---------|
| Auth | `login()`, `register()`, `logout()`, `isLoggedIn()`, `getUserId()` |
| User Data | `getUserData()`, `setUserData()`, `deleteUserData()` |
| Poll Rooms | `createPollRoom()`, `getPollRoom()`, `getOrCreatePollRoom()` |
| Poll Data | `setPollData()`, `getPollData()`, `deletePollData()` |
| Poll Meta | `setPollMetadata()`, `getPollMetadata()`, `setPollDeadline()` |
| Options | `addOption()`, `getOption()`, `getOptions()` |
| State | `changePollState()`, `lockPollMetadata()`, `makeRoomReadOnly()` |
| Voter Rooms | `createVoterRoom()`, `getOrCreateMyVoterRoom()` |
| Voter Data | `setVoterData()`, `getVoterData()`, `deleteVoterData()` |
| Ratings | `submitRating()`, `getRatings()`, `getMyRating()` |
| Delegation | `requestDelegation()`, `respondToDelegation()`, `getDelegations()` |
| Events | `setupPollEventHandlers()`, `addPollEventListener()`, `teardownPollEventHandlers()` |
| Offline | `enqueueOfflineEvent()`, `processOfflineQueue()`, `clearOfflineQueue()` |
| Encryption | `encryptWithPassword()`, `decryptWithPassword()` |
| Cache | `warmupCache()`, `warmupUserDataCache()` |

---

## Summary

The hardest part is done — MatrixService is fully implemented with 52+ methods.
What remains is straightforward **plumbing work**: adding conditional branches
to DataService methods following the same pattern that already works for user
data. The app's architecture (GlobalService → DataService) doesn't need to
change. No component refactoring is needed. Each phase is a focused set of
changes to `data.service.ts` (and a few related files), following an
established pattern.
