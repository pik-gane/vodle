# Matrix Migration Phase 3 - Poll Room Management

## Overview

Phase 3 implements poll room creation and management using Matrix protocol, building on the user data foundation established in Phases 1-2. Each poll uses a shared poll room for metadata and options, plus a dedicated voter room per (poll, voter) pair for server-side write enforcement of ratings.

## What's Implemented

### 1. Poll Room Creation

Each poll gets a dedicated encrypted Matrix room for shared data:

- **Room Creation**: `createPollRoom(pollId, title)` creates a private, encrypted room
- **Room Alias**: `vodle_poll_{pollId}` for consistent lookup
- **Encryption**: Uses Matrix Megolm (m.megolm.v1.aes-sha2) encryption
- **Equal Permissions**: All human participants have power level 50
- **Guard Bot**: A guard bot (`@vodle-guard:server`) is invited with admin power (100) to enforce deadlines server-side

### 2. Poll Room Lookup

Multiple strategies for finding existing poll rooms:

- **In-Memory Cache**: `pollRooms` Map for fast access
- **Persistent Storage**: Room IDs stored in Ionic Storage
- **Alias Lookup**: Falls back to Matrix room alias resolution
- **Get or Create**: `getOrCreatePollRoom(pollId, title)` combines lookup and creation

### 3. Poll Metadata

Poll metadata stored as a single state event:

- **Event Type**: `m.room.vodle.poll.meta`
- **Content**: `{ poll_id, title, description, due, state, ... }`
- **Operations**:
  - `setPollMetadata(pollId, meta)`: Store/update metadata
  - `getPollMetadata(pollId)`: Retrieve metadata

### 4. Option Management

Options stored as timeline (message) events for server-side immutability:

- **Event Type**: `m.room.vodle.poll.option` (timeline event, not state event)
- **Content**: `{ option_id, name, description, url }`
- **Immutability**: Timeline events cannot be modified or deleted by the Matrix server — this provides server-side enforcement that options are immutable once added
- **Adding**: Any voter can add new options until the poll closes
- **Operations**:
  - `addOption(pollId, optionId, option)`: Add new option (rejects duplicates)
  - `getOption(pollId, optionId)`: Get single option (async, resolves room on first access)
  - `getOptions(pollId)`: Get all options as Map (async, resolves room on first access)

### 5. Voter Invitation

Voters are invited to the shared poll room with equal power levels:

- **Invitation**: `inviteVoter(pollId, voterId)` invites a Matrix user to the poll room
- **Power Level**: Same default power level 50 as all other participants including the creator
- **Equal Permissions**: All human participants can add options; nobody has elevated privileges
- **Voter Room**: Each voter also gets a dedicated voter room (see section 8)

### 6. Poll State Transitions

Poll lifecycle management with room-level enforcement:

- **State Changes**: `changePollState(pollId, newState)` — stores poll state as a
  separate event type (`m.room.vodle.poll.state`) from metadata, so state transitions
  work even after metadata is locked
- **Metadata Lock**: `lockPollMetadata(pollId)` raises metadata, deadline, and power-level
  power requirements to 100. Only the guard bot retains the ability to change these.
- **Read-Only Mode**: `makeRoomReadOnly(pollId)` sets all human user power levels to 0 when closed — guard bot retains admin power
- **Redaction Prevention**: `redact` power level is set to 100 to prevent deletion of timeline events (options)
- **Supported States**: draft → running → closing → closed

### 7. Poll Data CRUD

Generic key-value storage scoped to polls (in poll room):

- **Poll Data**:
  - `setPollData(pollId, key, value)`: Store via `m.room.vodle.poll.data.{key}`
  - `getPollData(pollId, key)`: Retrieve poll data
  - `deletePollData(pollId, key)`: Remove poll data
  - `setPollDeadline(pollId, due)`: Store deadline as unencrypted event for guard bot (validates ISO 8601 format)

### 8. Per-Voter Rooms (Server-Side Write Enforcement)

Each voter gets a dedicated Matrix room per poll for storing ratings and other voter data. This provides **server-side enforcement** analogous to CouchDB validation scripts:

- **Room Creation**: `createVoterRoom(pollId, voterId)` creates a room where only the voter has write power (50)
- **Room Alias**: `vodle_voter_{pollId}_{voterId}` for consistent lookup
- **Power Levels**: Only the voter has write power (50); all others have read-only (0); guard bot has admin (100)
- **Server-Side Enforcement**:
  - **Voter ownership**: The Matrix server rejects writes from anyone except the voter (M_FORBIDDEN)
  - **Deadline**: The guard bot drops the voter's power to 0 at the deadline, so the Matrix server rejects further writes
- **No Timeline Clutter**: Ratings are state events — only the latest value per event type is kept
- **Operations**:
  - `getOrCreateMyVoterRoom(pollId)`: Get or create the current user's voter room
  - `setVoterData(pollId, voterId, key, value)`: Write to voter room (server enforces ownership)
  - `getVoterData(pollId, voterId, key)`: Read from voter room
  - `deleteVoterData(pollId, voterId, key)`: Delete from voter room (server enforces ownership)
  - `makeVoterRoomReadOnly(pollId, voterId)`: Drop voter's power to 0 (called by guard bot at deadline)

### 9. Rating Convenience Methods

Convenience methods for submitting and retrieving ratings:

- **Submit**: `submitRating(pollId, optionId, rating)` — validates range (0-100), writes to voter room
- **Get**: `getVoterRating(pollId, voterId, optionId)` — read any voter's rating
- **Get Own**: `getMyRating(pollId, optionId)` — read current user's rating

### 10. Guard Bot

A dedicated Matrix bot that enforces deadlines server-side:

- **Bot User ID**: Configured in `environment.matrix.guard_bot_user_id`
- **Power Level**: 100 (admin) in all poll and voter rooms
- **Responsibilities**:
  - Monitor poll deadlines via unencrypted `m.room.vodle.poll.deadline` events
  - At deadline: drop all human power levels to 0 in poll room and all voter rooms
  - The bot runs on the server, not in the client — malicious clients cannot prevent it
- **Analogous to**: CouchDB validation scripts that enforce due date checks

## Architecture

### Matrix Room Structure

```
Poll Room (vodle_poll_{pollId}) — shared by all participants
├── State events:
│   ├── m.room.encryption          (Megolm E2EE)
│   ├── m.room.power_levels        (Voters: 50, Guard bot: 100; redact: 100)
│   ├── m.room.vodle.poll.meta     (Poll metadata — encrypted)
│   ├── m.room.vodle.poll.state    (Poll lifecycle state — separate from metadata)
│   ├── m.room.vodle.poll.deadline (Due date — UNENCRYPTED, readable by guard bot)
│   └── m.room.vodle.poll.data.*   (Poll-level data)
└── Timeline events (immutable, append-only, non-redactable):
    └── m.room.vodle.poll.option   (Options — server-side immutable)
        ├── { option_id: "opt1", name, description, url }
        └── { option_id: "opt2", name, description, url }

Voter Room (vodle_voter_{pollId}_{base64url(voterId)}) — per (poll, voter) pair
├── Power levels: voter=50, guard bot=100, everyone else=0
└── State events (only writable by the voter):
    ├── m.room.vodle.voter.rating.opt1  → { value: 75 }
    ├── m.room.vodle.voter.rating.opt2  → { value: 30 }
    └── m.room.vodle.voter.*            → { value: ... }
```

### Backend Abstraction (Updated)

```
┌─────────────────┐
│  Application    │
└────────┬────────┘
         │
┌────────▼──────────────┐
│   DataAdapter         │ ◄── Unified interface
│   (Phase 2-3)         │     Now includes poll methods
└────────┬──────────────┘
         │
    ┌────▼────┐
    │ Feature │
    │  Flag   │
    └────┬────┘
         │
    ┌────▼────────────────────┐
    │                         │
┌───▼───────┐      ┌─────────▼─────┐
│  Matrix   │      │   CouchDB     │
│  Backend  │      │   Backend     │
│ (Phase3)  │      │  (Phase3)     │
└───┬───────┘      └─────────┬─────┘
    │                        │
┌───▼────────┐      ┌────────▼──────┐
│  Matrix    │      │     Data      │
│  Service   │      │    Service    │
└────────────┘      └───────────────┘
```

### IDataBackend Interface (Phase 3 Additions)

```typescript
interface IDataBackend {
  // Phase 1-2 (unchanged)
  init(): Promise<void>;
  login(email, password): Promise<void>;
  register(email, password): Promise<void>;
  logout(): Promise<void>;
  isLoggedIn(): boolean;
  getUserData(key): Promise<any>;
  setUserData(key, value): Promise<void>;
  deleteUserData(key): Promise<void>;
  
  // Phase 3 (new)
  createPoll(pollId, title): Promise<string>;
  getPollData(pollId, key): Promise<any>;
  setPollData(pollId, key, value): Promise<void>;
  deletePollData(pollId, key): Promise<void>;
  getVoterData(pollId, voterId, key): Promise<any>;
  setVoterData(pollId, voterId, key, value): Promise<void>;
  deleteVoterData(pollId, voterId, key): Promise<void>;
  
  getBackendType(): 'couchdb' | 'matrix';
}
```

## Files Modified

### Core Implementation

1. **`src/app/matrix.service.ts`** (extended with Phase 3 methods)
   - `createPollRoom()`: Create encrypted poll rooms with guard bot
   - `getPollRoom()`: Look up poll rooms with caching
   - `getOrCreatePollRoom()`: Get or create poll room
   - `setPollMetadata()` / `getPollMetadata()`: Poll metadata management
   - `setPollDeadline()`: Store deadline as unencrypted event for guard bot
   - `addOption()` / `getOption()` / `getOptions()`: Option management (timeline events)
   - `inviteVoter()`: Voter invitation
   - `changePollState()` / `lockPollMetadata()` / `makeRoomReadOnly()`: State transitions
   - `setPollData()` / `getPollData()` / `deletePollData()`: Poll data CRUD
   - `createVoterRoom()` / `getVoterRoom()` / `getOrCreateMyVoterRoom()`: Per-voter rooms
   - `setVoterData()` / `getVoterData()` / `deleteVoterData()`: Voter data (server-side enforced)
   - `makeVoterRoomReadOnly()`: Deadline enforcement for voter rooms
   - `submitRating()` / `getVoterRating()` / `getMyRating()`: Rating convenience methods

2. **`src/app/data-backend.interface.ts`** (extended)
   - Added `createPoll()`, poll data, and voter data methods

3. **`src/app/matrix-backend.ts`** (extended)
   - Implements Phase 3 IDataBackend methods via MatrixService

4. **`src/app/couchdb-backend.ts`** (extended)
   - Implements Phase 3 IDataBackend methods via DataService

5. **`src/app/data-adapter.service.ts`** (extended)
   - Delegates Phase 3 methods to selected backend

### Tests

6. **`src/app/matrix.service.spec.ts`** (extended)
   - 20+ new tests for Phase 3 poll room methods
   - Tests for method existence, error handling, and edge cases

7. **`src/app/data-adapter.service.spec.ts`** (extended)
   - 7 new tests for Phase 3 poll data methods

## Usage Examples

### Creating a Poll

```typescript
// Using MatrixService directly
const roomId = await matrixService.createPollRoom('poll123', 'Team Lunch Vote');

// Set poll metadata
await matrixService.setPollMetadata('poll123', {
  poll_id: 'poll123',
  title: 'Team Lunch Vote',
  description: 'Where should we eat?',
  due: '2024-03-15T12:00:00Z',
  state: 'draft'
});

// Add options
await matrixService.addOption('poll123', 'opt1', {
  name: 'Pizza Place',
  description: 'Great pizza downtown'
});
await matrixService.addOption('poll123', 'opt2', {
  name: 'Sushi Bar',
  description: 'Fresh sushi nearby'
});
```

### Using DataAdapter (Backend-Agnostic)

```typescript
// Works with both Matrix and CouchDB backends
const pollId = await dataAdapter.createPoll('poll123', 'Team Lunch Vote');

// Store poll data
await dataAdapter.setPollData('poll123', 'description', 'Where should we eat?');
await dataAdapter.setPollData('poll123', 'due', '2024-03-15T12:00:00Z');

// Store voter data
await dataAdapter.setVoterData('poll123', 'voter1', 'rating.opt1', 75);
await dataAdapter.setVoterData('poll123', 'voter1', 'rating.opt2', 50);

// Retrieve data
const rating = await dataAdapter.getVoterData('poll123', 'voter1', 'rating.opt1');
```

### Inviting Voters

```typescript
// Invite a voter to participate
await matrixService.inviteVoter('poll123', '@alice:matrix.org');
await matrixService.inviteVoter('poll123', '@bob:matrix.org');
```

### Closing a Poll

```typescript
// Change state to closed - makes room read-only for everyone
await matrixService.changePollState('poll123', 'closed');
// Nobody can send events (all power levels set to 0)
```

## Permission Model

All human participants (including the poll creator) have **equal power levels (50)**.
A guard bot has admin power (100) in all rooms for deadline enforcement.
This is analogous to CouchDB validation scripts.

### Server-Side Enforcement (CouchDB → Matrix)

| CouchDB Enforcement | Matrix Equivalent |
|---------------------|-------------------|
| `validate_doc_update` rejects writes to other voters' data | Per-voter rooms: only the voter has write power (50) |
| `validate_doc_update` checks `doc.due` date | Guard bot drops power to 0 at deadline |
| Poll metadata immutable after opening | `lockPollMetadata()` raises metadata + power_levels to 100 |
| Options immutable once added | Timeline events (append-only) + redact power 100 (non-redactable) |

### Power Levels

| Role | Poll Room | Voter Room (own) | Voter Room (other's) |
|------|----------|-----------------|---------------------|
| Guard Bot | 100 (admin) | 100 (admin) | 100 (admin) |
| Human Voter | 50 | 50 (write) | 0 (read-only) |
| After Deadline | 0 | 0 | 0 |

### Event Power Requirements (Poll Room)

| Event Type | Kind | Draft | Running | Closed | Description |
|-----------|------|-------|---------|--------|-------------|
| `m.room.vodle.poll.meta` | state | 50 | 100 (locked) | 100 (locked) | Metadata immutable after draft |
| `m.room.vodle.poll.state` | state | 50 | 100 (bot only) | 100 (bot only) | Lifecycle state separate from metadata |
| `m.room.vodle.poll.deadline` | state | 50 | 100 (locked) | 100 (locked) | Deadline locked after draft |
| `m.room.power_levels` | state | 50 | 100 (bot only) | 100 (bot only) | Power levels locked after draft |
| `m.room.vodle.poll.option` | timeline | 50 | 50 | 0 | Options addable until close; immutable + non-redactable |

### Event Power Requirements (Voter Room)

| Event Type | Kind | Before Deadline | After Deadline | Description |
|-----------|------|----------------|---------------|-------------|
| `m.room.vodle.voter.*` | state | 50 (voter only) | 0 (nobody) | Only the voter can write; guard bot closes at deadline |

## Testing

### Unit Tests

```bash
# Run MatrixService tests (37 tests)
ng test --no-watch --browsers=ChromeHeadless --include='**/matrix.service.spec.ts'

# Run DataAdapter tests (14 tests)
ng test --no-watch --browsers=ChromeHeadless --include='**/data-adapter.service.spec.ts'
```

### Manual Testing

1. **Start Matrix homeserver**:
   ```bash
   ./start-matrix-server.sh
   ```

2. **Enable Matrix backend** in `environment.ts`:
   ```typescript
   useMatrixBackend: true
   ```

3. **Create a poll** and verify room creation in Matrix

## Known Limitations

### Phase 3 Scope

- ✅ Poll room creation and management (with guard bot)
- ✅ Poll metadata storage (with deadline event for guard bot)
- ✅ Option management (timeline events — server-side immutable)
- ✅ Voter invitation
- ✅ Poll state transitions
- ✅ Per-voter rooms for server-side write enforcement
- ✅ Rating submission and retrieval (via voter rooms)
- ✅ Guard bot integration (invited to all rooms with admin power)
- ❌ Guard bot implementation (server-side service — Phase 4)
- ❌ Delegation events (Phase 4)
- ❌ Offline queue (Phase 5)

### Current Constraints

1. **Guard Bot Not Yet Implemented**: The guard bot user is invited to rooms and configured, but the actual bot service (monitoring deadlines, closing rooms) is a separate server-side component to be implemented in Phase 4
2. **No Delegation**: Delegation events are defined but not yet handled in Phase 4
3. **Client-Side Fallback**: Until the guard bot is deployed, `makeRoomReadOnly()` and `makeVoterRoomReadOnly()` are called from the client as a fallback

## Next Steps - Phase 4

Phase 4 will implement:
- Guard bot service (monitors deadlines, closes poll and voter rooms)
- Delegation request/response events
- Real-time tally updates via Matrix sync
- Event handlers for live updates

## References

- [MATRIX_PHASE1.md](MATRIX_PHASE1.md) - Phase 1 documentation
- [MATRIX_PHASE2.md](MATRIX_PHASE2.md) - Phase 2 documentation
- [planning/matrix-migration/03-implementation-strategy.md](planning/matrix-migration/03-implementation-strategy.md) - Full strategy
- [Matrix Client-Server API](https://spec.matrix.org/v1.8/client-server-api/)

---

**Phase 3 Complete! Ready for Phase 4 (Voting Implementation).** 🎉
