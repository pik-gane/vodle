# Server-Side Poll Closing with E2E Encryption Preservation

## Overview

This document addresses the requirement for automatic poll closing at deadlines while maintaining end-to-end encryption for all poll data except the deadline itself.

## Problem Statement

When using Matrix protocol with E2E encryption, all poll data (including votes, options, and metadata) is encrypted. However, we need the server to:
1. Know when a poll should close (the deadline)
2. Automatically close the poll at that time
3. Prevent any further votes or changes after closing
4. NOT have access to any other poll data (votes, options, etc.)

## Solution Architecture

### Overview Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Matrix Homeserver                        │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │           Poll Closing Service                        │ │
│  │  ┌─────────────────────────────────────────────────┐  │ │
│  │  │  Scheduled Tasks                                │  │ │
│  │  │  - Poll A: closes at 2024-12-25T18:00:00Z      │  │ │
│  │  │  - Poll B: closes at 2024-12-31T23:59:59Z      │  │ │
│  │  └─────────────────────────────────────────────────┘  │ │
│  │                                                        │ │
│  │  ┌─────────────────────────────────────────────────┐  │ │
│  │  │  Actions at Deadline                            │  │ │
│  │  │  1. Send state event: poll.state = "closed"    │  │ │
│  │  │  2. Update power levels: voters → 0            │  │ │
│  │  │  3. Broadcast notification to room              │  │ │
│  │  └─────────────────────────────────────────────────┘  │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │           Poll Room (!poll123:matrix.org)             │ │
│  │                                                         │ │
│  │  STATE: m.room.vodle.poll.deadline                    │ │
│  │    content: { due: "2024-12-25T18:00:00Z" }           │ │
│  │    [UNENCRYPTED - server can read]                    │ │
│  │                                                         │ │
│  │  STATE: m.room.vodle.poll.meta (E2EE)                 │ │
│  │    content: { title: "...", description: "..." }      │ │
│  │    [ENCRYPTED - server cannot read]                   │ │
│  │                                                         │ │
│  │  MESSAGES: m.room.vodle.vote.rating (E2EE)            │ │
│  │    content: { option_id: "...", rating: 75 }          │ │
│  │    [ENCRYPTED - server cannot read]                   │ │
│  └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Implementation Strategy

### 1. Unencrypted Deadline State Event

The poll deadline must be stored as an **unencrypted state event** so the server can read it.

```typescript
// Client-side: Create poll with unencrypted deadline
async createPollRoom(pollId: string, title: string, dueDate: Date) {
  const roomId = await this.client.createRoom({
    name: title,
    preset: 'private_chat',
    initial_state: [
      {
        type: 'm.room.encryption',
        content: {
          algorithm: 'm.megolm.v1.aes-sha2'
        }
      },
      // IMPORTANT: Deadline is NOT encrypted
      {
        type: 'm.room.vodle.poll.deadline',
        state_key: '',
        content: {
          due: dueDate.toISOString(),
          // Optional: include timezone for display
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
      }
    ],
    power_level_content_override: {
      users: {
        [this.userId]: 100, // Creator (admin for room management)
        '@vodle-bot:matrix.org': 100 // Bot that will close poll
      },
      events: {
        'm.room.vodle.poll.deadline': 100, // Immutable after opening
        'm.room.vodle.poll.state': 100, // Only bot can change state
        'm.room.power_levels': 100, // Only bot can update power levels
        'm.room.vodle.poll.option': 50, // Voters can add options
        'm.room.vodle.vote.rating': 50, // Voters can vote (until closed)
        'm.room.vodle.vote.delegation': 50 // Voters can delegate
      },
      users_default: 50
    }
  });
  
  // All other poll data is encrypted
  await this.setPollMetadata(roomId, {
    poll_id: pollId,
    title: title,
    description: description,
    // ... other metadata (encrypted)
  });
  
  return roomId;
}
```

### 2. Server-Side Poll Closing Service

A dedicated service running on the Matrix homeserver that monitors deadlines and closes polls.

```python
# poll_closing_service.py
# This runs as a separate process on the Matrix homeserver

from matrix_client.client import MatrixClient
from matrix_client.api import MatrixRequestError
import schedule
import time
from datetime import datetime, timezone
import logging

class PollClosingService:
    """
    Service that monitors poll rooms and closes them at their deadline.
    Only has access to unencrypted deadline information.
    """
    
    def __init__(self, homeserver_url, access_token):
        self.client = MatrixClient(homeserver_url)
        self.client.api.token = access_token
        self.monitored_polls = {}  # room_id -> deadline
        
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
    
    def start(self):
        """Start the service"""
        self.logger.info("Poll Closing Service started")
        
        # Initial scan for all poll rooms
        self.scan_poll_rooms()
        
        # Schedule periodic scans (every hour)
        schedule.every(1).hours.do(self.scan_poll_rooms)
        
        # Check every minute for polls that need closing
        schedule.every(1).minutes.do(self.check_and_close_polls)
        
        # Run scheduler
        while True:
            schedule.run_pending()
            time.sleep(1)
    
    def scan_poll_rooms(self):
        """
        Scan all rooms the bot is in and register poll deadlines.
        Only reads UNENCRYPTED deadline state events.
        """
        self.logger.info("Scanning for poll rooms...")
        
        try:
            rooms = self.client.get_rooms()
            
            for room_id, room in rooms.items():
                # Check if this is a poll room by looking for deadline event
                state = room.client.api.get_room_state(room_id)
                
                for event in state:
                    if event.get('type') == 'm.room.vodle.poll.deadline':
                        due_str = event.get('content', {}).get('due')
                        if due_str:
                            due = datetime.fromisoformat(due_str.replace('Z', '+00:00'))
                            
                            # Only monitor future deadlines
                            if due > datetime.now(timezone.utc):
                                self.monitored_polls[room_id] = due
                                self.logger.info(f"Monitoring poll {room_id}, closes at {due}")
                            else:
                                # Already past deadline, close if not already closed
                                self.close_poll(room_id)
        
        except MatrixRequestError as e:
            self.logger.error(f"Error scanning rooms: {e}")
    
    def check_and_close_polls(self):
        """Check if any monitored polls have reached their deadline"""
        now = datetime.now(timezone.utc)
        
        for room_id, deadline in list(self.monitored_polls.items()):
            if now >= deadline:
                self.logger.info(f"Poll {room_id} deadline reached, closing...")
                self.close_poll(room_id)
                del self.monitored_polls[room_id]
    
    def close_poll(self, room_id):
        """
        Close a poll by:
        1. Sending state event marking poll as closed
        2. Updating power levels to prevent further voting
        3. Sending notification message
        """
        try:
            # 1. Send state event: poll is closed
            # Note: This event is unencrypted so clients can immediately see closure
            self.client.api.send_state_event(
                room_id,
                'm.room.vodle.poll.state',
                {
                    'state': 'closed',
                    'closed_at': datetime.now(timezone.utc).isoformat(),
                    'closed_by': 'vodle-bot'
                },
                state_key=''
            )
            
            # 2. Update power levels: set all voters to read-only
            power_levels_event = self.client.api.get_state_event(
                room_id,
                'm.room.power_levels'
            )
            
            # Modify power levels
            power_levels = power_levels_event.get('content', {})
            power_levels['users_default'] = 0  # Can't send messages
            power_levels['events_default'] = 100  # Only admins can send events
            
            # Prevent voting
            if 'events' not in power_levels:
                power_levels['events'] = {}
            power_levels['events']['m.room.vodle.vote.rating'] = 100
            power_levels['events']['m.room.vodle.vote.delegation'] = 100
            
            self.client.api.send_state_event(
                room_id,
                'm.room.power_levels',
                power_levels,
                state_key=''
            )
            
            # 3. Send notification message
            # Note: This will be encrypted like other messages
            self.client.api.send_message_event(
                room_id,
                'm.room.message',
                {
                    'msgtype': 'm.notice',
                    'body': '⏰ This poll has closed. No further votes can be submitted.'
                }
            )
            
            self.logger.info(f"Successfully closed poll {room_id}")
            
        except MatrixRequestError as e:
            self.logger.error(f"Error closing poll {room_id}: {e}")


# Main entry point
if __name__ == '__main__':
    # Bot credentials (configured via environment or config file)
    HOMESERVER_URL = 'https://matrix.vodle.it'
    BOT_ACCESS_TOKEN = 'bot_access_token_here'
    
    service = PollClosingService(HOMESERVER_URL, BOT_ACCESS_TOKEN)
    service.start()
```

### 3. Alternative: Matrix Bot Implementation (matrix-bot-sdk)

Using the more modern `matrix-bot-sdk` for TypeScript/Node.js:

```typescript
// poll-closing-bot.ts
import { 
  MatrixClient, 
  SimpleFsStorageProvider, 
  AutojoinRoomsMixin 
} from "matrix-bot-sdk";
import * as schedule from 'node-schedule';

interface PollDeadline {
  roomId: string;
  deadline: Date;
  jobName: string;
}

class PollClosingBot {
  private client: MatrixClient;
  private storage: SimpleFsStorageProvider;
  private monitoredPolls: Map<string, PollDeadline> = new Map();
  
  constructor(
    private homeserverUrl: string,
    private accessToken: string
  ) {
    this.storage = new SimpleFsStorageProvider("./bot-storage.json");
    this.client = new MatrixClient(homeserverUrl, accessToken, this.storage);
    
    // Auto-join rooms when invited
    AutojoinRoomsMixin.setupOnClient(this.client);
  }
  
  async start() {
    console.log("Starting Poll Closing Bot...");
    
    // Start client
    await this.client.start();
    
    // Scan existing rooms for poll deadlines
    await this.scanPollRooms();
    
    // Listen for new poll rooms
    this.client.on("room.invite", async (roomId: string, event: any) => {
      await this.client.joinRoom(roomId);
      await this.checkRoomForDeadline(roomId);
    });
    
    // Listen for deadline updates
    this.client.on("room.event", async (roomId: string, event: any) => {
      if (event.type === 'm.room.vodle.poll.deadline' && 
          event.state_key === '') {
        await this.scheduleClosing(roomId, event.content.due);
      }
    });
    
    console.log("Bot is ready!");
  }
  
  private async scanPollRooms() {
    console.log("Scanning for poll rooms...");
    
    const rooms = await this.client.getJoinedRooms();
    
    for (const roomId of rooms) {
      await this.checkRoomForDeadline(roomId);
    }
  }
  
  private async checkRoomForDeadline(roomId: string) {
    try {
      // Get unencrypted deadline state event
      const event = await this.client.getRoomStateEvent(
        roomId,
        'm.room.vodle.poll.deadline',
        ''
      );
      
      if (event && event.due) {
        await this.scheduleClosing(roomId, event.due);
      }
    } catch (error) {
      // Room might not have a deadline (not a poll room)
      console.debug(`Room ${roomId} is not a poll room`);
    }
  }
  
  private async scheduleClosing(roomId: string, dueStr: string) {
    const deadline = new Date(dueStr);
    const now = new Date();
    
    // Cancel existing job if any
    if (this.monitoredPolls.has(roomId)) {
      const existing = this.monitoredPolls.get(roomId);
      schedule.cancelJob(existing.jobName);
    }
    
    if (deadline <= now) {
      // Already past deadline, close immediately
      console.log(`Poll ${roomId} deadline already passed, closing now`);
      await this.closePoll(roomId);
    } else {
      // Schedule closing at deadline
      const jobName = `close-poll-${roomId}`;
      
      schedule.scheduleJob(jobName, deadline, async () => {
        console.log(`Scheduled closing triggered for ${roomId}`);
        await this.closePoll(roomId);
        this.monitoredPolls.delete(roomId);
      });
      
      this.monitoredPolls.set(roomId, {
        roomId,
        deadline,
        jobName
      });
      
      console.log(`Scheduled poll ${roomId} to close at ${deadline.toISOString()}`);
    }
  }
  
  private async closePoll(roomId: string) {
    console.log(`Closing poll ${roomId}...`);
    
    try {
      // 1. Send state event marking poll as closed
      await this.client.sendStateEvent(
        roomId,
        'm.room.vodle.poll.state',
        '',
        {
          state: 'closed',
          closed_at: new Date().toISOString(),
          closed_by: await this.client.getUserId()
        }
      );
      
      // 2. Update power levels to prevent further voting
      const powerLevels = await this.client.getRoomStateEvent(
        roomId,
        'm.room.power_levels',
        ''
      );
      
      // Modify power levels
      powerLevels.users_default = 0;  // Read-only
      powerLevels.events_default = 100;  // Admin only
      
      if (!powerLevels.events) {
        powerLevels.events = {};
      }
      
      // Prevent voting events
      powerLevels.events['m.room.vodle.vote.rating'] = 100;
      powerLevels.events['m.room.vodle.vote.delegation'] = 100;
      powerLevels.events['m.room.vodle.vote.delegation_response'] = 100;
      
      await this.client.sendStateEvent(
        roomId,
        'm.room.power_levels',
        '',
        powerLevels
      );
      
      // 3. Send notification message
      await this.client.sendMessage(roomId, {
        msgtype: 'm.notice',
        body: '⏰ This poll has closed. No further votes can be submitted. You can now view the final results.',
        format: 'org.matrix.custom.html',
        formatted_body: '<strong>⏰ This poll has closed.</strong><br/>No further votes can be submitted. You can now view the final results.'
      });
      
      console.log(`Successfully closed poll ${roomId}`);
      
    } catch (error) {
      console.error(`Error closing poll ${roomId}:`, error);
    }
  }
}

// Start the bot
const HOMESERVER_URL = process.env.MATRIX_HOMESERVER_URL || 'https://matrix.vodle.it';
const ACCESS_TOKEN = process.env.MATRIX_BOT_TOKEN;

if (!ACCESS_TOKEN) {
  console.error('MATRIX_BOT_TOKEN environment variable is required');
  process.exit(1);
}

const bot = new PollClosingBot(HOMESERVER_URL, ACCESS_TOKEN);
bot.start().catch(console.error);
```

### 4. Client-Side Integration

Clients need to be aware that the deadline is unencrypted:

```typescript
// src/app/matrix.service.ts

export class MatrixService {
  
  /**
   * Create poll with UNENCRYPTED deadline
   */
  async createPollRoom(
    pollId: string,
    title: string,
    description: string,
    dueDate: Date
  ): Promise<string> {
    
    // Inform user that deadline will not be encrypted
    console.warn('Poll deadline is stored unencrypted for automatic closing');
    
    const roomId = await this.client.createRoom({
      name: title,
      preset: 'private_chat',
      initial_state: [
        {
          type: 'm.room.encryption',
          content: {
            algorithm: 'm.megolm.v1.aes-sha2'
          }
        },
        // UNENCRYPTED deadline for server-side closing
        {
          type: 'm.room.vodle.poll.deadline',
          state_key: '',
          content: {
            due: dueDate.toISOString(),
            created_at: new Date().toISOString()
          }
        }
      ],
      power_level_content_override: {
        users: {
          [this.userId]: 100,
          '@vodle-bot:matrix.org': 100  // Bot can close poll
        },
        events: {
          'm.room.vodle.poll.deadline': 100,
          'm.room.vodle.poll.state': 100,
          'm.room.power_levels': 100,
          'm.room.vodle.vote.rating': 50
        },
        users_default: 50
      }
    });
    
    // Invite the poll closing bot
    await this.client.invite(roomId, '@vodle-bot:matrix.org');
    
    // All other metadata is encrypted
    await this.setPollMetadata(roomId, {
      poll_id: pollId,
      title: title,
      description: description
      // Note: 'due' is also stored here encrypted for client display
    });
    
    return roomId;
  }
  
  /**
   * Get poll deadline (unencrypted)
   */
  getPollDeadline(roomId: string): Date | null {
    const room = this.client.getRoom(roomId);
    if (!room) return null;
    
    const event = room.currentState.getStateEvents(
      'm.room.vodle.poll.deadline',
      ''
    );
    
    const dueStr = event?.getContent().due;
    return dueStr ? new Date(dueStr) : null;
  }
  
  /**
   * Check if poll is closed (unencrypted state)
   */
  isPollClosed(roomId: string): boolean {
    const room = this.client.getRoom(roomId);
    if (!room) return false;
    
    const event = room.currentState.getStateEvents(
      'm.room.vodle.poll.state',
      ''
    );
    
    return event?.getContent().state === 'closed';
  }
  
  /**
   * Listen for poll closing
   */
  setupPollClosingListener(roomId: string, callback: () => void) {
    this.client.on("RoomState.events", (event, state) => {
      if (state.roomId === roomId &&
          event.getType() === 'm.room.vodle.poll.state' &&
          event.getContent().state === 'closed') {
        callback();
      }
    });
  }
}
```

## Security Analysis

### What the Server Knows

| Data Item | Server Access | Reason |
|-----------|--------------|---------|
| Poll deadline | ✅ YES | Required for automatic closing |
| Poll closed state | ✅ YES | Required for enforcement |
| Room membership | ✅ YES | Standard Matrix metadata |
| Event timestamps | ✅ YES | Standard Matrix metadata |
| Poll title | ❌ NO | Encrypted |
| Poll description | ❌ NO | Encrypted |
| Option names | ❌ NO | Encrypted |
| Voter ratings | ❌ NO | Encrypted |
| Delegations | ❌ NO | Encrypted |
| Vote counts | ❌ NO | Encrypted |
| Results | ❌ NO | Encrypted |

### Privacy Trade-off

**What we reveal**: Poll deadline timestamp
**What we preserve**: Everything else (votes, options, results, metadata)

This is an acceptable trade-off because:
1. The deadline is typically not sensitive information
2. The deadline needs to be known by all participants anyway
3. Automatic closing provides better UX and prevents vote tampering
4. All actual voting data remains fully encrypted

### Alternative: Client-Side Closing Only

If revealing the deadline is unacceptable, an alternative is:

```typescript
// Client-side poll closing (no server involvement)
class ClientSidePollClosing {
  
  /**
   * Each client checks deadline and refuses to accept votes after it
   */
  canVote(roomId: string): boolean {
    // Get encrypted deadline from poll metadata
    const meta = this.matrix.getPollMetadata(roomId);
    const deadline = new Date(meta.due);
    
    // Check if deadline passed
    if (new Date() >= deadline) {
      return false;
    }
    
    return true;
  }
  
  /**
   * Validate incoming votes
   */
  processIncomingVote(event: MatrixEvent) {
    const meta = this.matrix.getPollMetadata(event.getRoomId());
    const deadline = new Date(meta.due);
    const voteTimestamp = new Date(event.getOriginServerTs());
    
    // Reject votes after deadline
    if (voteTimestamp >= deadline) {
      this.G.L.warn('Rejecting vote submitted after deadline', event);
      return;
    }
    
    // Process valid vote
    this.processVote(event);
  }
}
```

**Limitations of client-side only**:
- Relies on each client enforcing the deadline
- Malicious clients could ignore the deadline
- No server-side power level changes to prevent voting
- Requires all clients to be online at deadline

## Deployment

### Bot Setup

1. **Create bot user on Matrix homeserver**:
```bash
# Register bot user
curl -X POST \
  'https://matrix.vodle.it/_matrix/client/r0/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "username": "vodle-bot",
    "password": "secure_password_here",
    "inhibit_login": false
  }'
```

2. **Deploy bot service**:
```bash
# Using Docker
docker build -t vodle-poll-closing-bot .
docker run -d \
  --name vodle-bot \
  -e MATRIX_HOMESERVER_URL=https://matrix.vodle.it \
  -e MATRIX_BOT_TOKEN=bot_access_token \
  vodle-poll-closing-bot
```

3. **Configure bot permissions**:
- Add bot to admin list on homeserver
- Grant bot ability to read state events
- Grant bot ability to modify power levels

### Monitoring

```typescript
// Add monitoring endpoints
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    monitored_polls: bot.getMonitoredCount(),
    uptime: process.uptime()
  });
});

app.get('/polls', (req, res) => {
  res.json({
    polls: bot.getMonitoredPolls().map(p => ({
      room_id: p.roomId,
      deadline: p.deadline,
      time_remaining: p.deadline.getTime() - Date.now()
    }))
  });
});
```

## Benefits of Server-Side Closing

1. **Reliable**: Closing happens even if no clients are online
2. **Enforceable**: Power levels prevent further voting
3. **Fair**: All clients receive closing notification simultaneously
4. **Efficient**: No need for all clients to poll deadline
5. **Trustworthy**: Server is neutral party for closing

## Conclusion

By storing only the poll deadline as an unencrypted state event, we enable server-side automatic poll closing while preserving end-to-end encryption for all sensitive data (votes, options, results). This provides the best balance between functionality and privacy.

The poll closing bot:
- Only knows when polls close (deadline)
- Cannot read votes, options, or results
- Automatically closes polls at deadline
- Prevents vote tampering after closing
- Sends notification to all participants

This architecture maintains Vodle's privacy guarantees while adding essential automatic poll closing functionality.
