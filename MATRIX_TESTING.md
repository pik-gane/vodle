# Testing the Matrix Migration

This guide explains how to test the Matrix protocol integration in Vodle (Phases 1–5).

## Testing Without Any Backend (No CouchDB, No Matrix Server)

The fastest way to test locally is with the **in-memory backend** and the existing
unit tests. No Docker, no CouchDB, and no Matrix homeserver are required.

### Prerequisites

- Node.js (v16+)
- npm

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Unit Tests (Headless)

```bash
# Run all Matrix-related unit tests (no backend needed)
npx ng test --no-watch --browsers=ChromeHeadless --include='**/matrix.service.spec.ts'

# Run InMemoryBackend tests (no backend needed)
npx ng test --no-watch --browsers=ChromeHeadless --include='**/in-memory-backend.spec.ts'

# Run DataAdapter tests (no backend needed)
npx ng test --no-watch --browsers=ChromeHeadless --include='**/data-adapter.service.spec.ts'

# Run MigrationService tests (no backend needed)
npx ng test --no-watch --browsers=ChromeHeadless --include='**/migration.service.spec.ts'

# Run all unit tests at once
npx ng test --no-watch --browsers=ChromeHeadless
```

All of these tests run entirely in the browser (via Karma/Jasmine) and do **not**
require any external database or server.

### 3. Using the InMemoryBackend in Your Own Code

The `InMemoryBackend` class implements the full `IDataBackend` interface using
plain JavaScript Maps. It is located at `src/app/in-memory-backend.ts`.

```typescript
import { InMemoryBackend } from './in-memory-backend';

const backend = new InMemoryBackend();

// Authentication
await backend.login('alice@example.com', 'password');
console.log(backend.isLoggedIn()); // true

// User data
await backend.setUserData('language', 'en');
console.log(await backend.getUserData('language')); // 'en'

// Polls
await backend.createPoll('poll1', 'Lunch venue');
await backend.setPollData('poll1', 'description', 'Where should we eat?');

// Voting
await backend.submitRating('poll1', 'opt-pizza', 80);
const ratings = await backend.getRatings('poll1');
console.log(ratings); // Map { 'alice@example.com' => Map { 'opt-pizza' => 80 } }

// Delegation
const delId = await backend.requestDelegation('poll1', 'bob', ['opt-pizza']);
await backend.respondToDelegation('poll1', delId, true, ['opt-pizza']);

// Backend type
console.log(backend.getBackendType()); // 'memory'
```

### What the Unit Tests Cover (Without Any Server)

| Area | Tests | File |
|------|-------|------|
| Matrix service (Phases 1–5) | 121 | `matrix.service.spec.ts` |
| In-memory backend (all phases) | 30+ | `in-memory-backend.spec.ts` |
| Data adapter (all phases) | 27+ | `data-adapter.service.spec.ts` |
| Migration service (Phase 6) | 31 | `migration.service.spec.ts` |
| Email hashing (BLAKE2s) | 5 | `matrix.service.spec.ts` |
| Offline queue | 13 | `matrix.service.spec.ts` |
| AES-GCM encryption | 12 | `matrix.service.spec.ts` |
| Caching | 5 | `matrix.service.spec.ts` |

---

## Testing With a Matrix Homeserver (Optional)

If you want to test the full Matrix SDK integration (registration, rooms, events),
you need a local Synapse homeserver.

**Note**: Commands in this guide use `docker-compose`. If you have Docker Compose V2 (plugin), replace `docker-compose` with `docker compose`, or use the `./start-matrix-server.sh` script which automatically detects the correct command.

### 1. Start the Matrix Homeserver

```bash
# Generate Synapse configuration (first time only)
mkdir -p matrix-data
docker run -it --rm \
  -v $(pwd)/matrix-data:/data \
  -e SYNAPSE_SERVER_NAME=localhost \
  -e SYNAPSE_REPORT_STATS=no \
  matrixdotorg/synapse:latest generate

# Start the homeserver
docker-compose -f docker-compose.matrix.yml up -d

# Verify it's running
curl http://localhost:8008/_matrix/client/versions
```

### 2. Configure Matrix Data Directory

After generating the configuration, edit `matrix-data/homeserver.yaml`:

```yaml
# Enable user registration for testing
enable_registration: true
enable_registration_without_verification: true

# Disable rate limiting for development
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

Then restart:

```bash
docker-compose -f docker-compose.matrix.yml restart
```

### 3. Enable Matrix Backend

Edit `src/environments/environment.ts`:

```typescript
useMatrixBackend: true,  // Change from false to true
```

### 4. Run the Application

```bash
npm start
```

The application will start on http://localhost:8100

## Migration Status (Phases 1–5)

### What's Implemented

✅ **Phase 1 — Foundation**:
- MatrixService with client initialization, login, registration
- Feature flag for backend switching (`useMatrixBackend`)
- Docker setup for local Matrix homeserver
- Documentation and planning

✅ **Phase 2 — User Data Management**:
- Private Matrix rooms for user settings
- User data get/set/delete via state events

✅ **Phase 3 — Poll Rooms**:
- Poll room creation, metadata, options
- Voter room management
- Voter data storage within polls

✅ **Phase 4 — Voting Implementation**:
- Rating submission and aggregation across voter rooms
- Delegation request/response events
- Real-time event handlers (listeners)

✅ **Phase 5 — Advanced Features**:
- Offline event queue with persistence and retry
- Poll-password encryption (AES-GCM + PBKDF2)
- Cache warmup for performance

✅ **Phase 6 — Data Migration Tools**:
- MigrationService for CouchDB → Matrix data transfer
- User data, poll data, voter data, and ratings migration
- Data integrity verification
- Rollback support
- Migration status tracking

✅ **Backend Abstraction**:
- `IDataBackend` interface covers all phases
- `MatrixBackend` implements interface via MatrixService
- `CouchDBBackend` wraps existing DataService
- `InMemoryBackend` for testing without external services
- `DataAdapter` routes to selected backend

### What's NOT Yet Implemented

❌ **UI Integration** — The UI still uses DataService (CouchDB) directly  
❌ **Guard Bot** — Server-side deadline enforcement service  

## Testing the MatrixService

### Unit Tests

Run the basic unit tests:

```bash
npm test
```

### Manual Testing with Browser Console

Since the UI isn't integrated yet, you can test MatrixService from the browser console:

1. Start the application: `npm start`
2. Open http://localhost:8100 in your browser
3. Open Developer Tools (F12) → Console
4. Access Angular services through the browser's Angular DevTools

### Integration Testing

For full integration testing, you'll need to wait for Phase 2+ when the UI is connected to MatrixService.

## Verifying Matrix Homeserver

### Check if Synapse is Running

```bash
# Check container status
docker-compose -f docker-compose.matrix.yml ps

# View logs
docker-compose -f docker-compose.matrix.yml logs -f

# Test API endpoint
curl http://localhost:8008/_matrix/client/versions
```

### Test User Registration via API

You can manually test the Matrix API:

```bash
# Register a test user
curl -X POST http://localhost:8008/_matrix/client/r0/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "testpass123",
    "auth": {"type": "m.login.dummy"}
  }'
```

Expected response:
```json
{
  "user_id": "@testuser:localhost",
  "access_token": "syt_...",
  "device_id": "..."
}
```

### Test Login via API

```bash
# Login with the test user
curl -X POST http://localhost:8008/_matrix/client/r0/login \
  -H "Content-Type: application/json" \
  -d '{
    "type": "m.login.password",
    "user": "testuser",
    "password": "testpass123"
  }'
```

## Switching Between Backends

### Use Matrix Backend

Edit `src/environments/environment.ts`:
```typescript
useMatrixBackend: true,
```

Rebuild:
```bash
npm run build
```

### Use CouchDB Backend (Default)

Edit `src/environments/environment.ts`:
```typescript
useMatrixBackend: false,
```

Rebuild:
```bash
npm run build
```

**Note**: In Phase 1, this flag is prepared but not yet connected to the UI logic.

## Build and Lint

Ensure the code builds and passes linting:

```bash
# Build
npm run build

# Lint
npm run lint

# Run tests
npm test
```

## Stopping the Matrix Server

When done testing:

```bash
# Stop the homeserver
docker-compose -f docker-compose.matrix.yml down

# Remove all data (careful - this deletes the database!)
rm -rf matrix-data/
```

## Troubleshooting

### Matrix Service Not Initializing

Check browser console for errors. Common issues:
- Matrix homeserver not running
- Wrong homeserver URL in environment.ts
- Network connectivity issues

### Port 8008 Already in Use

Change the port in `docker-compose.matrix.yml`:
```yaml
ports:
  - "8009:8008"
```

And update `environment.ts`:
```typescript
matrix: {
  homeserver_url: "http://localhost:8009",
}
```

### Can't Register Users

Ensure `enable_registration: true` in `matrix-data/homeserver.yaml`.

### Synapse Logs Show Errors

View detailed logs:
```bash
docker-compose -f docker-compose.matrix.yml logs -f synapse
```

## Next Steps

Phases 1–6 are complete. Remaining work:
- **Phase 7**: UI integration (connect components to DataAdapter)

## Questions?

For issues or questions:
1. Check [MATRIX_SETUP.md](./MATRIX_SETUP.md) for detailed setup instructions
2. Review Matrix Synapse logs
3. Consult [Matrix documentation](https://matrix.org/docs/)
4. Open an issue with the `matrix-migration` label
