# Implementation Strategy for Matrix Migration

## Overview

This document outlines a practical, phased approach to migrating Vodle from CouchDB/PouchDB to Matrix protocol while minimizing risk and maintaining service continuity.

## Goals

1. **Zero Downtime**: Users can continue using Vodle throughout migration
2. **Data Preservation**: No data loss during transition
3. **Feature Parity**: All current features work with Matrix
4. **Gradual Rollout**: Phased implementation with rollback capability
5. **Minimal Disruption**: Transparent to end users

## Prerequisites

### Infrastructure
- [ ] Matrix homeserver deployed (Synapse/Dendrite)
- [ ] HTTPS endpoint configured
- [ ] User registration configured (or invite-only)
- [ ] Monitoring and logging set up

### Development
- [ ] matrix-js-sdk added to package.json
- [ ] Development/staging Matrix server available
- [ ] Test suite expanded for Matrix operations

### Team
- [ ] Team trained on Matrix protocol basics
- [ ] Documentation reviewed (Matrix spec, SDK docs)
- [ ] Migration plan approved by stakeholders

## Phase 1: Foundation (Weeks 1-2)

### Objectives
- Set up Matrix infrastructure
- Create minimal MatrixService
- Validate basic functionality

### Tasks

#### 1.1 Infrastructure Setup
```bash
# Deploy Matrix homeserver (example using Docker)
docker run -d \
  --name synapse \
  -p 8008:8008 \
  -v /data/synapse:/data \
  matrixdotorg/synapse:latest

# Configure homeserver.yaml
# Enable registration
# Set up federation (optional)
# Configure encryption
```

#### 1.2 Add Dependencies
```json
// package.json additions
{
  "dependencies": {
    "matrix-js-sdk": "^29.0.0",
    "@matrix-org/olm": "^3.2.15"
  }
}
```

#### 1.3 Create MatrixService Shell
```typescript
// src/app/matrix.service.ts
import * as sdk from 'matrix-js-sdk';

@Injectable({
  providedIn: 'root'
})
export class MatrixService {
  private client: sdk.MatrixClient;
  private homeserverUrl: string;
  
  constructor(private G: GlobalService) {}
  
  async init() {
    // Initialize Matrix client
  }
  
  async login(userId: string, password: string) {
    // Login to Matrix
  }
  
  async createRoom(options: any) {
    // Create room
  }
  
  // More methods...
}
```

#### 1.4 Test Basic Operations
- [ ] Connect to homeserver
- [ ] Register/login user
- [ ] Create room
- [ ] Send state event
- [ ] Receive state event
- [ ] Enable E2EE on room

**Deliverable**: Working MatrixService with basic room operations

---

## Phase 2: User Data Migration (Weeks 3-4)

### Objectives
- Implement user private rooms
- Migrate user settings and preferences
- Parallel operation with CouchDB

### Tasks

#### 2.1 User Room Creation
```typescript
// Create user private room
async createUserRoom(userId: string): Promise<string> {
  const roomId = await this.client.createRoom({
    name: `Vodle User Data`,
    preset: 'private_chat',
    is_direct: false,
    room_alias_name: `user_${this.hashUserId(userId)}`,
    initial_state: [{
      type: 'm.room.encryption',
      content: {
        algorithm: 'm.megolm.v1.aes-sha2'
      }
    }],
    power_level_content_override: {
      users: {
        [userId]: 100
      }
    }
  });
  return roomId;
}
```

#### 2.2 User Data State Events
```typescript
// Set user language
async setUserLanguage(roomId: string, language: string) {
  await this.client.sendStateEvent(
    roomId,
    'm.room.vodle.user.language',
    { value: language },
    '' // state_key
  );
}

// Get user language
getUserLanguage(roomId: string): string {
  const event = this.client.getRoom(roomId)
    .currentState.getStateEvents('m.room.vodle.user.language', '');
  return event?.getContent().value || 'en';
}
```

#### 2.3 Adapter Pattern
```typescript
// src/app/data-adapter.service.ts
// Allows switching between CouchDB and Matrix

export interface IDataBackend {
  init(): Promise<void>;
  getUserData(key: string): Promise<string>;
  setUserData(key: string, value: string): Promise<void>;
  // ... more methods
}

export class CouchDBBackend implements IDataBackend {
  // Current implementation
}

export class MatrixBackend implements IDataBackend {
  // New implementation
}

@Injectable({
  providedIn: 'root'
})
export class DataAdapter {
  private backend: IDataBackend;
  
  constructor() {
    // Feature flag determines backend
    if (environment.useMatrix) {
      this.backend = new MatrixBackend();
    } else {
      this.backend = new CouchDBBackend();
    }
  }
}
```

#### 2.4 Migration Tool
```typescript
// src/app/migration.service.ts
async migrateUserData(userId: string) {
  // 1. Read all user data from CouchDB
  const couchData = await this.readAllUserDataFromCouch(userId);
  
  // 2. Create Matrix user room
  const roomId = await this.matrix.createUserRoom(userId);
  
  // 3. Write all data to Matrix
  for (const [key, value] of Object.entries(couchData)) {
    await this.matrix.setUserData(roomId, key, value);
  }
  
  // 4. Verify migration
  const verified = await this.verifyUserMigration(userId, couchData, roomId);
  
  return { success: verified, roomId };
}
```

**Deliverable**: User data working on Matrix with migration tool

---

## Phase 3: Poll Rooms Implementation (Weeks 5-7)

### Objectives
- Implement poll shared rooms
- Support multiple voters
- Migrate poll metadata

### Tasks

#### 3.1 Poll Room Creation
```typescript
async createPollRoom(pollId: string, title: string, creatorId: string) {
  const roomId = await this.client.createRoom({
    name: title,
    topic: `Vodle Poll: ${pollId}`,
    preset: 'private_chat',
    room_alias_name: `poll_${pollId}`,
    initial_state: [{
      type: 'm.room.encryption',
      content: {
        algorithm: 'm.megolm.v1.aes-sha2'
      }
    }],
    power_level_content_override: {
      users: {
        [creatorId]: 100 // Creator has admin power for room management
      },
      events: {
        'm.room.vodle.poll.meta': 100, // Immutable after opening (was 'draft')
        'm.room.vodle.poll.option': 50, // Voters can add new options (but can't modify existing)
        'm.room.vodle.vote.rating': 50, // Voters can change their own ratings
        'm.room.vodle.vote.delegation': 50 // Voters can change their own delegations
      },
      users_default: 50 // Default voters can send events
    }
  });
  
  // Set poll metadata
  await this.setPollMetadata(roomId, {
    poll_id: pollId,
    title: title,
    due: dueDate.toISOString(),
    state: 'draft'
  });
  
  return roomId;
}
```

#### 3.2 Poll Metadata Management
```typescript
// Poll metadata as single state event
async setPollMetadata(roomId: string, meta: PollMeta) {
  await this.client.sendStateEvent(
    roomId,
    'm.room.vodle.poll.meta',
    meta,
    ''
  );
}

// Options as separate state events (one per option)
async addOption(roomId: string, optionId: string, option: Option) {
  await this.client.sendStateEvent(
    roomId,
    'm.room.vodle.poll.option',
    {
      name: option.name,
      description: option.description,
      url: option.url
    },
    optionId // state_key is option ID
  );
}
```

#### 3.3 Voter Invitation
```typescript
async inviteVoter(roomId: string, voterId: string) {
  // Invite voter to poll room
  await this.client.invite(roomId, voterId);
  
  // Set their power level to 50 (can vote)
  const powerLevels = this.client.getRoom(roomId)
    .currentState.getStateEvents('m.room.power_levels', '');
  
  const content = powerLevels.getContent();
  content.users[voterId] = 50;
  
  await this.client.sendStateEvent(
    roomId,
    'm.room.power_levels',
    content,
    ''
  );
}
```

#### 3.4 Poll State Transitions
```typescript
async changePollState(roomId: string, newState: string) {
  const meta = await this.getPollMetadata(roomId);
  meta.state = newState;
  
  await this.setPollMetadata(roomId, meta);
  
  // If closing, reduce voter power to 0 (read-only)
  if (newState === 'closed') {
    await this.makeRoomReadOnly(roomId);
  }
}

async makeRoomReadOnly(roomId: string) {
  const powerLevels = this.client.getRoom(roomId)
    .currentState.getStateEvents('m.room.power_levels', '');
  
  const content = powerLevels.getContent();
  content.users_default = 0; // Can't send events
  
  await this.client.sendStateEvent(
    roomId,
    'm.room.power_levels',
    content,
    ''
  );
}
```

**Deliverable**: Poll rooms with metadata and option management

---

## Phase 4: Voting Implementation (Weeks 8-10)

### Objectives
- Implement rating submission
- Real-time tally updates
- Delegation support

### Tasks

#### 4.1 Rating Events
```typescript
async submitRating(roomId: string, optionId: string, rating: number) {
  // Send as message event (not state)
  await this.client.sendEvent(
    roomId,
    'm.room.vodle.vote.rating',
    {
      option_id: optionId,
      rating: rating,
      timestamp: Date.now(),
      version: 1 // For future compatibility
    }
  );
}

// Get latest ratings for all voters
getRatings(roomId: string): Map<string, Map<string, number>> {
  const room = this.client.getRoom(roomId);
  const timeline = room.getLiveTimeline();
  const events = timeline.getEvents();
  
  const ratings = new Map<string, Map<string, number>>();
  
  for (const event of events) {
    if (event.getType() === 'm.room.vodle.vote.rating') {
      const sender = event.getSender();
      const content = event.getContent();
      
      if (!ratings.has(sender)) {
        ratings.set(sender, new Map());
      }
      
      // Keep only latest rating per option
      const voterRatings = ratings.get(sender);
      voterRatings.set(content.option_id, content.rating);
    }
  }
  
  return ratings;
}
```

#### 4.2 Delegation Events
```typescript
async requestDelegation(
  roomId: string, 
  delegateId: string, 
  optionIds: string[]
) {
  const delegationId = this.generateId();
  
  await this.client.sendEvent(
    roomId,
    'm.room.vodle.vote.delegation_request',
    {
      delegation_id: delegationId,
      delegate_id: delegateId,
      option_ids: optionIds,
      status: 'pending',
      timestamp: Date.now()
    }
  );
  
  return delegationId;
}

async respondToDelegation(
  roomId: string,
  delegationId: string,
  accept: boolean,
  acceptedOptions?: string[]
) {
  await this.client.sendEvent(
    roomId,
    'm.room.vodle.vote.delegation_response',
    {
      delegation_id: delegationId,
      status: accept ? 'accepted' : 'declined',
      accepted_options: acceptedOptions || [],
      timestamp: Date.now()
    }
  );
}
```

#### 4.3 Real-time Event Handling
```typescript
setupPollEventHandlers(roomId: string) {
  this.client.on("Room.timeline", (event, room) => {
    if (room.roomId !== roomId) return;
    
    switch (event.getType()) {
      case 'm.room.vodle.vote.rating':
        this.handleRatingEvent(event);
        break;
      
      case 'm.room.vodle.vote.delegation_request':
        this.handleDelegationRequest(event);
        break;
      
      case 'm.room.vodle.vote.delegation_response':
        this.handleDelegationResponse(event);
        break;
    }
  });
  
  this.client.on("RoomState.events", (event, state) => {
    if (state.roomId !== roomId) return;
    
    if (event.getType() === 'm.room.vodle.poll.meta') {
      this.handlePollMetaUpdate(event);
    }
  });
}

handleRatingEvent(event: MatrixEvent) {
  const sender = event.getSender();
  const content = event.getContent();
  
  // Update cache
  this.updateRatingCache(sender, content.option_id, content.rating);
  
  // Trigger tally recalculation
  this.recalculateTally();
  
  // Notify UI
  if (this.page && this.page.onDataChange) {
    this.page.onDataChange();
  }
}
```

**Deliverable**: Full voting functionality with real-time updates

---

## Phase 5: Advanced Features (Weeks 11-12)

### Objectives
- Offline support with queue
- Additional encryption layer
- Performance optimization

### Tasks

#### 5.1 Offline Queue
```typescript
class OfflineQueue {
  private queue: QueuedEvent[] = [];
  
  async enqueue(event: QueuedEvent) {
    this.queue.push(event);
    await this.saveToStorage();
  }
  
  async processQueue() {
    while (this.queue.length > 0) {
      const event = this.queue[0];
      
      try {
        await this.sendEvent(event);
        this.queue.shift();
        await this.saveToStorage();
      } catch (error) {
        // Connection still down, stop processing
        break;
      }
    }
  }
  
  private async sendEvent(event: QueuedEvent) {
    switch (event.type) {
      case 'rating':
        await this.matrix.submitRating(
          event.roomId,
          event.optionId,
          event.rating
        );
        break;
      // ... other event types
    }
  }
}
```

#### 5.2 Poll-Password Encryption Layer
```typescript
// Double encryption: Matrix E2EE + poll password
async submitEncryptedRating(
  roomId: string,
  optionId: string,
  rating: number,
  pollPassword: string
) {
  // First layer: encrypt with poll password
  const encrypted = this.encryptWithPassword(
    JSON.stringify({ rating, timestamp: Date.now() }),
    pollPassword
  );
  
  // Second layer: Matrix E2EE handles automatically
  await this.client.sendEvent(
    roomId,
    'm.room.vodle.vote.rating.encrypted',
    {
      option_id: optionId,
      encrypted_data: encrypted,
      version: 1
    }
  );
}

decryptRating(event: MatrixEvent, pollPassword: string): number {
  const content = event.getContent();
  const decrypted = this.decryptWithPassword(
    content.encrypted_data,
    pollPassword
  );
  return JSON.parse(decrypted).rating;
}
```

#### 5.3 Caching Strategy
```typescript
class MatrixCache {
  // Keep memory cache synced with Matrix state
  private userCache: Map<string, any> = new Map();
  private pollCaches: Map<string, Map<string, any>> = new Map();
  
  async warmupCache(roomId: string) {
    const room = this.client.getRoom(roomId);
    
    // Cache all state events
    const stateEvents = room.currentState.getStateEvents();
    for (const event of stateEvents) {
      this.cacheStateEvent(event);
    }
    
    // Cache recent timeline events
    const timeline = room.getLiveTimeline().getEvents();
    for (const event of timeline.slice(-100)) {
      this.cacheTimelineEvent(event);
    }
  }
  
  getCached(key: string): any {
    return this.userCache.get(key);
  }
  
  setCached(key: string, value: any) {
    this.userCache.set(key, value);
  }
}
```

**Deliverable**: Production-ready Matrix backend with full feature parity

---

## Phase 6: Migration & Rollout (Weeks 13-14)

### Objectives
- Migrate existing users
- Monitor performance
- Gradual rollout

### Tasks

#### 6.1 Staged Rollout

**Week 13: Beta Testing**
- Enable Matrix for 5% of users (feature flag)
- Monitor metrics: sync errors, performance, user feedback
- Fix any critical issues

**Week 14: Gradual Increase**
- 25% of users
- 50% of users
- 75% of users
- 100% of users

#### 6.2 Monitoring Dashboard
```typescript
interface MatrixMetrics {
  sync_errors: number;
  sync_duration_ms: number;
  event_send_success_rate: number;
  offline_queue_size: number;
  room_count: number;
  active_users: number;
}

class MetricsCollector {
  async collectMetrics(): Promise<MatrixMetrics> {
    return {
      sync_errors: this.syncErrorCount,
      sync_duration_ms: this.averageSyncDuration,
      event_send_success_rate: this.calculateSuccessRate(),
      offline_queue_size: this.offlineQueue.length,
      room_count: this.client.getRooms().length,
      active_users: this.countActiveUsers()
    };
  }
}
```

#### 6.3 Rollback Plan
```typescript
// Emergency rollback to CouchDB
async rollbackToCouch(userId: string) {
  // 1. Disable Matrix for user
  await this.setUserBackend(userId, 'couchdb');
  
  // 2. Export latest data from Matrix
  const matrixData = await this.exportUserDataFromMatrix(userId);
  
  // 3. Import to CouchDB
  await this.importUserDataToCouch(userId, matrixData);
  
  // 4. Verify
  const verified = await this.verifyRollback(userId);
  
  return verified;
}
```

#### 6.4 User Communication
- Email notification about migration
- In-app banner explaining changes
- FAQ page with benefits
- Support channel for issues

**Deliverable**: Full migration complete with monitoring

---

## Phase 7: Cleanup (Weeks 15-16)

### Objectives
- Remove CouchDB code
- Optimize Matrix implementation
- Update documentation

### Tasks

#### 7.1 Code Cleanup
- [ ] Remove PouchDB dependency
- [ ] Remove CouchDB connection code
- [ ] Delete data.service.ts (or archive)
- [ ] Rename matrix.service.ts to data.service.ts
- [ ] Update all imports

#### 7.2 Performance Optimization
- [ ] Implement lazy loading for room history
- [ ] Add pagination for large polls
- [ ] Optimize cache invalidation
- [ ] Reduce memory footprint

#### 7.3 Documentation Updates
- [ ] Update ARCHITECTURE.md
- [ ] Update INSTALL.md (Matrix setup)
- [ ] Create Matrix admin guide
- [ ] Update contributor documentation

**Deliverable**: Clean codebase running on Matrix

---

## Risk Mitigation

### High-Priority Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Data loss during migration | Low | High | Comprehensive testing, backup strategy, staged rollout |
| Performance degradation | Medium | Medium | Performance testing, optimization, monitoring |
| User confusion | Medium | Low | Clear communication, documentation, support |
| Matrix homeserver issues | Low | High | Redundancy, monitoring, rollback plan |
| E2EE key management | Medium | High | Thorough testing, key backup, recovery process |

### Rollback Triggers

Rollback to CouchDB if:
- Sync error rate > 5%
- Event send failure rate > 10%
- User complaints > threshold
- Critical security issue
- Performance degradation > 50%

---

## Success Metrics

### Technical Metrics
- [ ] Sync error rate < 1%
- [ ] Event send success rate > 99%
- [ ] Average sync time < 2s
- [ ] Memory usage reduced by 30%
- [ ] Code complexity reduced by 40%

### User Metrics
- [ ] User satisfaction score maintained/improved
- [ ] Support tickets decreased
- [ ] No data loss incidents
- [ ] Offline functionality preserved
- [ ] Real-time updates faster

---

## Testing Strategy

### Unit Tests
```typescript
describe('MatrixService', () => {
  it('should create user room', async () => {
    const roomId = await service.createUserRoom(userId);
    expect(roomId).toBeDefined();
  });
  
  it('should set and get user language', async () => {
    await service.setUserLanguage(roomId, 'de');
    const lang = service.getUserLanguage(roomId);
    expect(lang).toBe('de');
  });
  
  // ... more tests
});
```

### Integration Tests
```typescript
describe('Poll Flow', () => {
  it('should create poll, add options, invite voters, collect votes', async () => {
    // Create poll room
    const roomId = await service.createPollRoom(pollId, title, creatorId);
    
    // Add options
    await service.addOption(roomId, 'opt1', { name: 'Option 1' });
    
    // Invite voter
    await service.inviteVoter(roomId, voterId);
    
    // Submit vote
    await service.submitRating(roomId, 'opt1', 75);
    
    // Verify
    const ratings = service.getRatings(roomId);
    expect(ratings.get(voterId).get('opt1')).toBe(75);
  });
});
```

### E2E Tests
- Create poll workflow
- Voting workflow
- Delegation workflow
- Offline sync workflow
- Multi-device workflow

---

## Timeline Summary

| Phase | Duration | Key Deliverables |
|-------|----------|------------------|
| 1. Foundation | 2 weeks | MatrixService shell, basic operations |
| 2. User Data | 2 weeks | User rooms, settings migration |
| 3. Poll Rooms | 3 weeks | Poll creation, metadata, invitations |
| 4. Voting | 3 weeks | Ratings, delegations, real-time updates |
| 5. Advanced | 2 weeks | Offline, encryption, optimization |
| 6. Migration | 2 weeks | Staged rollout, monitoring |
| 7. Cleanup | 2 weeks | Code cleanup, documentation |
| **Total** | **16 weeks** | **Full Matrix migration** |

---

## Resource Requirements

### Development Team
- 2 senior developers (full-time)
- 1 QA engineer (full-time, weeks 8-16)
- 1 DevOps engineer (part-time, ongoing)

### Infrastructure
- Development Matrix homeserver
- Staging Matrix homeserver
- Production Matrix homeserver (with redundancy)
- Monitoring/logging infrastructure

### Budget Estimate
- Development: 16 weeks × 2 devs = 32 dev-weeks
- QA: 8 weeks × 1 QA = 8 QA-weeks
- Infrastructure: Ongoing hosting costs
- Contingency: 20% buffer

---

## Next Steps

1. **Review and Approve**: Stakeholder review of this strategy
2. **Allocate Resources**: Assign team members, allocate budget
3. **Setup Infrastructure**: Deploy dev/staging Matrix servers
4. **Begin Phase 1**: Start foundation implementation
5. **Regular Check-ins**: Weekly progress reviews

---

## Appendix: Environment Configuration

### Development
```typescript
// environment.development.ts
export const environment = {
  production: false,
  useMatrix: true,
  matrixHomeserver: 'https://matrix-dev.vodle.it',
  matrixFallbackToCouchDB: true
};
```

### Production
```typescript
// environment.production.ts
export const environment = {
  production: true,
  useMatrix: true,
  matrixHomeserver: 'https://matrix.vodle.it',
  matrixFallbackToCouchDB: false
};
```

---

## Conclusion

This implementation strategy provides a clear, phased approach to migrating Vodle from CouchDB/PouchDB to Matrix protocol. The 16-week timeline is realistic and includes adequate testing, monitoring, and rollback capabilities to ensure a smooth transition with minimal risk to users.

The key success factors are:
1. **Gradual rollout** with ability to rollback
2. **Comprehensive testing** at each phase
3. **Clear monitoring** of success metrics
4. **Good communication** with users
5. **Team alignment** on goals and timeline
