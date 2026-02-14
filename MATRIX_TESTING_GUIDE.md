# Matrix Backend Testing Guide

## Quick Answer: Is the app fully functional without CouchDB?

**Partially — with important caveats.**

### What works WITHOUT any backend server (Matrix or CouchDB)

After Phase 16 and the CouchDB-skip fix, the app now **gracefully handles**
a missing Matrix homeserver. Instead of getting stuck on a loading spinner,
it proceeds to the main "My polls" page after dismissing an alert. You can:

- ✅ **Navigate the app** — all pages load (My polls, Settings, Help, About, etc.)
- ✅ **Create draft polls** — poll drafts are stored locally in the browser
- ✅ **Edit draft polls** — title, description, options, due date
- ✅ **Browse existing local data** — any polls stored locally are accessible

### What requires a running Matrix homeserver

These operations need the Matrix backend (homeserver at `localhost:8008`):

- ❌ **Opening a poll** (draft → running) — needs Matrix poll room creation
- ❌ **Joining a poll** via magic link — needs Matrix room membership
- ❌ **Submitting ratings** — needs Matrix voter room
- ❌ **Real-time sync** between voters — needs Matrix event handlers
- ❌ **Delegation** — needs Matrix delegation events

### Summary

| Feature | Without homeserver | With homeserver |
|---------|-------------------|-----------------|
| Login / registration | ✅ (local guest) | ✅ (Matrix auth) |
| Navigate app | ✅ | ✅ |
| Create draft polls | ✅ | ✅ |
| Edit draft polls | ✅ | ✅ |
| Open poll (start voting) | ❌ | ✅ |
| Join poll via link | ❌ | ✅ |
| Submit ratings | ❌ | ✅ |
| Real-time sync | ❌ | ✅ |
| Delegation | ❌ | ✅ |

---

## How to Test in the Browser

### Option 1: Without a Matrix homeserver (limited testing)

```bash
# Install dependencies
npm install

# Start the dev server
npm start
# or: npx ng serve

# Open http://localhost:4200 in your browser
```

**What to expect:**
1. The app loads the login page
2. Click through: Language → Next → "No" (new user) → enter email → check consent → "Use guest account"
3. An alert will appear: "Cannot connect to Matrix server..." — click OK
4. The app proceeds to the "My polls" page
5. You can create and edit draft polls locally

### Option 2: With a local Matrix homeserver (full testing)

This is required for testing the complete poll lifecycle.

#### Step 1: Start a Matrix homeserver (Synapse)

```bash
# Using Docker (first time setup):

# 1. Generate config:
docker run --rm -v /tmp/synapse-data:/data \
  -e SYNAPSE_SERVER_NAME=localhost \
  -e SYNAPSE_REPORT_STATS=no \
  matrixdotorg/synapse:latest generate

# 2. Run the homeserver:
docker run -d --name synapse \
  -p 8008:8008 \
  -v /tmp/synapse-data:/data \
  matrixdotorg/synapse:latest
```

Or if the repo has a docker-compose file:
```bash
docker-compose -f docker-compose.matrix.yml up -d
```

**Important:** Enable registration in `homeserver.yaml`:
```yaml
enable_registration: true
enable_registration_without_verification: true
```

#### Step 2: Start the vodle dev server

```bash
npm install
npm start
```

#### Step 3: Test the full flow

1. Open `http://localhost:4200`
2. Complete the login flow (Matrix will auto-register a new user)
3. Create a poll → Open it (draft → running)
4. Copy the magic link → Open in another browser/incognito window
5. Submit ratings from both voters
6. Close the poll and verify results

### Option 3: Revert to CouchDB backend

If you want to use the old CouchDB backend:

1. Edit `src/environments/environment.ts`
2. Set `useMatrixBackend: false`
3. Start a CouchDB server at `localhost:5984`
4. Run `npm start`

---

## Screenshots from End-User Testing

These screenshots were taken testing the app with `useMatrixBackend: true`
but **without** a running Matrix homeserver, demonstrating the graceful
degradation after the Phase 16 fix.

### 1. Initial Login Page
![Login page](screenshots/01-initial-login-page.png)
The app loads and shows the welcome screen with language selection.

### 2. New User Flow
![Used before question](screenshots/02-login-used-before.png)
"Have you used vodle before?" — selecting "No" for a new user.

### 3. Email & Consent
![Email entry](screenshots/03-login-email-entered.png)
Email entry with privacy consent checkbox. The "Use guest account"
button becomes enabled after checking consent.

### 4. Matrix Connection Error (BEFORE fix)
![Connection error](screenshots/04-login-stuck-no-backend.png)
Previously, after the Matrix error alert, the app would fall through to
CouchDB, which would also fail, leaving the user stuck on a loading
spinner. **This is now fixed.**

### 5. My Polls Page (AFTER fix)
![My polls working](screenshots/05-mypolls-page-working.png)
After dismissing the Matrix error, the app now proceeds to the main
"My polls" page. Users can browse and create polls.

### 6. Create Poll Dialog
![Create poll](screenshots/06-create-poll-dialog.png)
Clicking the "+" button shows the poll type selection dialog.

### 7. Draft Poll Editing
![Edit draft](screenshots/07-draft-poll-editing.png)
The draft poll editor works fully — title, type, and other fields
are editable and stored locally.

---

## Architecture Notes

### Data Flow with Matrix Backend

```
User Action → DataService method → if (useMatrixBackend) → MatrixService → Matrix Homeserver
                                                        ↘ Local cache (always updated)
```

- **Local cache** is always updated synchronously (fast UI)
- **Matrix sync** is fire-and-forget with `.catch()` error logging
- If Matrix is down, local operations still work; remote sync fails silently

### Key Environment Settings

| Setting | Dev (environment.ts) | Prod (environment.prod.ts) |
|---------|---------------------|---------------------------|
| `useMatrixBackend` | `true` | `false` |
| `matrix.homeserver_url` | `http://localhost:8008` | `https://matrix.example.com` |
| `matrix.enable_e2ee` | `true` | `true` |

### Test Counts

346 migration-related tests pass:
- 34 InMemoryBackend tests
- 50 MigrationService tests
- 41 MigrationPage tests
- 67 Matrix Wiring tests (Phases 10-16)
- 154 MatrixService/DataAdapter tests
