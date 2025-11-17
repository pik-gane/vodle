# Unambiguous Vote Timestamp Verification at Poll Closing

## Overview

This document addresses the critical requirement that **all voters must unambiguously know which votes were active at the deadline**. This ensures no disputes about which votes count and which arrived too late.

## Problem Statement

When a poll closes, there must be absolute clarity about:
1. Which votes were submitted before the deadline (and thus count)
2. Which votes arrived after the deadline (and thus don't count)
3. A tamper-proof record that all voters can verify independently

### Challenge: Clock Synchronization

Different clocks may disagree:
- Voter's device clock could be wrong
- Matrix homeserver clock could be wrong
- Network delays cause timestamp ambiguity
- Time zones add complexity

## Solution: Server Authoritative Timestamp with Verifiable Snapshot

### Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Poll Closing Process                             │
│                                                                     │
│  1. Bot detects deadline reached                                   │
│  2. Bot immediately:                                                │
│     a) Marks poll as "closing" (intermediate state)                │
│     b) Changes power levels (no new votes)                         │
│  3. Bot collects final vote snapshot from server timeline          │
│  4. Bot publishes signed snapshot with cutoff timestamp            │
│  5. Bot marks poll as "closed"                                     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

Timeline View:
─────────────────────────────────────────────────────────────────────►
│ Vote A    │ Vote B    │ DEADLINE  │ Vote C (rejected) │
│ t=10:00   │ t=11:00   │ t=12:00   │ t=12:01           │
│ ✓ Counts  │ ✓ Counts  │ ⏰ CLOSE  │ ✗ Too late        │
└───────────┴───────────┴───────────┴───────────────────────────────►
                         │
                         ▼
                    Server publishes:
                    "Final snapshot taken at 
                     server_timestamp: 2024-12-25T12:00:00.123Z
                     All votes with origin_server_ts <= this count"
```

## Implementation

### 1. Enhanced Poll Closing Bot with Snapshot Creation

```typescript
// poll-closing-bot.ts (enhanced)

import { MatrixClient } from "matrix-bot-sdk";
import * as crypto from 'crypto';

interface VoteSnapshot {
  event_id: string;
  sender: string;
  option_id: string;
  rating: number;
  origin_server_ts: number;  // Server's authoritative timestamp
}

interface PollClosingSnapshot {
  poll_id: string;
  room_id: string;
  deadline: string;
  closing_timestamp: number;  // When bot acted
  cutoff_timestamp: number;   // Last valid vote timestamp
  votes: VoteSnapshot[];
  snapshot_hash: string;      // Hash of all votes for verification
  bot_signature: string;      // Bot's signature
}

class EnhancedPollClosingBot {
  
  private async closePoll(roomId: string) {
    console.log(`Closing poll ${roomId}...`);
    
    try {
      const closingTime = Date.now();
      
      // STEP 1: Immediately prevent new votes
      await this.preventNewVotes(roomId);
      
      // STEP 2: Collect final vote snapshot from server timeline
      const snapshot = await this.createVoteSnapshot(roomId, closingTime);
      
      // STEP 3: Publish snapshot as state event (unencrypted for verification)
      await this.publishSnapshot(roomId, snapshot);
      
      // STEP 4: Mark poll as fully closed
      await this.markPollClosed(roomId, closingTime);
      
      // STEP 5: Notify participants
      await this.sendClosingNotification(roomId, snapshot);
      
      console.log(`Successfully closed poll ${roomId} with ${snapshot.votes.length} valid votes`);
      
    } catch (error) {
      console.error(`Error closing poll ${roomId}:`, error);
    }
  }
  
  /**
   * Immediately prevent new votes by changing power levels
   */
  private async preventNewVotes(roomId: string) {
    const powerLevels = await this.client.getRoomStateEvent(
      roomId,
      'm.room.power_levels',
      ''
    );
    
    // Set to closing state first (intermediate)
    await this.client.sendStateEvent(
      roomId,
      'm.room.vodle.poll.state',
      '',
      {
        state: 'closing',
        closing_started_at: new Date().toISOString()
      }
    );
    
    // Prevent all voting events immediately
    powerLevels.users_default = 0;
    powerLevels.events_default = 100;
    
    if (!powerLevels.events) {
      powerLevels.events = {};
    }
    
    powerLevels.events['m.room.vodle.vote.rating'] = 100;
    powerLevels.events['m.room.vodle.vote.delegation'] = 100;
    
    await this.client.sendStateEvent(
      roomId,
      'm.room.power_levels',
      '',
      powerLevels
    );
  }
  
  /**
   * Create snapshot of all valid votes based on server timestamps
   */
  private async createVoteSnapshot(
    roomId: string,
    closingTime: number
  ): Promise<PollClosingSnapshot> {
    
    // Get poll deadline
    const deadlineEvent = await this.client.getRoomStateEvent(
      roomId,
      'm.room.vodle.poll.deadline',
      ''
    );
    const deadline = new Date(deadlineEvent.due).getTime();
    
    // Get poll ID
    const meta = await this.client.getRoomStateEvent(
      roomId,
      'm.room.vodle.poll.meta',
      ''
    );
    const pollId = meta.poll_id;
    
    // Fetch complete room timeline
    const timeline = await this.fetchCompleteTimeline(roomId);
    
    // Filter for valid votes (based on origin_server_ts)
    const votes: VoteSnapshot[] = [];
    const latestVotePerVoterOption = new Map<string, VoteSnapshot>();
    
    for (const event of timeline) {
      if (event.type === 'm.room.vodle.vote.rating') {
        const originServerTs = event.origin_server_ts;
        
        // Only include votes submitted before deadline (using server timestamp)
        if (originServerTs <= deadline) {
          const snapshot: VoteSnapshot = {
            event_id: event.event_id,
            sender: event.sender,
            option_id: event.content.option_id,
            rating: event.content.rating,
            origin_server_ts: originServerTs
          };
          
          // Key by voter + option (keep only latest rating per option)
          const key = `${event.sender}:${event.content.option_id}`;
          
          if (!latestVotePerVoterOption.has(key) ||
              latestVotePerVoterOption.get(key).origin_server_ts < originServerTs) {
            latestVotePerVoterOption.set(key, snapshot);
          }
        }
      }
    }
    
    // Convert to array
    votes.push(...latestVotePerVoterOption.values());
    
    // Sort by timestamp for deterministic ordering
    votes.sort((a, b) => a.origin_server_ts - b.origin_server_ts);
    
    // Create snapshot object
    const snapshot: PollClosingSnapshot = {
      poll_id: pollId,
      room_id: roomId,
      deadline: new Date(deadline).toISOString(),
      closing_timestamp: closingTime,
      cutoff_timestamp: deadline,
      votes: votes,
      snapshot_hash: this.hashSnapshot(votes),
      bot_signature: ''  // Will be filled next
    };
    
    // Sign the snapshot
    snapshot.bot_signature = this.signSnapshot(snapshot);
    
    return snapshot;
  }
  
  /**
   * Fetch complete room timeline (paginating if necessary)
   */
  private async fetchCompleteTimeline(roomId: string): Promise<any[]> {
    const allEvents: any[] = [];
    let fromToken: string | null = null;
    
    // Fetch in batches
    while (true) {
      const response = await this.client.doRequest(
        'GET',
        `/_matrix/client/r0/rooms/${encodeURIComponent(roomId)}/messages`,
        {
          dir: 'b',  // backwards from most recent
          limit: 100,
          from: fromToken || undefined
        }
      );
      
      allEvents.push(...response.chunk);
      
      if (!response.end || response.chunk.length === 0) {
        break;
      }
      
      fromToken = response.end;
    }
    
    return allEvents;
  }
  
  /**
   * Create deterministic hash of vote snapshot
   */
  private hashSnapshot(votes: VoteSnapshot[]): string {
    // Create canonical string representation
    const canonical = votes.map(v => 
      `${v.event_id}:${v.sender}:${v.option_id}:${v.rating}:${v.origin_server_ts}`
    ).join('|');
    
    // Hash it
    return crypto.createHash('sha256').update(canonical).digest('hex');
  }
  
  /**
   * Sign snapshot with bot's private key
   */
  private signSnapshot(snapshot: PollClosingSnapshot): string {
    const data = JSON.stringify({
      poll_id: snapshot.poll_id,
      room_id: snapshot.room_id,
      cutoff_timestamp: snapshot.cutoff_timestamp,
      snapshot_hash: snapshot.snapshot_hash,
      vote_count: snapshot.votes.length
    });
    
    // Sign with bot's private key (assuming ed25519)
    // In production, use proper key management
    const privateKey = this.getBotPrivateKey();
    const signature = crypto.sign('sha256', Buffer.from(data), privateKey);
    
    return signature.toString('base64');
  }
  
  /**
   * Publish snapshot as unencrypted state event
   */
  private async publishSnapshot(
    roomId: string,
    snapshot: PollClosingSnapshot
  ) {
    // Publish complete snapshot as state event
    // This is UNENCRYPTED so all voters can verify
    await this.client.sendStateEvent(
      roomId,
      'm.room.vodle.poll.closing_snapshot',
      '',
      {
        version: 1,
        poll_id: snapshot.poll_id,
        deadline: snapshot.deadline,
        closing_timestamp: snapshot.closing_timestamp,
        cutoff_timestamp: snapshot.cutoff_timestamp,
        vote_count: snapshot.votes.length,
        snapshot_hash: snapshot.snapshot_hash,
        bot_signature: snapshot.bot_signature,
        bot_user_id: await this.client.getUserId(),
        // Include vote summary (event IDs and timestamps for verification)
        vote_summary: snapshot.votes.map(v => ({
          event_id: v.event_id,
          sender: v.sender,
          option_id: v.option_id,
          origin_server_ts: v.origin_server_ts,
          timestamp_iso: new Date(v.origin_server_ts).toISOString()
        })),
        // Optional: include full vote data if not encrypted separately
        // votes: snapshot.votes
      }
    );
  }
  
  /**
   * Mark poll as fully closed
   */
  private async markPollClosed(roomId: string, closingTime: number) {
    await this.client.sendStateEvent(
      roomId,
      'm.room.vodle.poll.state',
      '',
      {
        state: 'closed',
        closed_at: new Date(closingTime).toISOString(),
        closed_by: await this.client.getUserId()
      }
    );
  }
  
  /**
   * Send notification with snapshot info
   */
  private async sendClosingNotification(
    roomId: string,
    snapshot: PollClosingSnapshot
  ) {
    const message = `
⏰ **Poll Closed**

This poll closed at: ${snapshot.deadline}

**Final Vote Count**: ${snapshot.votes.length} valid votes
**Cutoff Timestamp**: ${new Date(snapshot.cutoff_timestamp).toISOString()}
**Snapshot Hash**: \`${snapshot.snapshot_hash.substring(0, 16)}...\`

All votes with server timestamp ≤ ${new Date(snapshot.cutoff_timestamp).toISOString()} are included in the final tally.

You can verify the snapshot using the closing_snapshot state event.
    `.trim();
    
    await this.client.sendMessage(roomId, {
      msgtype: 'm.notice',
      body: message,
      format: 'org.matrix.custom.html',
      formatted_body: message.replace(/\n/g, '<br/>')
    });
  }
  
  private getBotPrivateKey(): Buffer {
    // In production, load from secure storage
    // For now, placeholder
    return Buffer.from(process.env.BOT_PRIVATE_KEY || '', 'base64');
  }
}
```

### 2. Client-Side Verification

Clients must verify the snapshot to ensure votes are counted correctly:

```typescript
// src/app/matrix-verification.service.ts

import * as crypto from 'crypto';

export interface VerificationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  snapshot?: PollClosingSnapshot;
}

export class MatrixVerificationService {
  
  constructor(
    private matrix: MatrixService,
    private G: GlobalService
  ) {}
  
  /**
   * Verify poll closing snapshot
   */
  async verifyPollClosing(roomId: string): Promise<VerificationResult> {
    const result: VerificationResult = {
      valid: true,
      errors: [],
      warnings: []
    };
    
    try {
      // 1. Get closing snapshot from state
      const snapshot = await this.getClosingSnapshot(roomId);
      if (!snapshot) {
        result.valid = false;
        result.errors.push('No closing snapshot found');
        return result;
      }
      
      result.snapshot = snapshot;
      
      // 2. Verify snapshot hash
      const hashValid = await this.verifySnapshotHash(roomId, snapshot);
      if (!hashValid) {
        result.valid = false;
        result.errors.push('Snapshot hash verification failed');
      }
      
      // 3. Verify bot signature
      const signatureValid = await this.verifyBotSignature(snapshot);
      if (!signatureValid) {
        result.valid = false;
        result.errors.push('Bot signature verification failed');
      }
      
      // 4. Verify all votes in snapshot are in timeline
      const timelineValid = await this.verifyVotesInTimeline(roomId, snapshot);
      if (!timelineValid) {
        result.valid = false;
        result.errors.push('Some votes in snapshot not found in timeline');
      }
      
      // 5. Verify timestamps (all votes before deadline)
      const timestampsValid = this.verifyTimestamps(snapshot);
      if (!timestampsValid) {
        result.valid = false;
        result.errors.push('Some votes have timestamps after deadline');
      }
      
      // 6. Check for votes after deadline in timeline (should be excluded)
      const lateVotes = await this.findLateVotes(roomId, snapshot);
      if (lateVotes.length > 0) {
        result.warnings.push(
          `${lateVotes.length} votes were submitted after deadline and correctly excluded`
        );
      }
      
      // 7. Verify no duplicate votes (only latest per voter/option)
      const duplicatesValid = this.verifyNoDuplicates(snapshot);
      if (!duplicatesValid) {
        result.valid = false;
        result.errors.push('Duplicate votes found in snapshot');
      }
      
    } catch (error) {
      result.valid = false;
      result.errors.push(`Verification error: ${error.message}`);
    }
    
    return result;
  }
  
  /**
   * Get closing snapshot from room state
   */
  private async getClosingSnapshot(roomId: string): Promise<PollClosingSnapshot | null> {
    const room = this.matrix.client.getRoom(roomId);
    if (!room) return null;
    
    const event = room.currentState.getStateEvents(
      'm.room.vodle.poll.closing_snapshot',
      ''
    );
    
    return event?.getContent() || null;
  }
  
  /**
   * Verify snapshot hash matches votes
   */
  private async verifySnapshotHash(
    roomId: string,
    snapshot: PollClosingSnapshot
  ): Promise<boolean> {
    // Fetch votes from timeline
    const votes = await this.fetchVotesFromTimeline(roomId, snapshot.vote_summary);
    
    // Compute hash
    const computedHash = this.computeSnapshotHash(votes);
    
    return computedHash === snapshot.snapshot_hash;
  }
  
  /**
   * Fetch vote events from timeline
   */
  private async fetchVotesFromTimeline(
    roomId: string,
    voteSummary: any[]
  ): Promise<VoteSnapshot[]> {
    const votes: VoteSnapshot[] = [];
    const room = this.matrix.client.getRoom(roomId);
    if (!room) return votes;
    
    const timeline = room.getLiveTimeline();
    const events = timeline.getEvents();
    
    // Create map of event IDs we're looking for
    const expectedEventIds = new Set(voteSummary.map(v => v.event_id));
    
    for (const event of events) {
      if (expectedEventIds.has(event.getId())) {
        const content = event.getContent();
        votes.push({
          event_id: event.getId(),
          sender: event.getSender(),
          option_id: content.option_id,
          rating: content.rating,
          origin_server_ts: event.getTs()
        });
      }
    }
    
    return votes;
  }
  
  /**
   * Compute snapshot hash
   */
  private computeSnapshotHash(votes: VoteSnapshot[]): string {
    // Sort by timestamp for deterministic ordering
    const sorted = [...votes].sort((a, b) => 
      a.origin_server_ts - b.origin_server_ts
    );
    
    // Create canonical string
    const canonical = sorted.map(v => 
      `${v.event_id}:${v.sender}:${v.option_id}:${v.rating}:${v.origin_server_ts}`
    ).join('|');
    
    // Hash it (using WebCrypto API)
    const encoder = new TextEncoder();
    const data = encoder.encode(canonical);
    
    return crypto.subtle.digest('SHA-256', data)
      .then(buffer => {
        const hex = Array.from(new Uint8Array(buffer))
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');
        return hex;
      });
  }
  
  /**
   * Verify bot signature
   */
  private async verifyBotSignature(snapshot: PollClosingSnapshot): Promise<boolean> {
    // Get bot's public key from well-known location or state event
    const botPublicKey = await this.getBotPublicKey();
    
    const data = JSON.stringify({
      poll_id: snapshot.poll_id,
      room_id: snapshot.room_id,
      cutoff_timestamp: snapshot.cutoff_timestamp,
      snapshot_hash: snapshot.snapshot_hash,
      vote_count: snapshot.vote_count
    });
    
    // Verify signature
    const signature = Buffer.from(snapshot.bot_signature, 'base64');
    const isValid = crypto.verify(
      'sha256',
      Buffer.from(data),
      botPublicKey,
      signature
    );
    
    return isValid;
  }
  
  /**
   * Verify all votes exist in timeline
   */
  private async verifyVotesInTimeline(
    roomId: string,
    snapshot: PollClosingSnapshot
  ): Promise<boolean> {
    const room = this.matrix.client.getRoom(roomId);
    if (!room) return false;
    
    const timeline = room.getLiveTimeline();
    const events = timeline.getEvents();
    const eventIds = new Set(events.map(e => e.getId()));
    
    // Check all snapshot votes exist in timeline
    for (const voteSummary of snapshot.vote_summary) {
      if (!eventIds.has(voteSummary.event_id)) {
        this.G.L.error('Vote in snapshot not found in timeline', voteSummary.event_id);
        return false;
      }
    }
    
    return true;
  }
  
  /**
   * Verify all timestamps are before deadline
   */
  private verifyTimestamps(snapshot: PollClosingSnapshot): boolean {
    const deadline = snapshot.cutoff_timestamp;
    
    for (const voteSummary of snapshot.vote_summary) {
      if (voteSummary.origin_server_ts > deadline) {
        this.G.L.error(
          'Vote timestamp after deadline',
          voteSummary.event_id,
          new Date(voteSummary.origin_server_ts),
          new Date(deadline)
        );
        return false;
      }
    }
    
    return true;
  }
  
  /**
   * Find votes submitted after deadline (should not be in snapshot)
   */
  private async findLateVotes(
    roomId: string,
    snapshot: PollClosingSnapshot
  ): Promise<any[]> {
    const lateVotes: any[] = [];
    const room = this.matrix.client.getRoom(roomId);
    if (!room) return lateVotes;
    
    const timeline = room.getLiveTimeline();
    const events = timeline.getEvents();
    
    const snapshotEventIds = new Set(
      snapshot.vote_summary.map(v => v.event_id)
    );
    
    for (const event of events) {
      if (event.getType() === 'm.room.vodle.vote.rating') {
        const eventId = event.getId();
        const timestamp = event.getTs();
        
        // Vote after deadline
        if (timestamp > snapshot.cutoff_timestamp) {
          // Should NOT be in snapshot
          if (snapshotEventIds.has(eventId)) {
            this.G.L.error('Late vote incorrectly included in snapshot', eventId);
          } else {
            lateVotes.push({
              event_id: eventId,
              sender: event.getSender(),
              timestamp: timestamp,
              late_by_ms: timestamp - snapshot.cutoff_timestamp
            });
          }
        }
      }
    }
    
    return lateVotes;
  }
  
  /**
   * Verify no duplicate votes (only latest per voter/option)
   */
  private verifyNoDuplicates(snapshot: PollClosingSnapshot): boolean {
    const seen = new Set<string>();
    
    for (const voteSummary of snapshot.vote_summary) {
      const key = `${voteSummary.sender}:${voteSummary.option_id}`;
      
      if (seen.has(key)) {
        this.G.L.error('Duplicate vote in snapshot', key);
        return false;
      }
      
      seen.add(key);
    }
    
    return true;
  }
  
  /**
   * Get bot public key for signature verification
   */
  private async getBotPublicKey(): Promise<Buffer> {
    // In production, fetch from well-known location
    // e.g., /.well-known/vodle-bot-public-key
    
    // For now, hardcode or get from environment
    return Buffer.from(this.G.environment.botPublicKey, 'base64');
  }
  
  /**
   * Display verification result to user
   */
  displayVerificationResult(result: VerificationResult) {
    if (result.valid) {
      this.G.L.info('✅ Poll closing verified successfully');
      
      if (result.snapshot) {
        console.log('📊 Final vote count:', result.snapshot.vote_count);
        console.log('⏰ Cutoff:', new Date(result.snapshot.cutoff_timestamp).toISOString());
        console.log('🔐 Snapshot hash:', result.snapshot.snapshot_hash);
      }
      
      if (result.warnings.length > 0) {
        console.log('⚠️ Warnings:');
        result.warnings.forEach(w => console.log('  -', w));
      }
    } else {
      this.G.L.error('❌ Poll closing verification FAILED');
      console.log('Errors:');
      result.errors.forEach(e => console.log('  -', e));
    }
  }
}
```

### 3. UI for Voters to Verify Closing

```typescript
// src/app/pages/poll-results/poll-results.page.ts

export class PollResultsPage {
  
  verificationResult: VerificationResult;
  showVerificationDetails = false;
  
  async ionViewWillEnter() {
    // Verify poll closing when viewing results
    this.verificationResult = await this.G.V.verifyPollClosing(this.poll.roomId);
    
    if (!this.verificationResult.valid) {
      this.showVerificationWarning();
    }
  }
  
  async showVerificationWarning() {
    const alert = await this.alertCtrl.create({
      header: 'Verification Failed',
      message: 'The poll closing could not be verified. Results may not be trustworthy.',
      buttons: [
        {
          text: 'Details',
          handler: () => {
            this.showVerificationDetails = true;
          }
        },
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });
    
    await alert.present();
  }
  
  getVerificationStatusIcon(): string {
    if (!this.verificationResult) return '⏳';
    return this.verificationResult.valid ? '✅' : '❌';
  }
  
  getVerificationStatusText(): string {
    if (!this.verificationResult) return 'Verifying...';
    return this.verificationResult.valid 
      ? 'Verified' 
      : 'Verification Failed';
  }
}
```

```html
<!-- src/app/pages/poll-results/poll-results.page.html -->

<ion-header>
  <ion-toolbar>
    <ion-title>Poll Results</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
  
  <!-- Verification Status Badge -->
  <ion-card>
    <ion-card-header>
      <ion-card-title>
        {{ getVerificationStatusIcon() }} Closing Verification
      </ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <p><strong>Status:</strong> {{ getVerificationStatusText() }}</p>
      
      <div *ngIf="verificationResult?.snapshot">
        <p><strong>Valid Votes:</strong> {{ verificationResult.snapshot.vote_count }}</p>
        <p><strong>Deadline:</strong> {{ verificationResult.snapshot.deadline | date:'full' }}</p>
        <p><strong>Snapshot Hash:</strong> 
          <code>{{ verificationResult.snapshot.snapshot_hash.substring(0, 16) }}...</code>
        </p>
      </div>
      
      <ion-button 
        expand="block" 
        fill="outline" 
        (click)="showVerificationDetails = !showVerificationDetails">
        {{ showVerificationDetails ? 'Hide' : 'Show' }} Details
      </ion-button>
      
      <div *ngIf="showVerificationDetails">
        <h4>Verification Details</h4>
        
        <div *ngIf="verificationResult.errors.length > 0">
          <p><strong>Errors:</strong></p>
          <ul>
            <li *ngFor="let error of verificationResult.errors" class="error">
              {{ error }}
            </li>
          </ul>
        </div>
        
        <div *ngIf="verificationResult.warnings.length > 0">
          <p><strong>Warnings:</strong></p>
          <ul>
            <li *ngFor="let warning of verificationResult.warnings" class="warning">
              {{ warning }}
            </li>
          </ul>
        </div>
        
        <div *ngIf="verificationResult.snapshot">
          <h5>Vote Summary</h5>
          <ion-list>
            <ion-item *ngFor="let vote of verificationResult.snapshot.vote_summary">
              <ion-label>
                <h3>{{ vote.sender }}</h3>
                <p>Option: {{ vote.option_id }}</p>
                <p>Timestamp: {{ vote.timestamp_iso }}</p>
              </ion-label>
            </ion-item>
          </ion-list>
        </div>
      </div>
    </ion-card-content>
  </ion-card>
  
  <!-- Poll Results -->
  <ion-card>
    <ion-card-header>
      <ion-card-title>Results</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <!-- Display results only if verification passed -->
      <div *ngIf="verificationResult?.valid">
        <!-- Results display here -->
      </div>
      <div *ngIf="!verificationResult?.valid" class="warning-box">
        <p>⚠️ Results cannot be trusted due to verification failure.</p>
      </div>
    </ion-card-content>
  </ion-card>
  
</ion-content>
```

## Key Features of This Solution

### 1. Server Authoritative Timestamp
- Uses Matrix homeserver's `origin_server_ts` as source of truth
- Eliminates client clock disagreements
- Provides consistent timeline for all voters

### 2. Tamper-Proof Snapshot
- Bot creates cryptographic hash of all valid votes
- Bot signs snapshot with private key
- All voters can verify independently
- Prevents post-closing manipulation

### 3. Unambiguous Cutoff
- Clear cutoff timestamp published
- All votes with `origin_server_ts ≤ cutoff` count
- Late votes explicitly excluded and documented

### 4. Independent Verification
- Each voter can verify closing snapshot
- Hash verification ensures vote integrity
- Signature verification ensures authenticity
- Timeline verification ensures completeness

### 5. Transparency
- Snapshot includes all event IDs and timestamps
- Voters can cross-check with their local timeline
- Late votes are identified and explained

## Benefits

1. **No Ambiguity**: Clear, verifiable record of which votes count
2. **Fair**: Server timestamp eliminates clock differences
3. **Transparent**: All voters can verify independently
4. **Tamper-Proof**: Cryptographic hash and signature
5. **Trustworthy**: Bot is neutral third party
6. **Auditable**: Complete vote history preserved

## Handling Edge Cases

### What if bot fails to close poll?

```typescript
// Client-side fallback
class ClientSideClosingFallback {
  
  /**
   * If bot hasn't closed poll within grace period, 
   * clients can create their own snapshot for local verification
   */
  async createClientSnapshot(roomId: string): Promise<void> {
    const deadline = this.getDeadline(roomId);
    const gracePeriod = 5 * 60 * 1000; // 5 minutes
    
    if (Date.now() > deadline.getTime() + gracePeriod) {
      // Bot should have closed by now
      const snapshot = await this.createLocalSnapshot(roomId, deadline);
      
      // Store locally
      await this.storage.set(`client_snapshot_${roomId}`, snapshot);
      
      // Warn user
      this.showWarning('Bot did not close poll. Using local snapshot.');
    }
  }
}
```

### What if voters disagree on snapshot?

```typescript
// Dispute resolution
class SnapshotDisputeResolution {
  
  /**
   * If voters see different snapshots, they can compare
   */
  async compareSnapshots(roomId: string): Promise<void> {
    // Get official bot snapshot
    const botSnapshot = await this.getOfficialSnapshot(roomId);
    
    // Get my local view
    const myView = await this.createLocalSnapshot(roomId, botSnapshot.cutoff_timestamp);
    
    // Compare
    if (botSnapshot.snapshot_hash !== myView.snapshot_hash) {
      // Identify differences
      const differences = this.identifyDifferences(botSnapshot, myView);
      
      // Report to user
      this.showDifferences(differences);
    }
  }
}
```

## Conclusion

By using the Matrix homeserver's authoritative timestamps and creating a cryptographically signed snapshot of all valid votes at closing, we achieve:

1. **Unambiguous determination** of which votes were active at deadline
2. **Independent verification** by all voters
3. **Tamper-proof record** that cannot be manipulated
4. **Fair and transparent** closing process
5. **No clock synchronization issues**

All voters can be confident that:
- They know exactly which votes count
- The snapshot cannot be tampered with
- They can verify the closing independently
- No votes are improperly included or excluded

This provides the mathematical certainty needed for a trustworthy voting system while maintaining E2E encryption for all sensitive data.
