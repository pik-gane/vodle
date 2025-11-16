# Matrix Protocol Overview for Vodle Migration

## What is Matrix?

Matrix is an open standard and communication protocol for real-time communication. It provides:
- **Decentralized architecture**: No single point of failure
- **End-to-end encryption (E2EE)**: Built-in Olm/Megolm encryption
- **Eventual consistency**: Conflict-free replicated data types (CRDTs)
- **Room-based messaging**: Organized in rooms with state events
- **Federation**: Multiple servers can work together
- **Offline support**: Local storage with automatic sync

## Key Matrix Components

### 1. Matrix Client-Server API
- RESTful HTTP API for client-server communication
- Handles authentication, room management, event sending/receiving
- Supports pagination, filtering, and state synchronization

### 2. Matrix Homeserver
Standard implementations:
- **Synapse** (Python, reference implementation)
- **Dendrite** (Go, next-generation)
- **Conduit** (Rust, lightweight)

### 3. Matrix Rooms
- **Rooms**: Virtual spaces where events are shared
- **Room State**: Key-value store of room configuration
- **Room Events**: Messages and state changes
- **Room Aliases**: Human-readable names for rooms

### 4. Matrix Events
- **Message events** (m.room.message): Transient data
- **State events** (m.room.topic, custom): Persistent room state
- **Event DAG**: Directed acyclic graph of events
- **Event types**: Customizable with reverse DNS notation

### 5. End-to-End Encryption (E2EE)
- **Olm**: 1-to-1 encryption (based on Signal protocol)
- **Megolm**: Group encryption (efficient for rooms)
- **Device verification**: Cross-signing for trust
- **Key backup**: Encrypted key storage on server

## Matrix vs CouchDB/PouchDB Comparison

| Feature | CouchDB/PouchDB | Matrix Protocol |
|---------|-----------------|-----------------|
| **Architecture** | Client-server replication | Federated homeservers |
| **Data Model** | Document-based NoSQL | Event-based with state |
| **Sync** | Manual replication | Automatic with /sync API |
| **Conflicts** | Manual conflict resolution | CRDT-based automatic resolution |
| **Encryption** | Application-level (custom) | Built-in E2EE (Olm/Megolm) |
| **Offline** | Good (PouchDB) | Good (local storage + sync) |
| **Real-time** | Changes feed | /sync long-polling |
| **Access Control** | Database-level | Room membership + power levels |
| **Maturity** | Mature (established) | Mature and growing |
| **Complexity** | High (custom logic) | Medium (standard protocol) |

## Why Matrix Could Solve Current Issues

### 1. Syncing Errors
**Current Problem**: Complex PouchDB replication logic causes conflicts
**Matrix Solution**: 
- Built-in `/sync` API handles synchronization
- Event DAG ensures consistent ordering
- Automatic conflict resolution with event precedence

### 2. Conflict Resolution
**Current Problem**: Manual conflict handling in application code
**Matrix Solution**:
- State events use "last-write-wins" with server timestamp
- Event DAG provides clear causality
- Room state resolver algorithm handles conflicts

### 3. Connection Management
**Current Problem**: Managing multiple CouchDB connections per poll
**Matrix Solution**:
- Single homeserver connection
- Multiple rooms accessed via same client
- Automatic reconnection and sync resume

### 4. Data Consistency
**Current Problem**: Three-tier storage with manual synchronization
**Matrix Solution**:
- Room state provides authoritative source
- Local storage automatically synced
- Event history ensures audit trail

## Matrix for Vodle Use Cases

### User Data Room (Private)
```
Room: #user_[user_hash]
Type: Private (only user invited)
Purpose: Store user preferences, settings, poll list
Encryption: E2EE enabled
State Events:
  - m.room.vodle.language
  - m.room.vodle.consent
  - m.room.vodle.email_hash
  - m.room.vodle.poll_list
```

### Poll Room (Shared)
```
Room: #poll_[poll_id]
Type: Private (invited participants only)
Purpose: Store poll metadata, options, states
Encryption: E2EE enabled (poll password-based)
State Events:
  - m.room.vodle.poll.title
  - m.room.vodle.poll.due
  - m.room.vodle.poll.state
  - m.room.vodle.poll.option.[oid]
Power Levels:
  - Creator: 100 (can modify poll)
  - Voters: 50 (can send votes)
  - Read-only: 0 (can only read)
```

### Voter Data in Poll Room
```
Message Events (not state):
  - m.room.vodle.rating.[oid] (voter's rating)
  - m.room.vodle.delegation.[did] (delegation request/response)
Properties:
  - sender: voter's Matrix user ID
  - content: encrypted rating/delegation data
  - timestamp: server timestamp
```

## Standard Matrix Libraries

### JavaScript/TypeScript
1. **matrix-js-sdk**: Official Matrix client SDK
   - Full client-server API implementation
   - E2EE support via Olm/Megolm
   - Room and event management
   - Sync engine

2. **matrix-widget-api**: For embedded widgets
   - Useful for poll UI integration

### Alternatives
- **matrix-lite-sdk**: Lightweight, simplified API
- **simple-matrix-sdk**: Minimal wrapper

## Encryption Considerations

### Current Vodle Encryption
- User data: Encrypted with user password (AES)
- Poll data: Encrypted with poll password (AES)
- Custom implementation using CryptoES

### Matrix E2EE Approach
- **Automatic E2EE**: Enabled per-room
- **Device keys**: Each device has its own key
- **Room keys**: Shared among participants
- **Key rotation**: Automatic on membership changes

### Hybrid Approach (Recommended)
1. Use Matrix E2EE for transport security
2. Add application-level encryption for poll data
3. Poll password derives additional encryption key
4. Double encryption: Matrix E2EE + poll-specific

## Technical Requirements

### Client-side
- Matrix JavaScript SDK (npm: matrix-js-sdk)
- IndexedDB for local storage
- WebCrypto API for additional encryption
- Service Worker for offline support

### Server-side
- Matrix homeserver (Synapse/Dendrite/Conduit)
- HTTPS with valid certificate
- Registration endpoint (or invite-only)
- Federation optional (can disable)

### Integration Points
- Replace DataService PouchDB/CouchDB code
- Implement MatrixService as new backend
- Keep cache layer for performance
- Adapt sync logic to Matrix /sync API

## Performance Considerations

### Advantages
- **Efficient sync**: Only changed events downloaded
- **Lazy loading**: Load room history on demand
- **Filtering**: Sync only relevant rooms
- **Compression**: Gzip on HTTP requests

### Potential Concerns
- **Initial sync**: First sync might be slower
- **Event history**: Growing history increases load
- **Device keys**: Managing many devices per user

### Mitigations
- Implement pagination for history
- Use lazy loading members option
- Set sensible sync filter
- Periodic room state cleanup (if needed)

## Security Considerations

### Matrix Built-in Security
- TLS for transport
- E2EE for content
- Device verification
- Cross-signing

### Additional Vodle-specific Security
- Poll passwords as additional encryption layer
- Voter anonymity (pseudonymous vids)
- Delegation signing with libsodium
- Tally verification with PRNG

## Migration Complexity

### Low Complexity
- User authentication (Matrix user/pass)
- Room creation and joining
- Basic state events

### Medium Complexity
- E2EE implementation
- Event history management
- Sync state handling
- Device management

### High Complexity
- Data migration from CouchDB
- Dual-layer encryption
- Offline queue management
- Conflict resolution edge cases

## Recommended Approach

1. **Phase 1**: Proof of concept
   - Simple user room with settings
   - Basic poll room with options
   - Single voter, no encryption

2. **Phase 2**: Full feature set
   - Multiple voters in poll room
   - E2EE enabled
   - Ratings and delegations
   - Offline support

3. **Phase 3**: Migration
   - Data export from CouchDB
   - Import to Matrix rooms
   - Parallel operation period
   - Full cutover

## References

- [Matrix Specification](https://spec.matrix.org/)
- [matrix-js-sdk Documentation](https://matrix-org.github.io/matrix-js-sdk/)
- [Matrix E2EE Guide](https://matrix.org/docs/guides/end-to-end-encryption-implementation-guide)
- [Room State Resolution](https://spec.matrix.org/latest/rooms/v10/)
