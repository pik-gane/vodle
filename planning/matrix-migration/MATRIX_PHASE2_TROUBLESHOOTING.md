# Matrix Phase 2 - Troubleshooting Guide

## Common Issues and Solutions

### 1. Registration Disabled Error

**Symptoms:**
- Popup: "Matrix registration is disabled on the server"
- Console: `M_FORBIDDEN: Registration has been disabled`

**Cause:** Matrix homeserver has registration disabled by default.

**Solution:**
```bash
# Stop the server
docker-compose -f docker-compose.matrix.yml down

# Run the setup script (will auto-enable registration)
./start-matrix-server.sh
```

The script automatically enables both:
- `enable_registration: true`
- `enable_registration_without_verification: true`

### 2. Server Won't Start After Configuration Change

**Symptoms:**
- Script shows: "ERROR: Homeserver did not start properly"
- Server logs show YAML parsing errors

**Cause:** Corrupted homeserver.yaml (usually from manual edits or script issues)

**Solution:**
```bash
# Restore from backup
docker run --rm -v $(pwd)/matrix-data:/data --entrypoint sh matrixdotorg/synapse:latest -c "cp /data/homeserver.yaml.backup /data/homeserver.yaml"

# Or regenerate completely
docker-compose -f docker-compose.matrix.yml down
rm -rf matrix-data
./start-matrix-server.sh
```

### 3. Permission Denied When Editing Config

**Symptoms:**
- `Permission denied` when trying to edit `matrix-data/homeserver.yaml`
- Files owned by root or container UID

**Cause:** Files created by Docker containers have container UID ownership

**Solution:**
Don't edit manually! Use the script which handles permissions:
```bash
./start-matrix-server.sh
```

The script uses Docker to modify files with correct permissions.

### 4. Settings Not Syncing to Matrix

**Symptoms:**
- Console logs: "Matrix not logged in, cannot sync"
- No network requests to port 8008

**Cause:** Matrix login happening after settings changes (race condition)

**Solution:**
This should be fixed in the latest version. The login is now synchronous and blocks with a spinner. If you still see this:

1. Ensure you pulled latest changes
2. Rebuild: `npm run build`
3. Clear cache: Ctrl+Shift+R in browser
4. Login again

### 5. Vim Modeline Corruption

**Symptoms:**
```
# vim:ft=yamlenable_registration_without_verification: true
```

**Cause:** Old version of script used `echo` without proper newlines

**Solution:**
```bash
# Stop server
docker-compose -f docker-compose.matrix.yml down

# Restore backup
docker run --rm -v $(pwd)/matrix-data:/data --entrypoint sh matrixdotorg/synapse:latest -c "cp /data/homeserver.yaml.backup /data/homeserver.yaml"

# Pull latest script (uses printf now)
git pull

# Run fixed script
./start-matrix-server.sh
```

### 6. "Failed to connect to Matrix server"

**Check these in order:**

1. **Is server running?**
   ```bash
   docker ps | grep matrix
   curl http://localhost:8008/_matrix/client/versions
   ```

2. **Check logs for errors:**
   ```bash
   docker-compose -f docker-compose.matrix.yml logs --tail=50
   ```

3. **Is registration enabled?**
   ```bash
   docker run --rm -v $(pwd)/matrix-data:/data --entrypoint grep matrixdotorg/synapse:latest '^enable_registration' /data/homeserver.yaml
   ```
   Should show:
   ```
   enable_registration: true
   enable_registration_without_verification: true
   ```

4. **Restart everything:**
   ```bash
   docker-compose -f docker-compose.matrix.yml down
   ./start-matrix-server.sh
   ```

### 7. Port 8008 Already in Use

**Symptoms:**
- Server fails to start
- Logs show bind errors

**Solution:**
```bash
# Find what's using the port
sudo lsof -i :8008

# Kill the process or change the port in docker-compose.matrix.yml
```

## Verification Commands

### Check Matrix server is running:
```bash
curl http://localhost:8008/_matrix/client/versions
```

### Check registration settings:
```bash
docker run --rm -v $(pwd)/matrix-data:/data --entrypoint grep matrixdotorg/synapse:latest '^enable_registration' /data/homeserver.yaml
```

### View server logs:
```bash
docker-compose -f docker-compose.matrix.yml logs -f
```

### Check container status:
```bash
docker ps -a | grep matrix
```

## Getting Help

If you're still stuck:

1. Check the full server logs
2. Verify homeserver.yaml is valid YAML
3. Ensure Docker has enough resources
4. Try regenerating from scratch (delete matrix-data/)
5. Check GitHub issues for similar problems
