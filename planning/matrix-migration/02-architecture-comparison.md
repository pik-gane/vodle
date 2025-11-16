# Architectural Comparison: CouchDB vs Matrix for Vodle

## Executive Summary

This document compares the current CouchDB/PouchDB architecture with a proposed Matrix protocol-based architecture for Vodle, analyzing how each handles the core requirements and challenges of the voting application.

## Current CouchDB/PouchDB Architecture

### Component Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Vodle Client App                         │
│  ┌───────────────────────────────────────────────────────┐  │
│  │               DataService (data.service.ts)           │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐  │  │
│  │  │   Cache     │  │  PouchDB     │  │   CouchDB   │  │  │
│  │  │  (Memory)   │◄─┤   (Local)    │◄─┤  (Remote)   │  │  │
│  │  │             │  │              │  │             │  │  │
│  │  │ user_cache  │  │local_only_   │  │remote_user_ │  │  │
│  │  │poll_caches  │  │user_DB       │  │db           │  │  │
│  │  │             │  │local_synced_ │  │remote_poll_ │  │  │
│  │  │             │  │user_db       │  │dbs[pid]     │  │  │
│  │  │             │  │local_poll_   │  │             │  │  │
│  │  │             │  │dbs[pid]      │  │             │  │  │
│  │  └─────────────┘  └──────────────┘  └─────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Write Operation**:
   ```
   User Action → Cache Update → PouchDB Write → CouchDB Sync
   ```

2. **Read Operation**:
   ```
   Check Cache → If missing, read PouchDB → If missing, sync from CouchDB
   ```

3. **Synchronization**:
   ```
   PouchDB.sync(CouchDB, {live: true, retry: true})
   ```

### Database Structure

#### User Database
- **Name**: `vodle` (CouchDB) / `local_synced_user` (PouchDB)
- **Documents**: 
  ```json
  {
    "_id": "~vodle.user.{EMAIL_PW_HASH}§{KEY}",
    "value": "ENCRYPTED_VALUE",
    "_rev": "revision_id"
  }
  ```

#### Poll Database (per poll)
- **Name**: `vodle` (shared CouchDB) / `local_poll_{PID}` (PouchDB)
- **Documents**:
  ```json
  {
    "_id": "~vodle.poll.{PID}§{KEY}",
    "value": "ENCRYPTED_VALUE",
    "due": "ISO_DATE",
    "_rev": "revision_id"
  }
  ```

#### Voter Data (in poll database)
- **Documents**:
  ```json
  {
    "_id": "~vodle.poll.{PID}.voter.{VID}§{KEY}",
    "value": "ENCRYPTED_VALUE",
    "due": "ISO_DATE",
    "_rev": "revision_id"
  }
  ```

### Known Issues

1. **Sync Conflicts**
   - PouchDB replication conflicts require manual resolution
   - Complex conflict handling in application code
   - Race conditions between multiple devices
   - Revision tree growth over time

2. **Connection Management**
   - Separate connection per poll database
   - Difficult to manage connection lifecycle
   - Retry logic is complex and error-prone
   - No central connection state management

3. **Performance**
   - Three-tier storage has overhead
   - Manual cache invalidation required
   - Replication can be slow for large datasets
   - Initial sync takes significant time

4. **Complexity**
   - 2000+ lines of sync logic in data.service.ts
   - Custom encryption layer on top of CouchDB
   - Manual handling of document lifecycle
   - Complex selector queries for filtering

## Proposed Matrix Architecture

### Component Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Vodle Client App                         │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              MatrixService (new)                      │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐  │  │
│  │  │   Cache     │  │matrix-js-sdk │  │  Matrix     │  │  │
│  │  │  (Memory)   │◄─┤  (IndexedDB) │◄─┤ Homeserver  │  │  │
│  │  │             │  │              │  │             │  │  │
│  │  │ user_cache  │  │MatrixClient  │  │ User Room   │  │  │
│  │  │poll_caches  │  │.store        │  │ Poll Rooms  │  │  │
│  │  │             │  │              │  │             │  │  │
│  │  │             │  │Crypto Store  │  │             │  │  │
│  │  │             │  │(E2EE keys)   │  │             │  │  │
│  │  └─────────────┘  └──────────────┘  └─────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Write Operation**:
   ```
   User Action → Cache Update → Send Matrix Event → Homeserver stores
   ```

2. **Read Operation**:
   ```
   Check Cache → If missing, check SDK store → If missing, sync from homeserver
   ```

3. **Synchronization**:
   ```
   MatrixClient.startClient() → Automatic /sync polling → Event handlers update cache
   ```

### Room Structure

#### User Private Room
- **Room ID**: `!abc123:homeserver.com`
- **Alias**: `#user_{USER_HASH}:homeserver.com`
- **Type**: Private (invite-only, user is only member)
- **Encryption**: Enabled (Megolm)
- **Power Levels**: User = 100

**State Events**:
```json
{
  "type": "m.room.vodle.user.language",
  "state_key": "",
  "content": {
    "value": "en"
  }
}
{
  "type": "m.room.vodle.user.polls",
  "state_key": "",
  "content": {
    "poll_ids": ["pid1", "pid2", "pid3"]
  }
}
```

#### Poll Shared Room
- **Room ID**: `!xyz789:homeserver.com`
- **Alias**: `#poll_{PID}:homeserver.com`
- **Type**: Private (invite-only, multiple voters)
- **Encryption**: Enabled (Megolm)
- **Power Levels**: 
  - Creator = 100 (admin for room management)
  - Voters = 50 (can vote, add options, delegate)
  - Default = 0
- **Permission Model**:
  - After opening: poll metadata immutable (no one can change)
  - Voters can add new options (but can't modify existing ones)
  - Voters can change their own ratings/delegations (until deadline)

**State Events** (poll metadata):
```json
{
  "type": "m.room.vodle.poll.meta",
  "state_key": "",
  "content": {
    "title": "Where to go for lunch?",
    "description": "Group decision",
    "due": "2024-01-01T12:00:00Z",
    "state": "running"
  }
}
{
  "type": "m.room.vodle.poll.option",
  "state_key": "option_123",
  "content": {
    "name": "Pizza Place",
    "description": "Italian restaurant downtown",
    "url": "https://example.com/pizza"
  }
}
```

**Message Events** (voter data):
```json
{
  "type": "m.room.vodle.vote.rating",
  "content": {
    "option_id": "option_123",
    "rating": 75,
    "timestamp": 1234567890
  },
  "sender": "@voter_vid123:homeserver.com"
}
{
  "type": "m.room.vodle.vote.delegation",
  "content": {
    "delegation_id": "del_456",
    "to_voter": "@voter_vid456:homeserver.com",
    "option_ids": ["option_123", "option_124"],
    "status": "pending"
  },
  "sender": "@voter_vid123:homeserver.com"
}
```

### Event Processing

```typescript
// Pseudo-code for event handling
client.on("Room.timeline", (event, room) => {
  if (event.getType() === "m.room.vodle.vote.rating") {
    const rating = event.getContent();
    updateRatingCache(room.roomId, event.getSender(), rating);
    recalculateTally(room.roomId);
  }
});

client.on("RoomState.events", (event, state) => {
  if (event.getType() === "m.room.vodle.poll.meta") {
    const meta = event.getContent();
    updatePollCache(state.roomId, meta);
  }
});
```

### Permission Model

**Current CouchDB Behavior:**
- Once poll opens (state='running'), poll metadata and options become **immutable**
- No one (including creator) can modify metadata or existing options
- Voters can ADD new options (but can't change existing ones)
- Voters can update their own ratings and delegations until deadline

**Matrix Implementation:**
Power levels enforce this model:
- `m.room.vodle.poll.meta`: 100 (immutable after opening - only bot for closing)
- `m.room.vodle.poll.option`: 50 (voters can add via unique state_key, but client prevents modification)
- `m.room.vodle.vote.rating`: 50 (voters can update their own)
- `m.room.vodle.vote.delegation`: 50 (voters can update their own)

**Key Insight**: Matrix state events with unique state_keys allow "append-only" behavior - new options can be added (new state_key) but existing ones can't be modified (client-side validation prevents sending updates to existing state_keys).

## Detailed Comparison

### 1. Data Storage & Retrieval

| Aspect | CouchDB | Matrix |
|--------|---------|--------|
| **Storage Model** | Document database | Event log + state |
| **Key-Value Access** | Manual doc ID construction | State event type + key |
| **Querying** | Views & selectors | Filter by event type |
| **Indexing** | Manual indexes | Built-in event indexing |
| **Pagination** | Manual with skip/limit | Built-in with timeline |

**Verdict**: Matrix provides simpler access patterns through event types without complex document ID construction.

### 2. Synchronization

| Aspect | CouchDB | Matrix |
|--------|---------|--------|
| **Mechanism** | PouchDB.sync() | Client.startClient() + /sync |
| **Direction** | Bidirectional replication | Event DAG synchronization |
| **Conflict Resolution** | Manual (revision tree) | Automatic (state resolver) |
| **Offline Support** | Good (PouchDB stores locally) | Good (SDK stores locally) |
| **Real-time** | Changes feed | Long-polling /sync |
| **Reconnection** | Manual retry logic | Automatic with backoff |

**Verdict**: Matrix has better built-in synchronization with automatic conflict resolution and reconnection handling.

### 3. Encryption

| Aspect | CouchDB | Matrix |
|--------|---------|--------|
| **Transport** | HTTPS | HTTPS |
| **At Rest** | Custom AES (CryptoES) | Olm/Megolm E2EE |
| **Key Management** | Application-level | SDK-managed devices |
| **Key Rotation** | Manual | Automatic on membership change |
| **Verification** | Custom (libsodium) | Built-in device verification |
| **Complexity** | High (custom implementation) | Medium (SDK abstracts most) |

**Verdict**: Matrix provides standardized E2EE with less application-level complexity, though Vodle may still want additional poll-password encryption.

### 4. Access Control

| Aspect | CouchDB | Matrix |
|--------|---------|--------|
| **User Authentication** | DB users + passwords | Matrix users + access tokens |
| **Authorization** | Database permissions | Room membership + power levels |
| **Granularity** | Document-level (via doc ID) | Room-level + event-level |
| **Dynamic Changes** | Requires DB user management | Invite/kick from room |
| **Read/Write Control** | DB role-based | Power level-based |

**Verdict**: Matrix has more flexible and dynamic access control through room membership and power levels.

### 5. Offline Capability

| Aspect | CouchDB | Matrix |
|--------|---------|--------|
| **Local Storage** | PouchDB (IndexedDB) | SDK store (IndexedDB) |
| **Offline Reads** | Full access to synced data | Full access to synced events |
| **Offline Writes** | Queued in PouchDB | Queued in SDK |
| **Sync on Reconnect** | Automatic (if configured) | Automatic |
| **Conflict Handling** | Manual resolution needed | Automatic via event DAG |

**Verdict**: Both have good offline support, but Matrix handles reconnection conflicts better.

### 6. Scalability

| Aspect | CouchDB | Matrix |
|--------|---------|--------|
| **Per-User Data** | One DB per user | One room per user |
| **Per-Poll Data** | One DB per poll (or shared) | One room per poll |
| **Connection Count** | One per DB | One client, multiple rooms |
| **Memory Usage** | High (multiple DB instances) | Lower (single client) |
| **Network Efficiency** | Separate syncs | Unified /sync endpoint |

**Verdict**: Matrix is more efficient with a single client handling multiple rooms vs multiple database connections.

### 7. Development Complexity

| Aspect | CouchDB | Matrix |
|--------|---------|--------|
| **Lines of Code** | ~2000+ (data.service.ts) | Estimated ~800-1000 |
| **Custom Logic** | High (sync, conflict, cache) | Medium (event handlers, cache) |
| **Error Handling** | Complex (multiple DBs) | Simpler (single client) |
| **Testing** | Difficult (async, many DBs) | Easier (event-driven) |
| **Maintenance** | High (custom implementation) | Lower (SDK handles much) |

**Verdict**: Matrix reduces development and maintenance burden significantly.

### 8. Robustness Against Sync Errors

| Issue Type | CouchDB | Matrix |
|------------|---------|--------|
| **Network Interruption** | Retry logic can fail | Built-in retry with backoff |
| **Concurrent Writes** | Conflict revisions | Event DAG handles causality |
| **State Divergence** | Manual reconciliation | State resolver algorithm |
| **Data Loss** | Possible on conflict | Event history preserved |
| **Recovery** | Complex (manual intervention) | Automatic (resync) |

**Verdict**: Matrix is significantly more robust against sync errors through its event DAG and automatic conflict resolution.

## Why Matrix is More Robust

### 1. Event DAG (Directed Acyclic Graph)

**CouchDB**: Linear revision history per document
- Conflicts create revision branches
- Manual resolution required
- Can lose data if resolved incorrectly

**Matrix**: Event DAG tracks causality
- Events reference previous events
- Multiple events can coexist
- State resolver determines canonical state
- No data loss, all events preserved

### 2. Automatic Conflict Resolution

**CouchDB**: Application must handle conflicts
```typescript
// Current complex conflict handling
db.get(id).then(doc => {
  if (doc._conflicts) {
    // Manual resolution logic
    for (const rev of doc._conflicts) {
      // Fetch and compare conflicting versions
      // Decide which to keep
      // Delete others
    }
  }
});
```

**Matrix**: Built-in state resolution
```typescript
// Matrix handles automatically
// Application just processes final state
client.on("RoomState.events", (event) => {
  // Always get resolved state
  const currentState = event.getStateKey();
  updateCache(currentState);
});
```

### 3. Atomic State Updates

**CouchDB**: Document updates can conflict
- Two users update same document simultaneously
- Creates conflict that must be resolved
- Possible data loss if not handled carefully

**Matrix**: Event-based updates are append-only
- Each update is a new event
- Events never conflict (different event IDs)
- State resolution determines final state
- All events preserved in timeline

### 4. Network Resilience

**CouchDB**: 
- Manual retry logic
- Connection per database
- Complex error handling
- Sync can fail silently

**Matrix**:
- Automatic reconnection with exponential backoff
- Single connection
- Standardized error responses
- /sync includes error recovery

## Data Type Mapping

### User Data

| Current (CouchDB) | Proposed (Matrix) |
|-------------------|-------------------|
| `~vodle.user.{HASH}§language` | State: `m.room.vodle.user.language` |
| `~vodle.user.{HASH}§consent` | State: `m.room.vodle.user.consent` |
| `~vodle.user.{HASH}§poll.{PID}.state` | State: `m.room.vodle.user.poll_states` (array) |
| `~vodle.user.{HASH}§poll.{PID}.myvid` | State: `m.room.vodle.user.poll_vids` (map) |

### Poll Data

| Current (CouchDB) | Proposed (Matrix) |
|-------------------|-------------------|
| `~vodle.poll.{PID}§title` | State: `m.room.vodle.poll.meta` (title field) |
| `~vodle.poll.{PID}§due` | State: `m.room.vodle.poll.meta` (due field) |
| `~vodle.poll.{PID}§state` | State: `m.room.vodle.poll.meta` (state field) |
| `~vodle.poll.{PID}§option.{OID}.name` | State: `m.room.vodle.poll.option` (state_key = OID) |

### Voter Data

| Current (CouchDB) | Proposed (Matrix) |
|-------------------|-------------------|
| `~vodle.poll.{PID}.voter.{VID}§rating.{OID}` | Message: `m.room.vodle.vote.rating` |
| `~vodle.poll.{PID}.voter.{VID}§del_request.{DID}` | Message: `m.room.vodle.vote.delegation` |
| `~vodle.poll.{PID}.voter.{VID}§del_response.{DID}` | Message: `m.room.vodle.vote.delegation_response` |

## Migration Path

### Phase 1: Parallel Implementation
- Implement MatrixService alongside DataService
- Create adapter layer for testing
- Validate feature parity

### Phase 2: Gradual Migration
- New users start with Matrix
- Existing users continue with CouchDB
- Provide migration tool for opt-in

### Phase 3: Full Migration
- Export all CouchDB data
- Import to Matrix rooms
- Deprecate CouchDB support

### Phase 4: Cleanup
- Remove CouchDB/PouchDB code
- Simplify architecture
- Performance optimization

## Conclusion

Matrix protocol offers significant advantages over CouchDB/PouchDB for Vodle:

1. **More Robust**: Automatic conflict resolution, better sync reliability
2. **Simpler**: Reduced code complexity, standard SDK
3. **Better UX**: Faster sync, better offline support, real-time updates
4. **Maintainable**: Less custom logic, standard protocol
5. **Scalable**: Single client vs multiple databases

The main considerations are:
- **Migration effort**: Moderate to high
- **Learning curve**: Team must learn Matrix
- **Infrastructure**: Need to deploy Matrix homeserver
- **Encryption**: May need dual-layer (Matrix + poll-password)

Overall, the benefits significantly outweigh the costs, and Matrix provides a much more robust foundation for Vodle's synchronization needs.
