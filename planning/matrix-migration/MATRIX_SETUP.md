# Matrix Migration - Setup Guide

This document provides instructions for setting up a local Matrix homeserver for testing Matrix integration.

## ⚠️ Important: Phase 2 Requirement

**For Phase 2 (User Data Management), you MUST enable registration on the Matrix server.**

### Quick Fix for "Registration has been disabled" Error

If you see this error:
```
M_FORBIDDEN: Registration has been disabled
```

**Solution:**
1. Edit `matrix-data/homeserver.yaml`
2. Find the line: `enable_registration: false`
3. Change it to: `enable_registration: true`
4. Restart Matrix: `docker-compose -f docker-compose.matrix.yml restart`

## Phase 1: Local Development Setup

This section provides detailed instructions for setting up a local Matrix homeserver for testing the Phase 1 Matrix migration.

## Overview

Phase 1 implements the foundation for Matrix protocol integration:
- Basic MatrixService with authentication and room management
- Feature flag to switch between CouchDB and Matrix backends
- Local Matrix homeserver setup for testing
- Fully reversible implementation

## Prerequisites

- Docker and Docker Compose installed
  - **Note**: This guide uses `docker-compose` commands. If you have Docker Compose V2 (plugin), replace `docker-compose` with `docker compose` in all commands, or use the `./start-matrix-server.sh` script which automatically detects the correct command.
- Node.js and npm (already installed for Vodle development)
- Port 8008 available on localhost

## Setting Up Local Matrix Homeserver

We'll use Synapse, the reference Matrix homeserver implementation, running in Docker.

### Option 1: Docker Compose (Recommended)

1. Create a `docker-compose.matrix.yml` file in the project root:

```yaml
version: '3.8'

services:
  synapse:
    image: matrixdotorg/synapse:latest
    container_name: vodle-matrix-synapse
    ports:
      - "8008:8008"
    volumes:
      - ./matrix-data:/data
    environment:
      - SYNAPSE_SERVER_NAME=localhost
      - SYNAPSE_REPORT_STATS=no
      - SYNAPSE_ENABLE_REGISTRATION=yes
      - SYNAPSE_REGISTRATION_SHARED_SECRET=test_secret_for_development_only
    command: run
```

2. Generate the Synapse configuration (first time only):

```bash
# Create data directory
mkdir -p matrix-data

# Generate configuration
docker run -it --rm \
  -v $(pwd)/matrix-data:/data \
  -e SYNAPSE_SERVER_NAME=localhost \
  -e SYNAPSE_REPORT_STATS=no \
  matrixdotorg/synapse:latest generate
```

3. Edit `matrix-data/homeserver.yaml` to enable registration:

```yaml
# Find and modify these settings:
enable_registration: true
enable_registration_without_verification: true

# Optional: disable rate limiting for development
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

4. Start the Matrix homeserver:

```bash
docker-compose -f docker-compose.matrix.yml up -d
```

5. Check if Synapse is running:

```bash
# Check logs
docker-compose -f docker-compose.matrix.yml logs -f

# Test the homeserver
curl http://localhost:8008/_matrix/client/versions
```

Expected response:
```json
{
  "versions": ["r0.0.1", "r0.1.0", "r0.2.0", "r0.3.0", "r0.4.0", "r0.5.0", "r0.6.0", "r0.6.1", "v1.1", "v1.2", "v1.3", "v1.4", "v1.5"],
  "unstable_features": {...}
}
```

### Option 2: Manual Docker Run

If you prefer not to use Docker Compose:

```bash
# Create data directory
mkdir -p matrix-data

# Generate configuration
docker run -it --rm \
  -v $(pwd)/matrix-data:/data \
  -e SYNAPSE_SERVER_NAME=localhost \
  -e SYNAPSE_REPORT_STATS=no \
  matrixdotorg/synapse:latest generate

# Start Synapse
docker run -d \
  --name vodle-matrix-synapse \
  -p 8008:8008 \
  -v $(pwd)/matrix-data:/data \
  -e SYNAPSE_SERVER_NAME=localhost \
  -e SYNAPSE_REPORT_STATS=no \
  matrixdotorg/synapse:latest
```

## Testing the Matrix Integration

### 1. Enable Matrix Backend

Edit `src/environments/environment.ts`:

```typescript
export const environment = {
  // ... other settings ...
  
  // Set to true to use Matrix instead of CouchDB
  useMatrixBackend: true,
  
  matrix: {
    homeserver_url: "http://localhost:8008",
    enable_e2ee: false,  // Disable E2EE for Phase 1 testing
  },
  
  // ... rest of settings ...
};
```

### 2. Run the Vodle Application

```bash
# Start the development server
npm start

# Or build and serve
npm run build
```

### 3. Test Matrix Functionality

The application should now use Matrix for authentication. However, note that in Phase 1:
- ⚠️ **The Matrix backend is NOT yet integrated with the UI**
- ⚠️ **User data and polls still use CouchDB**
- ✅ **MatrixService can be tested programmatically**

### 4. Manual Testing with Browser Console

You can test the MatrixService directly from the browser console:

1. Open the application in your browser
2. Open Developer Tools (F12) → Console
3. Test the Matrix service:

```javascript
// Get the MatrixService instance (you'll need to access it through Angular's injector)
// This is for testing purposes only

// Example test commands (these are conceptual - actual implementation may vary):
// 1. Register a new user
// 2. Login
// 3. Create a room
// 4. Send a state event
```

### 5. Verify Matrix Backend is Working

Check the Synapse logs to see registration and login events:

```bash
docker-compose -f docker-compose.matrix.yml logs -f synapse
```

You should see log entries like:
```
synapse.http.server - Received request: POST /_matrix/client/r0/register
synapse.http.server - Received request: POST /_matrix/client/r0/login
```

## Switching Back to CouchDB

To revert to the CouchDB backend:

1. Edit `src/environments/environment.ts`:

```typescript
export const environment = {
  // ... other settings ...
  
  // Set to false to use CouchDB
  useMatrixBackend: false,
  
  // ... rest of settings ...
};
```

2. Rebuild and restart the application:

```bash
npm run build
npm start
```

That's it! The application will now use CouchDB as before.

## Stopping the Matrix Homeserver

When you're done testing:

```bash
# Stop but keep data
docker-compose -f docker-compose.matrix.yml stop

# Stop and remove container (data is preserved in matrix-data/)
docker-compose -f docker-compose.matrix.yml down

# Stop and remove everything including data
docker-compose -f docker-compose.matrix.yml down
rm -rf matrix-data/
```

## Troubleshooting

### Port 8008 Already in Use

If port 8008 is already in use, modify the port mapping in `docker-compose.matrix.yml`:

```yaml
ports:
  - "8009:8008"  # Use port 8009 instead
```

And update `environment.ts`:

```typescript
matrix: {
  homeserver_url: "http://localhost:8009",
  // ...
}
```

### Synapse Won't Start

Check the logs:

```bash
docker-compose -f docker-compose.matrix.yml logs
```

Common issues:
- Port already in use
- Insufficient disk space
- Permissions on matrix-data directory

### Can't Register Users

Ensure `enable_registration: true` is set in `matrix-data/homeserver.yaml` and restart:

```bash
docker-compose -f docker-compose.matrix.yml restart
```

### CORS Errors

If you encounter CORS errors when accessing the Matrix server from the browser, you may need to configure CORS in `matrix-data/homeserver.yaml`:

```yaml
# Add to homeserver.yaml
web_client_location: http://localhost:8100

# Enable CORS
listeners:
  - port: 8008
    type: http
    tls: false
    bind_addresses: ['0.0.0.0']
    resources:
      - names: [client]
        compress: true
        additional_resources:
          "/_matrix/client/versions":
            response_headers:
              Access-Control-Allow-Origin: "*"
```

## Phase 1 Limitations

In Phase 1, the Matrix integration is foundational only:

- ✅ MatrixService is implemented and testable
- ✅ Can authenticate with Matrix homeserver
- ✅ Can create rooms and send state events
- ⚠️ UI still uses DataService (CouchDB) for all operations
- ⚠️ No user data migration yet
- ⚠️ No poll data migration yet
- ⚠️ Feature flag exists but toggling it doesn't change UI behavior yet

**Phase 2 will integrate user data with Matrix, and subsequent phases will add poll and voting functionality.**

## Next Steps

After Phase 1:
- Phase 2: Migrate user data (settings, language, etc.) to Matrix rooms
- Phase 3: Implement poll rooms
- Phase 4: Implement voting and ratings
- Phase 5: Add offline support and encryption
- Phase 6: Migration tools and gradual rollout

## Questions or Issues?

If you encounter any issues with the Matrix setup:
1. Check the troubleshooting section above
2. Review Synapse logs: `docker-compose -f docker-compose.matrix.yml logs`
3. Consult the [Matrix Synapse documentation](https://matrix-org.github.io/synapse/latest/)
4. Open an issue in the Vodle repository with the `matrix-migration` label
