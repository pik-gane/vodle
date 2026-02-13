# Matrix Migration Phase 5 - Advanced Features

## Overview

Phase 5 implements advanced features for the Matrix migration, building on the voting implementation established in Phase 4. This includes an offline event queue for disconnected operation, a poll-password encryption layer for additional data security, and a caching strategy for improved performance.

## What's Implemented

### 1. Offline Event Queue

Store pending events when the Matrix client is disconnected, and process them when the connection is restored:

- **Connection Detection**: `isOnline()` checks the Matrix client sync state (`PREPARED` or `SYNCING`)
- **Enqueueing**: `enqueueOfflineEvent(event)` stores events with automatic ID and timestamp
- **Processing**: `processOfflineQueue()` replays events in FIFO order when reconnected
- **Retry Logic**: Events are retried up to 5 times (`MAX_RETRY_COUNT`); exceeded events are discarded
- **Persistence**: Queue is saved to Ionic Storage (`matrix_offline_queue`) so it survives app restarts
- **Status**: `getOfflineQueueStatus()` returns queue size, processing state, online state, and failure count
- **Supported Event Types**:
  - `rating` — Submit a rating for an option
  - `delegation_request` — Request delegation
  - `delegation_response` — Respond to delegation
  - `poll_data` — Set poll-level data
  - `voter_data` — Set voter-level data
  - `user_data` — Set user preferences

### 2. Poll-Password Encryption Layer

Additional encryption on top of Matrix E2EE (Megolm) using the Web Crypto API:

- **Key Derivation**: PBKDF2 with 100,000 iterations and SHA-256, using `vodle-poll-{pollId}` as salt
- **Encryption**: AES-GCM with 256-bit keys and random 12-byte IVs
- **Double Encryption**: Rating → AES-GCM (poll password) → Megolm (Matrix E2EE)
- **Encrypted Ratings**: `submitEncryptedRating()` stores encrypted ratings in voter rooms
- **Decryption**: `decryptRating()` retrieves and decrypts ratings with the poll password
- **Generic API**: `encryptWithPassword()` / `decryptWithPassword()` for arbitrary data

### 3. Caching Strategy

Performance optimization through proactive cache loading and fast synchronous reads:

- **Poll Cache Warmup**: `warmupCache(pollId)` preloads options, ratings, delegations, and delegation responses into memory in a single call
- **User Data Cache**: In-memory cache for fast synchronous reads of user preferences
  - `getCachedUserData(key)` — Synchronous, returns `undefined` if not cached
  - `setUserDataCached(key, value)` — Updates cache immediately, then persists to Matrix
  - `warmupUserDataCache(keys)` — Batch-loads user preferences into cache
  - `clearUserDataCache()` — Clears cache (called on logout)
- **Existing Caches**: Phase 5 builds on the caching infrastructure from Phases 3-4 (options, ratings, delegations)

## Architecture

### Offline Queue Flow

```
Application Layer
    │
    ▼
┌──────────────────────────────────┐
│  isOnline() check                │
│  ├── true:  Send event directly  │
│  └── false: Enqueue for later    │
└──────────────┬───────────────────┘
               │
        ┌──────▼──────┐
        │  Offline    │
        │  Queue      │ ← Persisted in Ionic Storage
        │  (FIFO)     │
        └──────┬──────┘
               │
     ┌─────────▼─────────┐
     │  Connection        │
     │  Restored          │
     └─────────┬─────────┘
               │
     ┌─────────▼──────────────────┐
     │  processOfflineQueue()     │
     │  ├── Process each event    │
     │  ├── Retry on failure      │
     │  │   (up to 5 times)       │
     │  └── Persist after each    │
     └────────────────────────────┘
```

### Double Encryption Flow

```
Rating Data (plaintext)
    │
    ▼
┌──────────────────────────────────┐
│  Layer 1: Poll-Password          │
│  AES-GCM (256-bit)              │
│  ├── Key: PBKDF2(password, salt) │
│  ├── IV: Random 12 bytes        │
│  └── Output: Base64(IV+cipher)  │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│  Layer 2: Matrix E2EE           │
│  Megolm (m.megolm.v1.aes-sha2) │
│  ├── Automatic via Matrix SDK   │
│  └── End-to-end encrypted       │
└──────────────┬───────────────────┘
               │
               ▼
         Matrix Server
    (cannot read either layer)
```

### Cache Architecture

```
┌─────────────────────────────────────────────────────┐
│  MatrixService In-Memory Caches                     │
│                                                     │
│  User Data:                                         │
│  ├── userDataCache: Map<key, value>                 │
│  │   └── Fast synchronous reads via getCachedUserData()  │
│  │                                                  │
│  Poll Data (per poll):                              │
│  ├── optionCaches: Map<pollId, Map<optionId, data>> │
│  ├── ratingCaches: Map<pollId, Map<voterId, Map>>   │
│  ├── delegationRequestCaches: Map<pollId, Map>      │
│  └── delegationResponseCaches: Map<pollId, Map>     │
│                                                     │
│  Room Lookups:                                      │
│  ├── pollRooms: Map<pollId, roomId>                 │
│  ├── voterRooms: Map<"pollId:voterId", roomId>      │
│  └── voterRoomReverseLookup: Map<roomId, {poll,voter}>│
└─────────────────────────────────────────────────────┘

warmupCache(pollId) loads:
  ├── Options (via ensureOptionCache)
  ├── Ratings (via getRatings)
  ├── Delegations (via getDelegations)
  └── Delegation responses (via getDelegationResponses)

warmupUserDataCache(keys) loads:
  └── User preferences by key list
```

### IDataBackend Interface (Phase 5 Additions)

```typescript
interface IDataBackend {
  // Phase 1-4 (unchanged)
  // ...
  
  // Phase 5 (new)
  isOnline(): boolean;
  getOfflineQueueSize(): number;
  processOfflineQueue(): Promise<number>;
  clearOfflineQueue(): Promise<void>;
  encryptWithPassword(data: any, password: string, pollId: string): Promise<string>;
  decryptWithPassword(encryptedData: string, password: string, pollId: string): Promise<any>;
  warmupCache(pollId: string): Promise<void>;
}
```

## Files Modified

### Core Implementation

1. **`src/app/matrix.service.ts`** (extended with Phase 5 methods)
   - `isOnline()`: Check Matrix sync connection state
   - `enqueueOfflineEvent()`: Store events for offline processing
   - `processOfflineQueue()`: Replay queued events
   - `processQueuedEvent()`: Dispatch individual events
   - `getOfflineQueueSize()` / `getOfflineQueueStatus()`: Queue introspection
   - `clearOfflineQueue()` / `loadOfflineQueue()` / `saveOfflineQueue()`: Queue management
   - `deriveKeyFromPassword()`: PBKDF2 key derivation
   - `encryptWithPassword()` / `decryptWithPassword()`: AES-GCM encryption
   - `submitEncryptedRating()` / `decryptRating()`: Encrypted rating operations
   - `warmupCache()`: Preload poll caches
   - `getCachedUserData()` / `setUserDataCached()`: In-memory user data cache
   - `warmupUserDataCache()` / `clearUserDataCache()`: User data cache management
   - Exported types: `QueuedEvent`, `OfflineQueueStatus`
   - `logout()` updated to clear Phase 5 state

2. **`src/app/data-backend.interface.ts`** (extended)
   - Added `isOnline()`, `getOfflineQueueSize()`, `processOfflineQueue()`, `clearOfflineQueue()`
   - Added `encryptWithPassword()`, `decryptWithPassword()`
   - Added `warmupCache()`

3. **`src/app/matrix-backend.ts`** (extended)
   - Implements Phase 5 IDataBackend methods via MatrixService

4. **`src/app/couchdb-backend.ts`** (extended)
   - Implements Phase 5 IDataBackend methods as stubs compatible with existing CouchDB patterns
   - `isOnline()` returns `true` (PouchDB handles offline transparently)
   - `encryptWithPassword()` / `decryptWithPassword()` are pass-through stubs (JSON serialize/deserialize)

5. **`src/app/data-adapter.service.ts`** (extended)
   - Delegates Phase 5 methods to selected backend

### Tests

6. **`src/app/matrix.service.spec.ts`** (extended)
   - 35 new tests for Phase 5 methods covering:
     - Offline queue: enqueue, process, clear, status, load, persistence
     - Encryption: encrypt/decrypt, different IVs, wrong password/pollId, complex data
     - Caching: warmup, cached user data, clear cache

7. **`src/app/data-adapter.service.spec.ts`** (extended)
   - 7 new tests for Phase 5 method existence on DataAdapter

## Usage Examples

### Offline Event Queue

```typescript
// Check connection before sending
if (!matrixService.isOnline()) {
  // Queue the event for later
  await matrixService.enqueueOfflineEvent({
    type: 'rating',
    pollId: 'poll123',
    optionId: 'opt1',
    rating: 75
  });
} else {
  // Send directly
  await matrixService.submitRating('poll123', 'opt1', 75);
}

// Process queue when connection is restored
const processed = await matrixService.processOfflineQueue();
console.log(`Processed ${processed} queued events`);

// Check queue status
const status = matrixService.getOfflineQueueStatus();
console.log(`Queue: ${status.queueSize} events, online: ${status.isOnline}`);

// Load queue from storage on app startup
await matrixService.loadOfflineQueue();
```

### Poll-Password Encryption

```typescript
// Submit encrypted rating (double encryption: AES-GCM + Matrix E2EE)
await matrixService.submitEncryptedRating(
  'poll123',
  'opt1',
  75,
  'my-poll-password'
);

// Decrypt a rating
const rating = await matrixService.decryptRating(
  'poll123',
  '@alice:matrix.org',
  'opt1',
  'my-poll-password'
);
console.log(`Rating: ${rating}`); // 75

// Generic encryption for arbitrary data
const encrypted = await matrixService.encryptWithPassword(
  { notes: 'Important poll data', values: [1, 2, 3] },
  'my-password',
  'poll123'
);

const decrypted = await matrixService.decryptWithPassword(
  encrypted,
  'my-password',
  'poll123'
);
```

### Cache Warmup

```typescript
// Warm up all caches for a poll (options, ratings, delegations)
await matrixService.warmupCache('poll123');

// Warm up user data cache for fast synchronous reads
await matrixService.warmupUserDataCache([
  'language', 'theme', 'notifications', 'consent'
]);

// Fast synchronous read (no network call)
const lang = matrixService.getCachedUserData('language'); // 'en'

// Set with immediate cache update
await matrixService.setUserDataCached('theme', 'dark');
const theme = matrixService.getCachedUserData('theme'); // 'dark' (instant)
```

### Using DataAdapter (Backend-Agnostic)

```typescript
// Works with both Matrix and CouchDB backends
if (!dataAdapter.isOnline()) {
  console.log('Offline — events will be queued');
}

// Encrypt data
const encrypted = await dataAdapter.encryptWithPassword(
  { rating: 75 },
  'password',
  'poll123'
);

// Warm up caches
await dataAdapter.warmupCache('poll123');

// Process offline queue
const processed = await dataAdapter.processOfflineQueue();
```

## Testing

### Unit Tests

```bash
# Run MatrixService tests (119 tests)
ng test --no-watch --browsers=ChromeHeadless --include='**/matrix.service.spec.ts'

# Run DataAdapter tests (21 tests)
ng test --no-watch --browsers=ChromeHeadless --include='**/data-adapter.service.spec.ts'
```

## Known Limitations

### Phase 5 Scope

- ✅ Offline event queue with persistence and retry logic
- ✅ Poll-password encryption layer (AES-GCM + PBKDF2)
- ✅ Cache warmup for polls and user data
- ✅ Backend-agnostic interface via IDataBackend
- ❌ Automatic reconnection triggers (app must call `processOfflineQueue()` explicitly)
- ❌ Guard bot server-side service deployment (separate infrastructure component)
- ❌ Conflict resolution for offline edits (last-write-wins via Matrix event ordering)

### Current Constraints

1. **Manual Queue Processing**: The application must call `processOfflineQueue()` when connectivity is restored. A future enhancement could add automatic processing via Matrix sync state listeners.
2. **Poll Password Distribution**: The poll password must be shared out-of-band between participants. It is not stored in Matrix (that would defeat the purpose).
3. **Cache Consistency**: Caches are invalidated by `clearRatingCache()`, `clearUserDataCache()`, and `logout()`. Real-time event handlers (Phase 4) keep the cache updated during normal operation.
4. **CouchDB Stubs**: The CouchDB backend provides stub implementations for Phase 5 methods since CouchDB/PouchDB already handles offline sync and has its own encryption via `libsodium`.
5. **PBKDF2 Salt**: The salt uses `vodle-poll-{pollId}` which is deterministic. This is acceptable because the password is the secret, and the salt is per-poll unique.

## Next Steps - Phase 6

Phase 6 will implement:
- Staged rollout with feature flags (5% → 25% → 50% → 100%)
- Monitoring dashboard for sync errors, performance, queue size
- Data migration tools (CouchDB → Matrix)
- Rollback plan and emergency procedures
- User communication (in-app banners, FAQ)

## References

- [MATRIX_PHASE1.md](MATRIX_PHASE1.md) - Phase 1 documentation
- [MATRIX_PHASE2.md](MATRIX_PHASE2.md) - Phase 2 documentation
- [MATRIX_PHASE3.md](MATRIX_PHASE3.md) - Phase 3 documentation
- [MATRIX_PHASE4.md](MATRIX_PHASE4.md) - Phase 4 documentation
- [planning/matrix-migration/03-implementation-strategy.md](planning/matrix-migration/03-implementation-strategy.md) - Full strategy
- [Matrix Client-Server API](https://spec.matrix.org/v1.8/client-server-api/)
- [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)

---

**Phase 5 Complete! Ready for Phase 6 (Migration & Rollout).** 🎉
