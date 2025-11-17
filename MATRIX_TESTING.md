# Testing Phase 1 Matrix Integration

This guide explains how to test the Phase 1 Matrix protocol integration in Vodle.

## Quick Start

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

### 3. Enable Matrix Backend (Optional for Phase 1)

**Note**: In Phase 1, the Matrix backend is not yet integrated with the UI. This step is optional and for testing the MatrixService directly.

Edit `src/environments/environment.ts`:

```typescript
useMatrixBackend: true,  // Change from false to true
```

### 4. Run the Application

```bash
npm start
```

The application will start on http://localhost:8100

## Phase 1 Testing Scope

### What's Implemented in Phase 1

✅ **Infrastructure**:
- MatrixService with basic functionality
- Feature flag for backend switching
- Docker setup for local Matrix homeserver
- Documentation

✅ **MatrixService API**:
- Client initialization
- User registration
- User login/logout
- Room creation
- State event sending/receiving
- Credential storage

### What's NOT Yet Implemented

❌ **UI Integration**:
- The UI still uses DataService (CouchDB) for all operations
- Toggling `useMatrixBackend` doesn't change UI behavior yet

❌ **Data Migration**:
- No user data migration tools yet
- No poll data migration yet
- No voter data migration yet

❌ **Advanced Features**:
- No E2EE implementation yet
- No offline queue yet
- No conflict resolution yet

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

After Phase 1 is complete:
- **Phase 2**: User data migration (settings, language preferences)
- **Phase 3**: Poll room implementation
- **Phase 4**: Voting and ratings
- **Phase 5**: Offline support and encryption
- **Phase 6**: Migration tools and gradual rollout

## Questions?

For issues or questions:
1. Check [MATRIX_SETUP.md](./MATRIX_SETUP.md) for detailed setup instructions
2. Review Matrix Synapse logs
3. Consult [Matrix documentation](https://matrix.org/docs/)
4. Open an issue with the `matrix-migration` label
