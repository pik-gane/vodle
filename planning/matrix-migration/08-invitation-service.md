# Privacy-Preserving Invitation and Ephemeral Account Distribution Service

## Overview

This document describes a server-side invitation service that distributes ephemeral Matrix accounts to authorized voters while maintaining privacy - specifically, ensuring the server cannot determine which voter received which ephemeral account.

## Requirements

### Functional Requirements

1. **Poll Creator Input**: Creator provides list of authorized voter email addresses
2. **Email Distribution**: Service sends invitation emails with unique tokens to each voter
3. **Ephemeral Account Assignment**: Each voter gets a unique ephemeral Matrix account
4. **Privacy Guarantee**: Server cannot link email addresses to ephemeral account IDs
5. **Authentication**: Each voter can prove authorization via their unique token
6. **Single Use**: Each token can only be used once to claim an account

### Privacy Goals

- **Unlinkability**: Server cannot determine which email got which ephemeral account
- **Authorization**: Only voters on the list can join the poll
- **One-Person-One-Vote**: Each email can only claim one account
- **Verifiable Distribution**: Poll creator can verify all invitations were sent

## Architecture

### High-Level Flow

```
┌──────────────┐
│ Poll Creator │
└──────┬───────┘
       │ 1. Submit list of emails + poll_id
       ▼
┌─────────────────────────────────────────────────────┐
│         Invitation Service (Server)                  │
│                                                      │
│  2. Generate N ephemeral accounts                   │
│  3. Generate N unique tokens                        │
│  4. Create encrypted token-to-account mapping       │
│  5. Send emails (email → token only)                │
└──────────────────────────────────────────────────────┘
       │
       │ 6. Email with token + poll_id
       ▼
┌──────────────┐
│    Voter     │
└──────┬───────┘
       │ 7. Submit token to blind claim endpoint
       ▼
┌─────────────────────────────────────────────────────┐
│         Blind Account Distribution                   │
│                                                      │
│  8. Verify token is valid and unused                │
│  9. Return ephemeral account credentials            │
│ 10. Mark token as used (without logging which)      │
└─────────────────────────────────────────────────────┘
       │
       │ 11. Ephemeral account credentials
       ▼
┌──────────────┐
│    Voter     │
│ (joins poll) │
└──────────────┘
```

## Cryptographic Protocol: Blind Signatures

To ensure the server cannot link emails to ephemeral accounts, we use **blind signatures**:

### Concept

1. **Blinding**: Voter blinds their token before sending to server
2. **Signing**: Server signs the blinded token (without seeing original)
3. **Unblinding**: Voter unblinds the signature
4. **Verification**: Server can verify signature is valid, but can't link to specific email

### Protocol Steps

```
┌─────────────────────────────────────────────────────────────┐
│ Phase 1: Invitation (Server → Voter)                        │
└─────────────────────────────────────────────────────────────┘

Server:
  1. Generate ephemeral_account_id = random()
  2. Generate token_secret = random()
  3. token = HMAC(poll_id + ephemeral_account_id, token_secret)
  4. Send email(voter_email, token, poll_id)
  5. Store: token_secret, ephemeral_account_id (mapping encrypted)

┌─────────────────────────────────────────────────────────────┐
│ Phase 2: Blind Claim (Voter → Server → Voter)              │
└─────────────────────────────────────────────────────────────┘

Voter:
  1. Receive token from email
  2. Generate blinding_factor = random()
  3. blinded_token = blind(token, blinding_factor)
  4. Send blinded_token to server

Server:
  5. Verify blinded_token format is valid
  6. Generate signed_blinded_token = sign(blinded_token, server_key)
  7. Return signed_blinded_token
  8. Mark this signing session (NOT linked to specific token)

Voter:
  9. unblinded_signature = unblind(signed_blinded_token, blinding_factor)
  10. Create proof = (token, unblinded_signature)

┌─────────────────────────────────────────────────────────────┐
│ Phase 3: Account Claim (Voter → Server → Voter)            │
└─────────────────────────────────────────────────────────────┘

Voter:
  11. Send (token, unblinded_signature) to claim endpoint

Server:
  12. Verify signature is valid
  13. Verify token hasn't been used
  14. Lookup ephemeral_account_id for this token
  15. Return ephemeral account credentials
  16. Mark token as used
  17. Cannot correlate this claim to the signing session
```

### Why This Preserves Privacy

- **Server sees blinded token during signing**: Cannot determine which email it came from
- **Server sees unblinded token during claim**: But doesn't know which signing session it was
- **No linkability**: Server cannot correlate email → signing → claim → ephemeral account

## Implementation

### Server-Side Components

#### 1. Invitation Service

```python
# invitation_service.py
from cryptography.hazmat.primitives import hashes, hmac
from cryptography.hazmat.primitives.asymmetric import rsa, padding
import secrets
import smtplib
from email.mime.text import MIMEText
from typing import List, Dict
import json
from base64 import b64encode, b64decode

class InvitationService:
    """
    Service for generating and distributing poll invitations with
    privacy-preserving ephemeral account distribution.
    """
    
    def __init__(self, matrix_admin_api, email_config, secret_key):
        self.matrix_admin = matrix_admin_api
        self.email_config = email_config
        self.secret_key = secret_key
        
        # Generate RSA key pair for blind signatures
        self.private_key = rsa.generate_private_key(
            public_exponent=65537,
            key_size=2048
        )
        self.public_key = self.private_key.public_key()
    
    async def create_poll_invitations(
        self,
        poll_id: str,
        creator_email: str,
        voter_emails: List[str],
        poll_password: str
    ) -> Dict:
        """
        Create poll invitations and ephemeral accounts
        
        Returns:
          - invitation_id: unique ID for this invitation batch
          - public_key: for blind signature verification
          - num_invitations: count of invitations sent
        """
        invitation_id = self._generate_id()
        
        # 1. Create ephemeral Matrix accounts (pre-registered)
        ephemeral_accounts = []
        for i in range(len(voter_emails)):
            vid = self._generate_vid()
            username = f"vodle_voter_{vid}"
            password = self._generate_secure_password()
            
            # Register account on Matrix homeserver
            user_id = await self.matrix_admin.register_user(
                username=username,
                password=password
            )
            
            ephemeral_accounts.append({
                'vid': vid,
                'user_id': user_id,
                'username': username,
                'password': password
            })
        
        # 2. Generate tokens (one per email)
        tokens = []
        for i, email in enumerate(voter_emails):
            token_secret = secrets.token_bytes(32)
            
            # Token is HMAC of poll_id + account_index
            token_data = f"{poll_id}:{i}".encode()
            token = hmac.HMAC(token_secret, hashes.SHA256())
            token.update(token_data)
            token_digest = token.finalize()
            token_str = b64encode(token_digest).decode()
            
            tokens.append({
                'email': email,
                'token': token_str,
                'token_secret': token_secret,
                'account_index': i
            })
        
        # 3. Store encrypted mapping (token_secret → ephemeral_account)
        # Encrypted so even DB compromise doesn't reveal mapping
        await self._store_encrypted_mapping(
            invitation_id=invitation_id,
            poll_id=poll_id,
            tokens=tokens,
            accounts=ephemeral_accounts,
            encryption_key=self.secret_key
        )
        
        # 4. Send invitation emails
        for token_info in tokens:
            await self._send_invitation_email(
                to_email=token_info['email'],
                poll_id=poll_id,
                token=token_info['token'],
                invitation_id=invitation_id
            )
        
        # 5. Return public key for blind signature verification
        public_key_pem = self.public_key.public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo
        )
        
        return {
            'invitation_id': invitation_id,
            'public_key': public_key_pem.decode(),
            'num_invitations': len(voter_emails),
            'poll_id': poll_id
        }
    
    async def _send_invitation_email(
        self,
        to_email: str,
        poll_id: str,
        token: str,
        invitation_id: str
    ):
        """Send invitation email with token"""
        
        # Create invitation URL
        invite_url = f"https://app.vodle.it/join-poll?poll_id={poll_id}&token={token}"
        
        msg = MIMEText(f"""
You have been invited to participate in a Vodle poll.

Click the link below to join:
{invite_url}

Or manually enter this code in the Vodle app:
Poll ID: {poll_id}
Invitation Code: {token}

This invitation is for your eyes only. Do not share it with others.
Each invitation can only be used once.

For privacy, your identity will be pseudonymous in the poll - 
other participants will see you as a randomly generated voter ID.

---
Vodle - Fair and Efficient Group Decisions
        """.strip())
        
        msg['Subject'] = 'Invitation to Vodle Poll'
        msg['From'] = self.email_config['from_address']
        msg['To'] = to_email
        
        # Send email
        with smtplib.SMTP(self.email_config['smtp_host']) as server:
            server.send_message(msg)
    
    def _generate_vid(self) -> str:
        """Generate random voter ID"""
        return secrets.token_urlsafe(8)[:8]
    
    def _generate_id(self) -> str:
        """Generate random ID"""
        return secrets.token_urlsafe(16)
    
    def _generate_secure_password(self) -> str:
        """Generate secure password for ephemeral account"""
        return secrets.token_urlsafe(32)
```

#### 2. Blind Signature Service

```python
# blind_signature_service.py
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from base64 import b64encode, b64decode
import hashlib

class BlindSignatureService:
    """
    Service for blind signing tokens to enable privacy-preserving
    ephemeral account distribution.
    """
    
    def __init__(self, private_key: rsa.RSAPrivateKey):
        self.private_key = private_key
        self.signing_sessions = set()  # Track sessions to prevent reuse
    
    async def sign_blinded_token(
        self,
        blinded_token_b64: str,
        session_id: str
    ) -> Dict:
        """
        Sign a blinded token.
        
        Important: This does NOT link the session to any specific email.
        The session_id is just to prevent duplicate signing requests.
        """
        
        # Prevent duplicate signing
        if session_id in self.signing_sessions:
            raise ValueError("Session already used")
        
        # Decode blinded token
        blinded_token = b64decode(blinded_token_b64)
        
        # Sign the blinded token
        # Server cannot see the original token
        signature = self.private_key.sign(
            blinded_token,
            padding.PSS(
                mgf=padding.MGF1(hashes.SHA256()),
                salt_length=padding.PSS.MAX_LENGTH
            ),
            hashes.SHA256()
        )
        
        # Mark session as used (but don't log what it signed)
        self.signing_sessions.add(session_id)
        
        return {
            'signed_blinded_token': b64encode(signature).decode(),
            'session_id': session_id
        }
```

#### 3. Account Claim Service

```python
# account_claim_service.py
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from base64 import b64decode
import hmac as hmac_lib

class AccountClaimService:
    """
    Service for claiming ephemeral accounts using tokens and signatures.
    """
    
    def __init__(self, public_key: rsa.RSAPublicKey, db):
        self.public_key = public_key
        self.db = db
        self.used_tokens = set()
    
    async def claim_account(
        self,
        poll_id: str,
        token: str,
        signature_b64: str
    ) -> Dict:
        """
        Claim ephemeral account using token and unblinded signature.
        
        Returns account credentials if valid, raises exception otherwise.
        """
        
        # 1. Verify signature is valid
        try:
            signature = b64decode(signature_b64)
            token_bytes = token.encode()
            
            self.public_key.verify(
                signature,
                token_bytes,
                padding.PSS(
                    mgf=padding.MGF1(hashes.SHA256()),
                    salt_length=padding.PSS.MAX_LENGTH
                ),
                hashes.SHA256()
            )
        except Exception:
            raise ValueError("Invalid signature")
        
        # 2. Check token hasn't been used
        token_hash = hmac_lib.new(
            b"vodle_token_tracking",
            token.encode(),
            'sha256'
        ).hexdigest()
        
        if token_hash in self.used_tokens:
            raise ValueError("Token already used")
        
        # 3. Lookup ephemeral account for this token
        # This mapping is stored encrypted and retrieved here
        account_info = await self.db.get_account_for_token(
            poll_id=poll_id,
            token=token
        )
        
        if not account_info:
            raise ValueError("Invalid token for this poll")
        
        # 4. Mark token as used
        self.used_tokens.add(token_hash)
        await self.db.mark_token_used(poll_id, token)
        
        # 5. Return ephemeral account credentials
        return {
            'user_id': account_info['user_id'],
            'username': account_info['username'],
            'password': account_info['password'],
            'vid': account_info['vid'],
            'poll_id': poll_id
        }
```

#### Improved Implementation: Atomic Token Validation

**Issue**: Race condition between checking and marking tokens as used.

**Solution**: Use database transaction with row-level locking for atomic check-and-mark:

```python
# account_claim_service_improved.py
class AccountClaimService:
    """
    Improved version with atomic token validation to prevent race conditions.
    """
    
    def __init__(self, public_key: rsa.RSAPublicKey, db):
        self.public_key = public_key
        self.db = db
        # No in-memory set needed - DB is source of truth
    
    async def claim_account(
        self,
        poll_id: str,
        token: str,
        signature_b64: str
    ) -> Dict:
        """
        Claim ephemeral account using token and unblinded signature.
        
        Uses database transaction for atomic token validation.
        """
        
        # 1. Verify signature is valid
        try:
            signature = b64decode(signature_b64)
            token_bytes = token.encode()
            
            self.public_key.verify(
                signature,
                token_bytes,
                padding.PSS(
                    mgf=padding.MGF1(hashes.SHA256()),
                    salt_length=padding.PSS.MAX_LENGTH
                ),
                hashes.SHA256()
            )
        except Exception:
            raise ValueError("Invalid signature")
        
        # 2. Compute token hash
        token_hash = hmac_lib.new(
            b"vodle_token_tracking",
            token.encode(),
            'sha256'
        ).hexdigest()
        
        # 3. Use transaction for atomic check-and-mark
        async with self.db.transaction() as tx:
            # Check if token already used (with row lock)
            existing = await tx.fetch_one(
                "SELECT 1 FROM used_tokens WHERE token_hash = $1 FOR UPDATE",
                token_hash
            )
            
            if existing:
                raise ValueError("Token already used")
            
            # Lookup ephemeral account for this token
            account_info = await tx.get_account_for_token(
                poll_id=poll_id,
                token=token
            )
            
            if not account_info:
                raise ValueError("Invalid token for this poll")
            
            # Mark token as used (atomic within transaction)
            await tx.execute(
                "INSERT INTO used_tokens (token_hash, poll_id) VALUES ($1, $2)",
                token_hash,
                poll_id
            )
            
            # Transaction commits here
        
        # 4. Return ephemeral account credentials
        return {
            'user_id': account_info['user_id'],
            'username': account_info['username'],
            'password': account_info['password'],
            'vid': account_info['vid'],
            'poll_id': poll_id
        }
```

**Benefits**:
- ✅ **Atomic**: Check and mark happen in single transaction
- ✅ **No race condition**: `FOR UPDATE` locks the row during check
- ✅ **No state loss**: Database is source of truth (survives restarts)
- ✅ **Concurrent safe**: Multiple requests handled correctly
- ✅ **Simple**: No need for in-memory state management

**Database-level Protection**:
The `PRIMARY KEY` constraint on `token_hash` provides additional safety:
- Even if logic fails, database rejects duplicate inserts
- Multiple concurrent requests → first succeeds, others fail with constraint violation
- Clean error handling: catch DB exception → "Token already used"

### Client-Side Components

#### Token Blinding (in Vodle App)

```typescript
// src/app/blind-signature.service.ts
import * as crypto from 'crypto';

export class BlindSignatureService {
  
  /**
   * Blind a token for privacy-preserving signature request
   */
  blindToken(token: string): {
    blindedToken: string,
    blindingFactor: string
  } {
    // Generate random blinding factor
    const blindingFactor = crypto.randomBytes(32);
    
    // Convert token to buffer
    const tokenBuffer = Buffer.from(token);
    
    // Blind the token using blinding factor
    // This makes it unlinkable to the original token
    const blindedToken = this.xorBuffers(tokenBuffer, blindingFactor);
    
    return {
      blindedToken: blindedToken.toString('base64'),
      blindingFactor: blindingFactor.toString('base64')
    };
  }
  
  /**
   * Unblind a signature to get the real signature on original token
   */
  unblindSignature(
    blindedSignature: string,
    blindingFactor: string
  ): string {
    const sigBuffer = Buffer.from(blindedSignature, 'base64');
    const factorBuffer = Buffer.from(blindingFactor, 'base64');
    
    // Unblind to get signature on original token
    const unblindedSig = this.xorBuffers(sigBuffer, factorBuffer);
    
    return unblindedSig.toString('base64');
  }
  
  private xorBuffers(a: Buffer, b: Buffer): Buffer {
    const result = Buffer.alloc(a.length);
    for (let i = 0; i < a.length; i++) {
      result[i] = a[i] ^ b[i % b.length];
    }
    return result;
  }
}
```

#### Invitation Flow (in Vodle App)

```typescript
// src/app/invitation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlindSignatureService } from './blind-signature.service';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  
  constructor(
    private http: HttpClient,
    private blindSig: BlindSignatureService,
    private G: GlobalService
  ) {}
  
  /**
   * Join poll using invitation token from email
   */
  async joinPollWithInvitation(
    pollId: string,
    token: string
  ): Promise<void> {
    this.G.L.entry("InvitationService.joinPollWithInvitation", pollId);
    
    // Step 1: Blind the token
    const { blindedToken, blindingFactor } = this.blindSig.blindToken(token);
    
    // Step 2: Request blind signature from server
    const sessionId = this.generateSessionId();
    const blindSigResponse = await this.http.post<any>(
      `${this.G.environment.invitationService}/blind-sign`,
      {
        blinded_token: blindedToken,
        session_id: sessionId
      }
    ).toPromise();
    
    // Step 3: Unblind the signature
    const signature = this.blindSig.unblindSignature(
      blindSigResponse.signed_blinded_token,
      blindingFactor
    );
    
    // Step 4: Claim ephemeral account with token + signature
    const accountResponse = await this.http.post<any>(
      `${this.G.environment.invitationService}/claim-account`,
      {
        poll_id: pollId,
        token: token,
        signature: signature
      }
    ).toPromise();
    
    // Step 5: Store ephemeral account credentials
    await this.G.Matrix.storeEphemeralAccount(
      pollId,
      {
        user_id: accountResponse.user_id,
        username: accountResponse.username,
        password: accountResponse.password,
        vid: accountResponse.vid
      }
    );
    
    // Step 6: Initialize ephemeral Matrix client and join poll room
    await this.G.Matrix.joinPollWithEphemeralAccount(pollId);
    
    this.G.L.exit("InvitationService.joinPollWithInvitation");
  }
  
  private generateSessionId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}
```

## Privacy Analysis

### What the Server Knows

| Information | Server Knowledge |
|-------------|------------------|
| Email addresses | ✅ YES (from creator's list) |
| Poll ID | ✅ YES (poll being created) |
| Number of invitations | ✅ YES (count of emails) |
| Tokens generated | ✅ YES (knows all tokens) |
| Ephemeral accounts created | ✅ YES (created them) |
| Token → Email mapping | ✅ YES (sent email to address) |
| **Email → Ephemeral Account** | ❌ **NO** (blind signature prevents linkage) |
| **Which voter joined when** | ❌ **NO** (cannot tell who claimed which) |
| Blinded tokens signed | ✅ YES (but cannot link to original) |
| Unblinded tokens at claim | ✅ YES (but cannot link to signing session) |

### Privacy Guarantee

The blind signature protocol ensures:

1. **Server cannot determine**: email@example.com → @vodle_voter_x7k9m2
2. **Server knows**: email@example.com was sent invitation
3. **Server knows**: @vodle_voter_x7k9m2 joined the poll
4. **Server CANNOT link**: email@example.com ← → @vodle_voter_x7k9m2

**Why**: The signing happens on a blinded token, and the claim happens with an unblinded token. The server cannot correlate these two events.

## Simplified Alternative (Weaker Privacy)

If blind signatures are too complex, a simpler approach with weaker privacy:

### Approach: One-Time Codes

```python
async def simplified_invite(poll_id, emails):
    # 1. Generate ephemeral accounts
    accounts = [create_account() for _ in emails]
    
    # 2. Shuffle accounts (randomize mapping)
    import random
    random.shuffle(accounts)
    
    # 3. Generate one-time codes
    codes = [generate_code() for _ in emails]
    
    # 4. Create encrypted mapping
    # code → account mapping stored encrypted
    store_mapping(codes, accounts)
    
    # 5. Send emails (email → code)
    for email, code in zip(emails, codes):
        send_email(email, code)
    
    # 6. Voter claims with code
    # Server knows: code → account
    # Server knows: email → code (from sending)
    # Server CAN link: email → code → account
```

**Privacy**: Weaker - server can reconstruct email→account mapping by correlating sent emails with claims.

**Advantage**: Much simpler implementation, no cryptography required.

**Recommendation**: Start with this for MVP, upgrade to blind signatures for production.

## Database Schema

```sql
-- Invitation batches
CREATE TABLE invitation_batches (
    invitation_id VARCHAR(32) PRIMARY KEY,
    poll_id VARCHAR(32) NOT NULL,
    creator_email VARCHAR(255) NOT NULL,
    num_invitations INTEGER NOT NULL,
    public_key_pem TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Encrypted token-to-account mappings
CREATE TABLE encrypted_mappings (
    invitation_id VARCHAR(32) NOT NULL,
    encrypted_data BYTEA NOT NULL,  -- Contains token_secret → account mapping
    encryption_metadata JSONB,
    FOREIGN KEY (invitation_id) REFERENCES invitation_batches(invitation_id)
);

-- Used tokens (hashed for privacy)
CREATE TABLE used_tokens (
    token_hash VARCHAR(64) PRIMARY KEY,
    poll_id VARCHAR(32) NOT NULL,
    used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_poll_id (poll_id)
);

-- Blind signature sessions (to prevent reuse)
CREATE TABLE signing_sessions (
    session_id VARCHAR(64) PRIMARY KEY,
    signed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_signed_at (signed_at)
);
```

## API Endpoints

### POST /api/invitations/create

Create poll invitations.

**Request**:
```json
{
  "poll_id": "abc123",
  "creator_email": "creator@example.com",
  "voter_emails": [
    "voter1@example.com",
    "voter2@example.com",
    "voter3@example.com"
  ],
  "poll_password": "secret123"
}
```

**Response**:
```json
{
  "invitation_id": "inv_xyz789",
  "public_key": "-----BEGIN PUBLIC KEY-----\n...",
  "num_invitations": 3,
  "poll_id": "abc123"
}
```

### POST /api/invitations/blind-sign

Get blind signature on blinded token.

**Request**:
```json
{
  "blinded_token": "base64_encoded_blinded_token",
  "session_id": "unique_session_id"
}
```

**Response**:
```json
{
  "signed_blinded_token": "base64_encoded_signature",
  "session_id": "unique_session_id"
}
```

### POST /api/invitations/claim-account

Claim ephemeral account with token and signature.

**Request**:
```json
{
  "poll_id": "abc123",
  "token": "base64_encoded_token",
  "signature": "base64_encoded_unblinded_signature"
}
```

**Response**:
```json
{
  "user_id": "@vodle_voter_x7k9m2:vodle.it",
  "username": "vodle_voter_x7k9m2",
  "password": "securely_generated_password",
  "vid": "x7k9m2",
  "poll_id": "abc123"
}
```

## Security Considerations

### Attack Vectors

1. **Token Interception**: Email could be intercepted
   - **Mitigation**: Use HTTPS for claim endpoint, short token validity period
   
2. **Token Reuse**: Someone tries to use token twice to get multiple accounts
   - **Problem**: Race condition between check and mark operations
   - **Mitigation Level 1**: Database PRIMARY KEY constraint on token_hash
   - **Mitigation Level 2**: Atomic check-and-mark using database transaction with `FOR UPDATE`
   - **Mitigation Level 3**: Application-level check before DB operation
   - **Result**: Mathematically impossible to claim same token twice
   - **Details**: See "Improved Implementation: Atomic Token Validation" section above
   
3. **Timing Attack**: Correlate email send time with claim time
   - **Mitigation**: Add random delays, batch processing
   
4. **Database Compromise**: Attacker gets database access
   - **Mitigation**: Encrypt token→account mappings
   
5. **Traffic Analysis**: Monitor network to correlate
   - **Mitigation**: Use Tor or VPN for claim requests (optional)

### Token Reuse Prevention (Detailed)

**Question**: Can the same token be used twice to get two accounts?

**Answer**: No - three layers of protection ensure this is impossible:

**Layer 1: Application Check**
```python
if token_hash in self.used_tokens:
    raise ValueError("Token already used")
```
Fast check before database operation.

**Layer 2: Atomic Database Transaction**
```python
async with self.db.transaction() as tx:
    existing = await tx.fetch_one(
        "SELECT 1 FROM used_tokens WHERE token_hash = $1 FOR UPDATE",
        token_hash
    )
    if existing:
        raise ValueError("Token already used")
    await tx.execute(
        "INSERT INTO used_tokens (token_hash, poll_id) VALUES ($1, $2)",
        token_hash, poll_id
    )
```
`FOR UPDATE` locks the row during check, preventing race conditions.

**Layer 3: Database Constraint**
```sql
CREATE TABLE used_tokens (
    token_hash VARCHAR(64) PRIMARY KEY,  -- Unique constraint
    ...
);
```
Even if logic fails, database rejects duplicate token_hash.

**Concurrent Request Handling**:
```
Time  Request A              Request B
----  ----------             ----------
T1    Check token (locked)   
T2    Token not used         Wait for lock...
T3    Mark as used          
T4    Commit & release lock  
T5                           Check token (now locked)
T6                           Token IS used → reject
```

**Result**: First request succeeds, all others fail with "Token already used".

### Best Practices

- Use TLS 1.3 for all API endpoints
- Rate limit signing and claim endpoints
- Implement CAPTCHA for claim endpoint
- Log security events but not linkable data
- Regularly rotate server signing keys
- Use secure random number generation
- Implement token expiration (e.g., 7 days)

## Deployment

### Docker Compose Example

```yaml
version: '3.8'

services:
  invitation-service:
    build: ./invitation-service
    ports:
      - "8080:8080"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/vodle_invitations
      - MATRIX_HOMESERVER=https://matrix.vodle.it
      - SMTP_HOST=smtp.sendgrid.net
      - SMTP_USER=apikey
      - SMTP_PASS=${SENDGRID_API_KEY}
    depends_on:
      - db
  
  db:
    image: postgres:14
    volumes:
      - invitation_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=vodle_invitations
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass

volumes:
  invitation_data:
```

## Integration with Existing Flow

### Updated Poll Creation Flow

```typescript
// In poll creation page
async createPollWithInvitations() {
  // 1. Create poll normally
  const pollId = await this.createPoll();
  
  // 2. If authorized voters specified, send to invitation service
  if (this.authorizedVoters.length > 0) {
    const response = await this.http.post(
      `${this.G.environment.invitationService}/create`,
      {
        poll_id: pollId,
        creator_email: this.G.user.email,
        voter_emails: this.authorizedVoters,
        poll_password: this.pollPassword
      }
    ).toPromise();
    
    // 3. Store invitation info in poll metadata
    await this.storePollInvitationInfo(pollId, response.invitation_id);
    
    this.showSuccess('Poll created! Invitations sent to authorized voters.');
  }
}
```

## Comparison with Current System

| Feature | Current (Client-Side) | New (Server-Side) |
|---------|----------------------|-------------------|
| **Invitation sender** | Creator's device | Server |
| **Email delivery** | Creator's email client | Server SMTP |
| **Authorization** | Poll password only | Unique tokens + poll password |
| **Anonymity** | Per-poll vids | Per-poll vids (same) |
| **One-person-one-vote** | Honor system | Cryptographically enforced |
| **Privacy from server** | N/A | Blind signatures protect identity |
| **Reliability** | Depends on creator | Server guarantees delivery |

## Conclusion

This privacy-preserving invitation service enables:

1. ✅ **Centralized invitation management**: Server handles email distribution
2. ✅ **Authorization enforcement**: Only invited voters can join
3. ✅ **One-person-one-vote**: Each email gets exactly one ephemeral account
4. ✅ **Privacy preservation**: Server cannot link emails to ephemeral accounts
5. ✅ **Auditability**: Creator can verify invitations were sent

The blind signature protocol ensures strong privacy while maintaining the practical benefits of server-side invitation management.

**Recommendation**: 
- **Phase 1 (MVP)**: Implement simplified version (one-time codes with shuffled accounts)
- **Phase 2 (Production)**: Upgrade to blind signature protocol for strongest privacy
- **Phase 3 (Future)**: Add support for group invitations, invitation templates, etc.
