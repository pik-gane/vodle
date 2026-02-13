# Matrix Migration Phase 4 - Voting Implementation

## Overview

Phase 4 implements voting functionality with real-time updates using Matrix protocol, building on the poll room management established in Phase 3. This includes rating aggregation across voter rooms, delegation request/response events, and real-time event handling for live poll updates.

## What's Implemented

### 1. Rating Aggregation

Aggregate ratings from all voter rooms for a poll:

- **Aggregation**: `getRatings(pollId)` scans all known voter rooms and returns a nested map of voterId → (optionId → rating)
- **Caching**: Results are cached in `ratingCaches` for performance; cache is invalidated by `clearRatingCache()`
- **Live Updates**: `updateRatingCache()` incrementally updates the cache when real-time events arrive, avoiding full re-scans
- **Source**: Ratings are read from voter room state events (`m.room.vodle.voter.rating.{optionId}`)

### 2. Delegation Events

Support for delegating voting authority to other participants:

- **Request**: `requestDelegation(pollId, delegateId, optionIds)` sends a delegation request as a timeline event in the poll room
- **Response**: `respondToDelegation(pollId, delegationId, accept, acceptedOptions?)` sends acceptance or declination
- **Retrieval**: `getDelegations(pollId)` and `getDelegationResponses(pollId)` scan the poll room timeline for delegation events
- **ID Generation**: `generateId()` creates unique delegation IDs using timestamp + random component
- **Event Types**:
  - `m.room.vodle.vote.delegation_request` — sent by delegator
  - `m.room.vodle.vote.delegation_response` — sent by delegate
- **Caching**: Both requests and responses are cached locally for fast access

### 3. Real-time Event Handling

Live updates when poll data changes via Matrix sync:

- **Setup**: `setupPollEventHandlers(pollId)` registers Matrix event listeners for a poll
- **Teardown**: `teardownPollEventHandlers(pollId)` removes all listeners and cleans up
- **Listener Interface**: `PollEventListener` allows components to receive typed callbacks
- **Events Monitored**:
  - Rating updates in voter rooms (`m.room.vodle.voter.rating.*`)
  - Delegation requests in poll room (`m.room.vodle.vote.delegation_request`)
  - Delegation responses in poll room (`m.room.vodle.vote.delegation_response`)
  - Poll metadata updates (`m.room.vodle.poll.meta`)
- **Duplicate Prevention**: `setupPollEventHandlers()` is idempotent — safe to call multiple times

### 4. Event Listener Interface

Components can register for real-time updates:

```typescript
interface PollEventListener {
  onRatingUpdate?(pollId, voterId, optionId, rating): void;
  onDelegationRequest?(pollId, request: DelegationRequest): void;
  onDelegationResponse?(pollId, response: DelegationResponse): void;
  onPollMetaUpdate?(pollId, meta): void;
  onDataChange?(): void;  // Generic notification for any change
}
```

- **Register**: `addPollEventListener(pollId, listener)`
- **Unregister**: `removePollEventListener(pollId, listener)`
- **Multiple Listeners**: Multiple listeners per poll are supported

## Architecture

### Event Flow

```
Matrix Server (sync)
    │
    ▼
┌──────────────────────────────────┐
│  Matrix SDK Event Listeners      │
│  - Room.timeline                 │  ← Poll room: delegation events
│  - RoomState.events              │  ← Voter rooms: rating events
└──────────────┬───────────────────┘   ← Poll room: metadata updates
               │
               ▼
┌──────────────────────────────────┐
│  MatrixService Event Handlers    │
│  - handleRatingEvent()           │  → updateRatingCache()
│  - handleDelegationRequest()     │  → update delegationRequestCaches
│  - handleDelegationResponse()    │  → update delegationResponseCaches
│  - handlePollMetaUpdate()        │  → notify listeners
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│  PollEventListener callbacks     │
│  - onRatingUpdate()              │  → UI updates rating display
│  - onDelegationRequest()         │  → UI shows delegation request
│  - onDelegationResponse()        │  → UI shows delegation status
│  - onPollMetaUpdate()            │  → UI updates poll state
│  - onDataChange()                │  → Generic UI refresh
└──────────────────────────────────┘
```

### Cache Structure

```
ratingCaches: Map<pollId, Map<voterId, Map<optionId, rating>>>
delegationRequestCaches: Map<pollId, Map<delegationId, DelegationRequest>>
delegationResponseCaches: Map<pollId, Map<delegationId, DelegationResponse>>
pollEventListeners: Map<pollId, PollEventListener[]>
pollEventHandlersSetup: Set<pollId>
```

### Matrix Event Types (Phase 4)

| Event Type | Kind | Room | Description |
|-----------|------|------|-------------|
| `m.room.vodle.vote.delegation_request` | timeline | Poll room | Delegation request from delegator |
| `m.room.vodle.vote.delegation_response` | timeline | Poll room | Response from delegate |
| `m.room.vodle.voter.rating.{optionId}` | state | Voter room | Rating (existing from Phase 3, now aggregated) |

### IDataBackend Interface (Phase 4 Additions)

```typescript
interface IDataBackend {
  // Phase 1-3 (unchanged)
  // ...
  
  // Phase 4 (new)
  submitRating(pollId, optionId, rating): Promise<void>;
  getRatings(pollId): Promise<Map<string, Map<string, number>>>;
  requestDelegation(pollId, delegateId, optionIds): Promise<string>;
  respondToDelegation(pollId, delegationId, accept, acceptedOptions?): Promise<void>;
  setupPollEventHandlers(pollId): Promise<void>;
  teardownPollEventHandlers(pollId): void;
}
```

## Files Modified

### Core Implementation

1. **`src/app/matrix.service.ts`** (extended with Phase 4 methods)
   - `getRatings()`: Aggregate ratings from voter rooms
   - `updateRatingCache()` / `clearRatingCache()`: Cache management
   - `requestDelegation()` / `respondToDelegation()`: Delegation events
   - `getDelegations()` / `getDelegationResponses()`: Delegation retrieval
   - `generateId()`: Unique ID generation
   - `setupPollEventHandlers()` / `teardownPollEventHandlers()`: Event listeners
   - `handleRatingEvent()` / `handleDelegationRequest()` / `handleDelegationResponse()` / `handlePollMetaUpdate()`: Event handlers
   - `addPollEventListener()` / `removePollEventListener()`: Listener management
   - Exported types: `DelegationStatus`, `DelegationRequest`, `DelegationResponse`, `PollEventListener`

2. **`src/app/data-backend.interface.ts`** (extended)
   - Added `submitRating()`, `getRatings()`, `requestDelegation()`, `respondToDelegation()`, `setupPollEventHandlers()`, `teardownPollEventHandlers()`

3. **`src/app/matrix-backend.ts`** (extended)
   - Implements Phase 4 IDataBackend methods via MatrixService

4. **`src/app/couchdb-backend.ts`** (extended)
   - Implements Phase 4 IDataBackend methods as stubs compatible with existing CouchDB patterns

5. **`src/app/data-adapter.service.ts`** (extended)
   - Delegates Phase 4 methods to selected backend

### Tests

6. **`src/app/matrix.service.spec.ts`** (extended)
   - 28 new tests for Phase 4 methods covering:
     - Rating aggregation (getRatings, cache management)
     - Delegation events (request, respond, generate ID)
     - Real-time event handling (setup, teardown, listeners)
     - Error handling and edge cases

## Usage Examples

### Aggregating Ratings

```typescript
// Get all ratings for a poll
const ratings = await matrixService.getRatings('poll123');

// Iterate over voters and their ratings
for (const [voterId, voterRatings] of ratings) {
  for (const [optionId, rating] of voterRatings) {
    console.log(`${voterId} rated ${optionId}: ${rating}`);
  }
}
```

### Delegation Flow

```typescript
// Delegator: Request delegation
const delegationId = await matrixService.requestDelegation(
  'poll123',
  '@alice:matrix.org',
  ['opt1', 'opt2', 'opt3']
);

// Delegate: Accept delegation for specific options
await matrixService.respondToDelegation(
  'poll123',
  delegationId,
  true,           // accept
  ['opt1', 'opt2'] // only accept these options
);

// Delegate: Decline delegation
await matrixService.respondToDelegation(
  'poll123',
  delegationId,
  false
);
```

### Real-time Updates

```typescript
// Set up event handlers for a poll
await matrixService.setupPollEventHandlers('poll123');

// Register a listener for updates
const listener: PollEventListener = {
  onRatingUpdate(pollId, voterId, optionId, rating) {
    console.log(`New rating: ${voterId} rated ${optionId} = ${rating}`);
    // Trigger tally recalculation
  },
  onDelegationRequest(pollId, request) {
    console.log(`Delegation request from ${request.delegator_id}`);
    // Show delegation notification
  },
  onDelegationResponse(pollId, response) {
    console.log(`Delegation ${response.delegation_id}: ${response.status}`);
  },
  onPollMetaUpdate(pollId, meta) {
    console.log(`Poll metadata updated`);
  },
  onDataChange() {
    // Generic UI refresh
  }
};

matrixService.addPollEventListener('poll123', listener);

// Later: clean up when leaving the poll
matrixService.removePollEventListener('poll123', listener);
matrixService.teardownPollEventHandlers('poll123');
```

### Using DataAdapter (Backend-Agnostic)

```typescript
// Works with both Matrix and CouchDB backends
await dataAdapter.submitRating('poll123', 'opt1', 75);

const ratings = await dataAdapter.getRatings('poll123');

const delegationId = await dataAdapter.requestDelegation(
  'poll123', '@alice:matrix.org', ['opt1']
);

await dataAdapter.respondToDelegation('poll123', delegationId, true);

await dataAdapter.setupPollEventHandlers('poll123');
// ... later ...
dataAdapter.teardownPollEventHandlers('poll123');
```

## Testing

### Unit Tests

```bash
# Run MatrixService tests (84 tests)
ng test --no-watch --browsers=ChromeHeadless --include='**/matrix.service.spec.ts'

# Run DataAdapter tests (14 tests)
ng test --no-watch --browsers=ChromeHeadless --include='**/data-adapter.service.spec.ts'
```

## Known Limitations

### Phase 4 Scope

- ✅ Rating aggregation from voter rooms
- ✅ Delegation request/response events
- ✅ Real-time event handling (ratings, delegations, metadata)
- ✅ Event listener interface for UI notifications
- ✅ Cache management with incremental updates
- ✅ Backend-agnostic interface via IDataBackend
- ❌ Guard bot service implementation (server-side — separate deployment)
- ❌ Offline queue for pending events (Phase 5)
- ❌ Additional encryption layer (Phase 5)

### Current Constraints

1. **Rating Aggregation Scope**: `getRatings()` only includes voter rooms that are already known (cached). New voter rooms discovered via real-time events are included once their rooms are resolved
2. **Guard Bot Not Yet Deployed**: The guard bot user is configured in rooms but the actual server-side service is a separate component. Deadline enforcement relies on client-side fallback until the bot is deployed
3. **CouchDB Stubs**: The CouchDB backend provides stub implementations for Phase 4 methods since CouchDB already handles voting through DelegationService and PollService directly
4. **Matrix SDK Listeners**: Event listeners use the Matrix SDK's `on()` method. While `teardownPollEventHandlers()` clears the internal state, the underlying Matrix SDK listeners remain registered. Full cleanup requires stopping the Matrix client

## Next Steps - Phase 5

Phase 5 will implement:
- Offline event queue (store pending events when disconnected)
- Additional encryption layer for sensitive data
- Performance optimization (batch operations, lazy loading)
- Guard bot server-side service deployment

## References

- [MATRIX_PHASE1.md](MATRIX_PHASE1.md) - Phase 1 documentation
- [MATRIX_PHASE2.md](MATRIX_PHASE2.md) - Phase 2 documentation
- [MATRIX_PHASE3.md](MATRIX_PHASE3.md) - Phase 3 documentation
- [planning/matrix-migration/03-implementation-strategy.md](planning/matrix-migration/03-implementation-strategy.md) - Full strategy
- [Matrix Client-Server API](https://spec.matrix.org/v1.8/client-server-api/)

---

**Phase 4 Complete! Ready for Phase 5 (Advanced Features).** 🎉
