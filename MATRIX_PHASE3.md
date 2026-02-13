# Matrix Migration Phase 3 - Poll Room Management

## Overview

Phase 3 implements poll room creation and management using Matrix protocol, building on the user data foundation established in Phases 1-2. Each poll gets its own encrypted Matrix room where poll metadata, options, and voter data are stored as state events.

## What's Implemented

### 1. Poll Room Creation

Each poll gets a dedicated encrypted Matrix room:

- **Room Creation**: `createPollRoom(pollId, title)` creates a private, encrypted room
- **Room Alias**: `vodle_poll_{pollId}` for consistent lookup
- **Encryption**: Uses Matrix Megolm (m.megolm.v1.aes-sha2) encryption
- **Equal Permissions**: All participants (including the creator) have power level 50 — no elevated creator privileges

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

Options stored as individual state events with option ID as state key:

- **Event Type**: `m.room.vodle.poll.option`
- **State Key**: Option ID (e.g., `opt1`, `opt2`)
- **Content**: `{ name, description, url }`
- **Operations**:
  - `addOption(pollId, optionId, option)`: Add/update option
  - `getOption(pollId, optionId)`: Get single option
  - `getOptions(pollId)`: Get all options as Map

### 5. Voter Invitation

Voters are invited to poll rooms with equal power levels:

- **Invitation**: `inviteVoter(pollId, voterId)` invites a Matrix user
- **Power Level**: Same default power level 50 as all other participants including the creator
- **Equal Permissions**: All participants can send rating and delegation events; nobody has elevated privileges

### 6. Poll State Transitions

Poll lifecycle management with room-level enforcement:

- **State Changes**: `changePollState(pollId, newState)`
- **Metadata Lock**: `lockPollMetadata(pollId)` raises metadata power requirement to 100 when poll starts — since all users are at 50, metadata becomes immutable
- **Read-Only Mode**: `makeRoomReadOnly(pollId)` sets all user power levels to 0 when closed — nobody can send events
- **Supported States**: draft → running → closing → closed

### 7. Poll & Voter Data CRUD

Generic key-value storage scoped to polls and voters:

- **Poll Data**:
  - `setPollData(pollId, key, value)`: Store via `m.room.vodle.poll.data.{key}`
  - `getPollData(pollId, key)`: Retrieve poll data
  - `deletePollData(pollId, key)`: Remove poll data

- **Voter Data**:
  - `setVoterData(pollId, voterId, key, value)`: Store via `m.room.vodle.voter.{key}` with voter ID as state key
  - `getVoterData(pollId, voterId, key)`: Retrieve voter data
  - `deleteVoterData(pollId, voterId, key)`: Remove voter data

## Architecture

### Matrix Room Structure

```
Poll Room (vodle_poll_{pollId})
├── m.room.encryption          (Megolm E2EE)
├── m.room.power_levels        (All participants: 50, equal permissions)
├── m.room.vodle.poll.meta     (Poll metadata - state_key: '')
├── m.room.vodle.poll.option   (Options - state_key: optionId)
│   ├── state_key: "opt1"      → { name, description, url }
│   ├── state_key: "opt2"      → { name, description, url }
│   └── ...
├── m.room.vodle.poll.data.*   (Poll-level data - state_key: '')
└── m.room.vodle.voter.*       (Voter data - state_key: voterId)
    ├── state_key: "voter1"    → { value }
    ├── state_key: "voter2"    → { value }
    └── ...
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
   - `createPollRoom()`: Create encrypted poll rooms
   - `getPollRoom()`: Look up poll rooms with caching
   - `getOrCreatePollRoom()`: Get or create poll room
   - `setPollMetadata()` / `getPollMetadata()`: Poll metadata management
   - `addOption()` / `getOption()` / `getOptions()`: Option management
   - `inviteVoter()`: Voter invitation
   - `changePollState()` / `lockPollMetadata()` / `makeRoomReadOnly()`: State transitions with equal permissions
   - `setPollData()` / `getPollData()` / `deletePollData()`: Poll data CRUD
   - `setVoterData()` / `getVoterData()` / `deleteVoterData()`: Voter data CRUD

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

All participants (including the poll creator) have **equal power levels**.
Once a poll leaves draft state, the creator becomes a simple voter with no
special privileges. Nobody can change poll metadata after the poll starts.

### Power Levels by Poll State

| Poll State | All Participants | Can Do |
|-----------|-----------------|--------|
| Draft | 50 | Set metadata, add options, vote |
| Running | 50 | Submit ratings, delegate (metadata & options locked) |
| Closed | 0 | Read-only access |

### Event Power Requirements

| Event Type | Draft | Running/Closed | Description |
|-----------|-------|---------------|-------------|
| `m.room.vodle.poll.meta` | 50 | 100 (locked) | Metadata immutable after draft |
| `m.room.vodle.poll.option` | 50 | 100 (locked) | No new options after draft |
| `m.room.vodle.vote.rating` | 50 | 50 → 0 | Voters can rate until closed |
| `m.room.vodle.vote.delegation` | 50 | 50 → 0 | Voters can delegate until closed |

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

- ✅ Poll room creation and management
- ✅ Poll metadata storage
- ✅ Option management
- ✅ Voter invitation
- ✅ Poll state transitions
- ✅ Poll & voter data CRUD
- ❌ Real-time rating events (Phase 4)
- ❌ Delegation events (Phase 4)
- ❌ Offline queue (Phase 5)

### Current Constraints

1. **No Real-time Voting**: Voting with ratings will be implemented in Phase 4
2. **No Delegation**: Delegation events are defined but not yet handled in Phase 4
3. **Single Room Per Poll**: Each poll has one room; federation is not yet tested

## Next Steps - Phase 4

Phase 4 will implement:
- Rating submission as Matrix timeline events
- Real-time tally updates via Matrix sync
- Delegation request/response events
- Event handlers for live updates

## References

- [MATRIX_PHASE1.md](MATRIX_PHASE1.md) - Phase 1 documentation
- [MATRIX_PHASE2.md](MATRIX_PHASE2.md) - Phase 2 documentation
- [planning/matrix-migration/03-implementation-strategy.md](planning/matrix-migration/03-implementation-strategy.md) - Full strategy
- [Matrix Client-Server API](https://spec.matrix.org/v1.8/client-server-api/)

---

**Phase 3 Complete! Ready for Phase 4 (Voting Implementation).** 🎉
