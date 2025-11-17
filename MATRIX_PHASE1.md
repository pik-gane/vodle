# Matrix Migration Phase 1 - Complete Guide

This guide provides everything you need to test Phase 1 of the Matrix protocol migration locally.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Detailed Setup](#detailed-setup)
3. [Testing the Integration](#testing-the-integration)
4. [Switching Between Backends](#switching-between-backends)
5. [Troubleshooting](#troubleshooting)
6. [Phase 1 Scope](#phase-1-scope)

---

## Quick Start

### 1. Start the Matrix Homeserver

```bash
# Run the quick start script
./start-matrix-server.sh
```

This script will:
- Check Docker installation
- Generate Synapse configuration (if needed)
- Enable user registration
- Start the homeserver
- Verify it's running

### 2. Verify Homeserver is Running

```bash
curl http://localhost:8008/_matrix/client/versions
```

Expected output: JSON with Matrix API versions

### 3. Run the Vodle Application

```bash
# Install dependencies (if not already done)
npm install

# Start the development server
npm start
```

The application will be available at http://localhost:8100

---

## Detailed Setup

### Prerequisites

- Docker and Docker Compose installed
  - **Note**: Commands in this guide use `docker-compose`. If you have Docker Compose V2 (plugin), replace `docker-compose` with `docker compose`, or use the `./start-matrix-server.sh` script which automatically detects the correct command.
- Node.js 14+ and npm
- Port 8008 available (for Matrix homeserver)
- Port 8100 available (for Vodle dev server)

### Step-by-Step Matrix Server Setup

#### 1. Generate Synapse Configuration

```bash
mkdir -p matrix-data
docker run -it --rm \
  -v $(pwd)/matrix-data:/data \
  -e SYNAPSE_SERVER_NAME=localhost \
  -e SYNAPSE_REPORT_STATS=no \
  matrixdotorg/synapse:latest generate
```

#### 2. Configure Registration

Edit `matrix-data/homeserver.yaml`:

```yaml
# Find and set these values:
enable_registration: true
enable_registration_without_verification: true

# Optional - disable rate limiting for testing:
rc_message:
  per_second: 1000
  burst_count: 1000

rc_login:
  address:
    per_second: 1000
    burst_count: 1000
  account:
    per_second: 1000
    burst_count: 1000
```

#### 3. Start the Homeserver

```bash
docker-compose -f docker-compose.matrix.yml up -d
```

#### 4. Check the Logs

```bash
docker-compose -f docker-compose.matrix.yml logs -f
```

You should see:
```
synapse.app.homeserver - Synapse now listening on TCP port 8008
```

#### 5. Test the API

```bash
# Test version endpoint
curl http://localhost:8008/_matrix/client/versions

# Test registration (should work if configured correctly)
curl -X POST http://localhost:8008/_matrix/client/r0/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "testpass123",
    "auth": {"type": "m.login.dummy"}
  }'
```

---

## Testing the Integration

### Important: Phase 1 Limitations

**⚠️ The UI is NOT yet connected to MatrixService in Phase 1**

This is expected and intentional! Phase 1 only provides the infrastructure:
- ✅ MatrixService implementation
- ✅ Feature flag for backend switching
- ✅ Local Matrix homeserver setup
- ❌ UI integration (comes in Phase 2+)

### What You Can Test

#### 1. Build and Run

```bash
# Build the application
npm run build

# Start the development server
npm start
```

Both should complete without errors.

#### 2. Check the Code

The following files were added in Phase 1:

```
src/app/matrix.service.ts           # Main Matrix service
src/app/matrix.service.spec.ts      # Unit tests
src/app/data-backend.interface.ts   # Backend abstraction interface
src/environments/environment.ts     # Updated with Matrix config
docker-compose.matrix.yml           # Docker setup
MATRIX_SETUP.md                     # Setup documentation
MATRIX_TESTING.md                   # Testing documentation
start-matrix-server.sh              # Quick start script
```

#### 3. Inspect the MatrixService

Open browser DevTools and examine the service:
- Navigate to http://localhost:8100
- Open Developer Tools (F12)
- Check Console for any errors
- The MatrixService is available but not yet used by the UI

#### 4. Manual API Testing

You can test the Matrix API directly:

```bash
# Register a test user
curl -X POST http://localhost:8008/_matrix/client/r0/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "vodletest",
    "password": "Test123!",
    "auth": {"type": "m.login.dummy"}
  }'

# Login
curl -X POST http://localhost:8008/_matrix/client/r0/login \
  -H "Content-Type: application/json" \
  -d '{
    "type": "m.login.password",
    "user": "vodletest",
    "password": "Test123!"
  }'
```

#### 5. Verify the Feature Flag

Check `src/environments/environment.ts`:

```typescript
export const environment = {
  // ... other config ...
  
  // This flag controls which backend to use
  useMatrixBackend: false,  // false = CouchDB, true = Matrix
  
  matrix: {
    homeserver_url: "http://localhost:8008",
    enable_e2ee: true,
  },
  
  // ... rest of config ...
};
```

---

## Switching Between Backends

### Use Matrix Backend

1. Edit `src/environments/environment.ts`:
```typescript
useMatrixBackend: true,
```

2. Rebuild:
```bash
npm run build
```

**Note**: In Phase 1, this doesn't change UI behavior since the UI isn't connected yet.

### Use CouchDB Backend (Default)

1. Edit `src/environments/environment.ts`:
```typescript
useMatrixBackend: false,
```

2. Rebuild:
```bash
npm run build
```

The application works exactly as before.

---

## Troubleshooting

### Matrix Server Issues

#### Homeserver won't start

```bash
# Check logs
docker-compose -f docker-compose.matrix.yml logs

# Common issues:
# - Port 8008 already in use: Change port in docker-compose.matrix.yml
# - Permission issues: Check matrix-data/ directory permissions
# - Config errors: Review matrix-data/homeserver.yaml
```

#### Can't register users

```bash
# Check homeserver.yaml
grep enable_registration matrix-data/homeserver.yaml

# Should show:
# enable_registration: true
# enable_registration_without_verification: true

# If not, edit the file and restart:
docker-compose -f docker-compose.matrix.yml restart
```

#### CORS errors in browser

Edit `matrix-data/homeserver.yaml` and add:

```yaml
# Add CORS headers for development
listeners:
  - port: 8008
    type: http
    tls: false
    bind_addresses: ['0.0.0.0']
    resources:
      - names: [client]
        compress: true
```

Then restart:
```bash
docker-compose -f docker-compose.matrix.yml restart
```

### Build Issues

#### TypeScript errors

```bash
# Clean and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### matrix-js-sdk import errors

Make sure you're using the correct import paths:
```typescript
import { createClient } from 'matrix-js-sdk/lib/matrix';
import type { MatrixClient } from 'matrix-js-sdk/lib/client';
import type { ICreateRoomOpts } from 'matrix-js-sdk/lib/@types/requests';
```

### Application Issues

#### Application won't start

```bash
# Check if ports are available
lsof -i :8100  # Vodle dev server
lsof -i :8008  # Matrix homeserver

# Kill processes if needed
kill -9 <PID>
```

#### Can't connect to Matrix server

```bash
# Verify homeserver is accessible
curl http://localhost:8008/_matrix/client/versions

# Check firewall settings
# Ensure localhost traffic is allowed
```

---

## Phase 1 Scope

### What IS Included

✅ **Infrastructure**:
- MatrixService implementation
- Docker setup for local Matrix homeserver
- Feature flag for backend switching
- Comprehensive documentation

✅ **MatrixService Features**:
- Client initialization
- User registration and authentication
- Room creation
- State event management
- Credential storage
- Error handling and logging

✅ **Documentation**:
- Setup guides (MATRIX_SETUP.md)
- Testing guides (MATRIX_TESTING.md)
- This complete guide (MATRIX_PHASE1.md)
- Quick start script (start-matrix-server.sh)

### What is NOT Included

❌ **UI Integration**:
- MatrixService is not connected to the UI
- Toggling `useMatrixBackend` doesn't affect UI behavior
- No visual changes in the application

❌ **Data Migration**:
- No user data migration from CouchDB
- No poll data migration
- No voting data migration

❌ **Advanced Features**:
- No E2EE implementation (deferred to Phase 5)
- No offline queue
- No conflict resolution beyond Matrix's built-in

### Next Phases

- **Phase 2** (Weeks 3-4): User data migration
- **Phase 3** (Weeks 5-7): Poll room implementation  
- **Phase 4** (Weeks 8-10): Voting and ratings
- **Phase 5** (Weeks 11-12): E2EE and offline support
- **Phase 6** (Weeks 13-14): Migration tools and rollout

---

## Verification Checklist

Use this checklist to verify Phase 1 is working correctly:

- [ ] Matrix homeserver starts successfully
- [ ] Matrix API responds to version check
- [ ] Can register test user via curl
- [ ] Can login via curl
- [ ] Vodle application builds without errors
- [ ] Vodle application runs without errors
- [ ] MatrixService exists in codebase
- [ ] Feature flag exists in environment.ts
- [ ] Can toggle between backends (rebuild required)
- [ ] All documentation files present
- [ ] start-matrix-server.sh script works
- [ ] No TypeScript errors in MatrixService
- [ ] Basic unit tests pass

---

## Support

For issues or questions:

1. Check this guide's [Troubleshooting](#troubleshooting) section
2. Review [MATRIX_SETUP.md](./MATRIX_SETUP.md) for setup details
3. Review [MATRIX_TESTING.md](./MATRIX_TESTING.md) for testing details
4. Check Matrix homeserver logs: `docker-compose -f docker-compose.matrix.yml logs`
5. Consult [Matrix Synapse documentation](https://matrix-org.github.io/synapse/latest/)
6. Open an issue in the repository with the `matrix-migration` label

---

## Summary

Phase 1 provides the foundation for Matrix integration:
- ✅ MatrixService ready for use
- ✅ Local testing infrastructure in place
- ✅ Feature flag for safe experimentation
- ✅ Comprehensive documentation
- ✅ Fully reversible changes

The UI integration and data migration will come in subsequent phases. This foundational work ensures we have a solid base to build upon.

**Everything is ready for Phase 2 to begin!** 🎉
