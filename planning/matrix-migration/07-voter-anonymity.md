# Voter Anonymity and Pseudonymity in Matrix Migration

## Overview

This document addresses the critical requirement for **per-poll voter anonymity** in Vodle and how to preserve it when migrating to Matrix protocol.

## Current CouchDB Implementation

### How Anonymity Works Now

1. **Per-Poll Voter ID (vid)**: When a user joins a poll, they generate a random voter ID:
   ```typescript
   generate_vid(): string {
     return this.G.D.generate_id(environment.data_service.vid_length);
   }
   
   init_myvid() {
     this.myvid = this.G.P.generate_vid();
   }
   ```

2. **Voter ID Properties**:
   - **Random**: Generated from random characters
   - **Unique per poll**: Different for each poll the user participates in
   - **Pseudonymous**: Other voters see the vid but don't know which real user it belongs to
   - **Unlinkable**: Can't correlate the same user across different polls

3. **Data Organization**:
   ```
   ~vodle.poll.{PID}.voter.{VID}§rating.{OID}
   ~vodle.poll.{PID}.voter.{VID}§del_request.{DID}
   ```
   
   Each voter's data is keyed by their random vid, not their user identity.

### Why This Matters

**Privacy benefits**:
- Group members can't track individual voting patterns across polls
- Prevents social pressure based on voting history
- Enables honest deliberation without fear of judgment
- Protects minorities from identification and retaliation

**Example scenario**:
- Alice participates in 3 polls in her organization
- Poll 1: Her vid is `x7k9m2`
- Poll 2: Her vid is `p4n8r1`
- Poll 3: Her vid is `q2j5w9`
- Other participants can't tell these are the same person

## Matrix Protocol Challenge

### The Problem

In Matrix, events have a `sender` field that identifies who sent them:

```json
{
  "type": "m.room.vodle.vote.rating",
  "sender": "@alice:example.com",
  "content": {
    "option_id": "opt1",
    "rating": 75
  }
}
```

**Issue**: The `sender` field is the user's Matrix ID, which is:
- **Same across all polls** - breaks unlinkability
- **Visible to all room members** - breaks pseudonymity
- **Cannot be changed** - fundamental to Matrix's trust model

This would allow anyone to:
1. See which user cast which vote in each poll
2. Track the same user's votes across multiple polls
3. Build voting profiles of individuals

## Solution Options

### Option 1: Ephemeral Matrix Accounts (Recommended)

Create a new Matrix account for each poll participation.

#### Implementation

```typescript
/**
 * Generate ephemeral Matrix account for poll anonymity
 */
async joinPollAnonymously(pollId: string, pollPassword: string): Promise<void> {
  // 1. Generate random voter ID (like current system)
  const vid = this.generateVid();
  
  // 2. Generate ephemeral Matrix username
  const ephemeralUsername = `vodle_voter_${vid}`;
  const ephemeralPassword = this.generateSecurePassword();
  
  // 3. Register new Matrix account
  const ephemeralClient = sdk.createClient({
    baseUrl: this.homeserverUrl
  });
  
  const response = await ephemeralClient.register(
    ephemeralUsername,
    ephemeralPassword
  );
  
  // 4. Store credentials encrypted in user's private room
  await this.storeEphemeralCredentials(pollId, {
    vid: vid,
    matrix_user_id: response.user_id,
    access_token: response.access_token,
    device_id: response.device_id
  });
  
  // 5. Initialize ephemeral client
  const pollClient = sdk.createClient({
    baseUrl: this.homeserverUrl,
    accessToken: response.access_token,
    userId: response.user_id,
    deviceId: response.device_id
  });
  
  await pollClient.startClient();
  
  // 6. Join poll room with ephemeral account
  const pollRoomId = await this.findPollRoom(pollId);
  await pollClient.joinRoom(pollRoomId);
  
  // 7. Store mapping for this device
  this.pollClients.set(pollId, pollClient);
}

/**
 * Store ephemeral credentials in user's private room
 */
async storeEphemeralCredentials(
  pollId: string, 
  credentials: EphemeralCredentials
): Promise<void> {
  const userRoomId = await this.getUserRoomId();
  
  // Encrypt credentials with user's password
  const encrypted = this.encryptWithUserPassword(
    JSON.stringify(credentials)
  );
  
  await this.mainClient.sendStateEvent(
    userRoomId,
    'm.room.vodle.poll.ephemeral_account',
    { encrypted_credentials: encrypted },
    pollId // state_key is poll ID
  );
}

/**
 * Vote using ephemeral account
 */
async submitRating(
  pollId: string,
  optionId: string,
  rating: number
): Promise<void> {
  // Get poll-specific client (ephemeral account)
  const pollClient = this.pollClients.get(pollId);
  if (!pollClient) {
    throw new Error('Not joined to poll');
  }
  
  const roomId = await this.getPollRoomId(pollId);
  
  // Vote is sent from ephemeral account
  // sender will be @vodle_voter_{vid}:homeserver.com
  await pollClient.sendEvent(
    roomId,
    'm.room.vodle.vote.rating',
    {
      option_id: optionId,
      rating: rating,
      timestamp: Date.now()
    }
  );
}
```

#### Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                  User's Device                              │
│                                                             │
│  Main Account: @alice:example.com                          │
│  └─ User Private Room (settings, poll list)                │
│                                                             │
│  Poll 1: @vodle_voter_x7k9m2:example.com                   │
│  └─ Poll Room #poll_abc (votes as x7k9m2)                  │
│                                                             │
│  Poll 2: @vodle_voter_p4n8r1:example.com                   │
│  └─ Poll Room #poll_def (votes as p4n8r1)                  │
│                                                             │
│  Poll 3: @vodle_voter_q2j5w9:example.com                   │
│  └─ Poll Room #poll_ghi (votes as q2j5w9)                  │
└─────────────────────────────────────────────────────────────┘
```

#### Advantages

✅ **Strong anonymity**: Each poll uses completely separate Matrix identity
✅ **Unlinkable**: Cannot correlate same user across polls
✅ **Matrix-native**: Uses standard Matrix accounts and authentication
✅ **Clean separation**: No mixing of identities
✅ **E2EE preserved**: Each account has its own device keys

#### Challenges

⚠️ **Account creation**: Homeserver must allow multiple account registrations
⚠️ **Resource usage**: More accounts = more server resources
⚠️ **Credential management**: Must securely store multiple credentials
⚠️ **Device management**: Each account needs device verification

#### Homeserver Configuration

```yaml
# synapse homeserver.yaml
registration_shared_secret: "secret_for_vodle_registration"

# Allow registration but require secret
enable_registration: false
registration_requires_token: true

# Rate limits for vodle ephemeral accounts
rc_registration:
  per_second: 0.5
  burst_count: 5

# Cleanup for inactive accounts
user_ips_max_age: 30d
```

### Option 2: Encrypted Voter ID in Content

Keep single Matrix account but encrypt voter identity in event content.

#### Implementation

```typescript
/**
 * Vote with encrypted voter ID
 */
async submitRatingWithEncryptedVid(
  pollId: string,
  optionId: string,
  rating: number
): Promise<void> {
  const roomId = await this.getPollRoomId(pollId);
  const vid = await this.getMyVid(pollId);
  
  // Encrypt voter ID with poll password
  const pollPassword = await this.getPollPassword(pollId);
  const encryptedVid = this.encryptWithPassword(vid, pollPassword);
  
  // Event is sent from main Matrix account
  // but vid is encrypted in content
  await this.client.sendEvent(
    roomId,
    'm.room.vodle.vote.rating',
    {
      encrypted_vid: encryptedVid,
      option_id: optionId,
      rating: rating,
      timestamp: Date.now()
    }
  );
}

/**
 * Get ratings with decrypted voter IDs
 */
getRatings(pollId: string, pollPassword: string): Map<string, Map<string, number>> {
  const ratings = new Map<string, Map<string, number>>();
  const roomId = this.getPollRoomId(pollId);
  const room = this.client.getRoom(roomId);
  
  const timeline = room.getLiveTimeline().getEvents();
  
  for (const event of timeline) {
    if (event.getType() === 'm.room.vodle.vote.rating') {
      const content = event.getContent();
      
      // Decrypt voter ID
      const vid = this.decryptWithPassword(
        content.encrypted_vid,
        pollPassword
      );
      
      if (!ratings.has(vid)) {
        ratings.set(vid, new Map());
      }
      
      ratings.get(vid).set(content.option_id, content.rating);
    }
  }
  
  return ratings;
}
```

#### Event Structure

```json
{
  "type": "m.room.vodle.vote.rating",
  "sender": "@alice:example.com",
  "content": {
    "encrypted_vid": "AES_ENCRYPTED_VID_HERE",
    "option_id": "opt1",
    "rating": 75,
    "timestamp": 1234567890
  }
}
```

#### Advantages

✅ **Single account**: No need for multiple Matrix accounts
✅ **Simpler credential management**: One set of credentials per user
✅ **Less server load**: Fewer accounts to manage
✅ **Standard E2EE**: Matrix's E2EE still protects content

#### Disadvantages

❌ **Participation linkability**: Can see which Matrix users are in which polls
❌ **Metadata leakage**: Sender field reveals user's presence
❌ **Weaker anonymity**: User identity visible in room membership
❌ **Correlation possible**: With external info, could link polls

#### Security Analysis

**What's protected**:
- Which voter ID corresponds to which user (encrypted in content)
- Voting patterns remain unlinkable across polls

**What's exposed**:
- Which Matrix users are in which polls
- When users send votes (timestamp metadata)
- Could enable targeting: "Alice is in privacy-sensitive poll"

### Option 3: Hybrid Approach

Use ephemeral accounts for sensitive polls, single account for casual polls.

```typescript
async joinPoll(
  pollId: string, 
  pollPassword: string,
  anonymityLevel: 'high' | 'standard'
): Promise<void> {
  if (anonymityLevel === 'high') {
    await this.joinPollAnonymously(pollId, pollPassword);
  } else {
    await this.joinPollWithEncryptedVid(pollId, pollPassword);
  }
}
```

#### Advantages

✅ **Flexibility**: Users choose privacy level
✅ **Efficiency**: Standard polls use fewer resources
✅ **Opt-in privacy**: High anonymity when needed

#### Disadvantages

⚠️ **Complexity**: Two different code paths
⚠️ **User choice burden**: Users must understand tradeoffs
⚠️ **Mixed polls**: Some voters high-anonymity, some standard

## Comparison Matrix

| Feature | CouchDB (Current) | Ephemeral Accounts | Encrypted VID | Hybrid |
|---------|-------------------|-------------------|---------------|--------|
| **Per-poll anonymity** | ✅ Strong | ✅ Strong | ⚠️ Moderate | ✅/⚠️ Mixed |
| **Unlinkability** | ✅ Yes | ✅ Yes | ❌ No | ✅/❌ Mixed |
| **Membership privacy** | ✅ Yes | ✅ Yes | ❌ No | ✅/❌ Mixed |
| **Implementation complexity** | N/A | ⚠️ High | ✅ Low | ⚠️ Very High |
| **Server resources** | N/A | ❌ High | ✅ Low | ⚠️ Medium |
| **Credential management** | N/A | ⚠️ Complex | ✅ Simple | ⚠️ Complex |
| **Homeserver requirements** | N/A | ⚠️ Special config | ✅ Standard | ⚠️ Special config |
| **User experience** | N/A | ✅ Transparent | ✅ Transparent | ⚠️ Choice required |

## Recommendation

**Primary approach: Option 1 (Ephemeral Matrix Accounts)**

### Rationale

1. **Strongest privacy**: Matches current CouchDB anonymity level
2. **True unlinkability**: Cannot correlate users across polls
3. **Defense in depth**: Even if encryption breaks, anonymity preserved
4. **User expectations**: Vodle users expect strong anonymity

### Implementation Requirements

1. **Homeserver configuration**:
   - Enable registration via shared secret
   - Allow multiple accounts per email (or no email)
   - Configure rate limits for account creation
   - Set up account cleanup for inactive ephemeral accounts

2. **Client implementation**:
   - Automatic ephemeral account creation on poll join
   - Secure credential storage in user's private room
   - Credential recovery from any device
   - Automatic credential cleanup after poll closes

3. **User experience**:
   - Transparent to user (happens automatically)
   - No additional authentication steps
   - Seamless switching between polls
   - Clear indication of anonymity status

### Migration Strategy

1. **Phase 1**: Implement with optional flag
   ```typescript
   environment: {
     matrix: {
       use_ephemeral_accounts: true
     }
   }
   ```

2. **Phase 2**: Test with small group
   - Verify anonymity guarantees
   - Check server resource usage
   - Validate credential management

3. **Phase 3**: Gradual rollout
   - Enable for all new polls
   - Migrate existing polls on next join
   - Monitor for issues

4. **Fallback**: If ephemeral accounts cause problems
   - Fall back to Option 2 (Encrypted VID)
   - Still better than no anonymity
   - Can re-enable later with fixes

## Edge Cases and Considerations

### 1. Poll Creator Identity

**Issue**: Poll creator needs to be identified for management
**Solution**: 
- Creator uses main account for poll creation
- Immediately creates ephemeral account for voting
- Poll metadata stores creator's Matrix ID (in E2EE metadata)

### 2. Delegation System

**Issue**: Delegations involve voter-to-voter communication
**Solution**:
- Delegation requests/responses use ephemeral accounts
- Vid remains the identifier within poll
- No linking back to main identity

### 3. Cross-Device Access

**Issue**: User's ephemeral credentials must work on all devices
**Solution**:
- Credentials stored encrypted in user's private room
- Each device downloads and decrypts on first access
- Standard Matrix E2EE ensures only user's devices can decrypt

### 4. Account Cleanup

**Issue**: Many ephemeral accounts accumulate on homeserver
**Solution**:
```typescript
async cleanupClosedPollAccount(pollId: string): Promise<void> {
  const pollState = await this.getPollState(pollId);
  
  if (pollState === 'closed') {
    // Get ephemeral credentials
    const credentials = await this.getEphemeralCredentials(pollId);
    
    // Deactivate Matrix account
    const ephemeralClient = await this.createEphemeralClient(credentials);
    await ephemeralClient.deactivateAccount();
    
    // Remove stored credentials
    await this.removeEphemeralCredentials(pollId);
  }
}
```

### 5. Offline Voting

**Issue**: Ephemeral account must work offline
**Solution**:
- Credentials cached locally like main account
- Offline queue works per-poll (per ephemeral account)
- Sync resumes when online

## Code Snippets

### Complete Ephemeral Account Manager

```typescript
export class EphemeralAccountManager {
  private pollClients: Map<string, MatrixClient> = new Map();
  
  constructor(
    private mainClient: MatrixClient,
    private storage: Storage,
    private G: GlobalService
  ) {}
  
  /**
   * Join poll with new ephemeral account
   */
  async joinPoll(pollId: string, inviteToken: string): Promise<void> {
    // Check if already joined
    const existing = await this.getEphemeralCredentials(pollId);
    if (existing) {
      await this.connectWithExistingAccount(pollId, existing);
      return;
    }
    
    // Generate new ephemeral account
    const vid = this.generateVid();
    const username = `vodle_voter_${vid}`;
    const password = this.generateSecurePassword();
    
    // Register account
    const tempClient = sdk.createClient({
      baseUrl: this.G.environment.matrixHomeserver
    });
    
    const response = await tempClient.register(username, password, null, {
      type: 'm.login.registration_token',
      token: inviteToken
    });
    
    // Store credentials
    await this.storeEphemeralCredentials(pollId, {
      vid: vid,
      username: username,
      password: password,
      user_id: response.user_id,
      access_token: response.access_token,
      device_id: response.device_id,
      created_at: Date.now()
    });
    
    // Initialize client
    await this.connectWithExistingAccount(pollId, {
      user_id: response.user_id,
      access_token: response.access_token,
      device_id: response.device_id
    });
  }
  
  /**
   * Connect with existing ephemeral account
   */
  private async connectWithExistingAccount(
    pollId: string,
    credentials: any
  ): Promise<void> {
    const client = sdk.createClient({
      baseUrl: this.G.environment.matrixHomeserver,
      accessToken: credentials.access_token,
      userId: credentials.user_id,
      deviceId: credentials.device_id,
      store: new sdk.IndexedDBStore({
        indexedDB: window.indexedDB,
        localStorage: window.localStorage,
        dbName: `vodle-matrix-poll-${pollId}`
      })
    });
    
    await client.initCrypto();
    await client.startClient();
    
    this.pollClients.set(pollId, client);
  }
  
  /**
   * Get ephemeral client for poll
   */
  getPollClient(pollId: string): MatrixClient | null {
    return this.pollClients.get(pollId) || null;
  }
  
  /**
   * Cleanup after poll closes
   */
  async cleanupPoll(pollId: string): Promise<void> {
    const client = this.pollClients.get(pollId);
    if (client) {
      await client.stopClient();
      this.pollClients.delete(pollId);
    }
    
    // Optionally deactivate account
    // await this.deactivateEphemeralAccount(pollId);
  }
  
  private generateVid(): string {
    return this.G.D.generate_id(this.G.environment.data_service.vid_length);
  }
  
  private generateSecurePassword(): string {
    return this.G.D.generate_id(32);
  }
}
```

## Security Audit Checklist

- [ ] Ephemeral credentials stored encrypted
- [ ] Credentials only accessible to user's devices
- [ ] Cannot correlate ephemeral accounts back to main account
- [ ] Cannot correlate same user across different polls
- [ ] Membership in poll rooms not linkable to main identity
- [ ] Vote events not linkable to main identity
- [ ] Delegation events preserve anonymity
- [ ] Offline queue maintains anonymity
- [ ] Account cleanup doesn't leave traces
- [ ] Error messages don't leak correlation info

## Conclusion

Per-poll voter anonymity is a critical feature of Vodle that must be preserved in the Matrix migration. **Ephemeral Matrix accounts** provide the strongest guarantees and most closely match the current CouchDB implementation.

While this adds complexity to the implementation, it's essential for maintaining user trust and enabling honest deliberation without fear of judgment or retaliation. The transparency and verifiability benefits of Matrix do not require sacrificing anonymity - they can and should coexist.

**Next steps**:
1. Prototype ephemeral account creation and management
2. Test with Synapse homeserver configuration
3. Validate anonymity guarantees through security review
4. Document UX flows for troubleshooting
5. Plan for account lifecycle management
