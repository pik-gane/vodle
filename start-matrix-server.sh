#!/bin/bash

# Matrix Homeserver Quick Start Script for Vodle
# This script helps you quickly set up and start the local Matrix homeserver

set -e

echo "========================================"
echo "Vodle Matrix Homeserver Setup"
echo "========================================"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "ERROR: Docker is not installed. Please install Docker first."
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check which Docker Compose command is available
DOCKER_COMPOSE_CMD=""
if docker compose version &> /dev/null 2>&1; then
    DOCKER_COMPOSE_CMD="docker compose"
    echo "✓ Docker Compose (plugin) detected"
elif docker-compose --version &> /dev/null 2>&1; then
    DOCKER_COMPOSE_CMD="docker-compose"
    echo "✓ Docker Compose (standalone) detected"
else
    echo "ERROR: Docker Compose is not installed. Please install Docker Compose first."
    echo "Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✓ Docker and Docker Compose are installed"
echo ""

# Generate Synapse configuration if needed
if [ ! -d "matrix-data" ]; then
    echo "Generating Synapse configuration..."
    mkdir -p matrix-data
    docker run -it --rm \
      -v $(pwd)/matrix-data:/data \
      -e SYNAPSE_SERVER_NAME=localhost \
      -e SYNAPSE_REPORT_STATS=no \
      matrixdotorg/synapse:latest generate
    
    echo ""
    echo "✓ Synapse configuration generated"
    echo ""
fi

# Always check and enable registration (even if matrix-data exists)
echo "Checking registration settings..."
if [ -f "matrix-data/homeserver.yaml" ]; then
    # Check if registration is already enabled
    if grep -q "^enable_registration: true" matrix-data/homeserver.yaml; then
        echo "✓ Registration already enabled"
    else
        echo "Enabling registration in homeserver.yaml..."
        
        # Use Docker to create backup and modify the file
        # This avoids permission issues with files owned by the container
        docker run --rm \
          -v $(pwd)/matrix-data:/data \
          --entrypoint /bin/sh \
          matrixdotorg/synapse:latest \
          -c "if [ ! -f /data/homeserver.yaml.backup ]; then \
                cp /data/homeserver.yaml /data/homeserver.yaml.backup && \
                echo '  (Backup saved to homeserver.yaml.backup)'; \
              fi && \
              sed -i 's/^enable_registration:.*/enable_registration: true/' /data/homeserver.yaml && \
              if ! grep -q '^enable_registration_without_verification:' /data/homeserver.yaml; then \
                echo 'enable_registration_without_verification: true' >> /data/homeserver.yaml; \
              else \
                sed -i 's/^enable_registration_without_verification:.*/enable_registration_without_verification: true/' /data/homeserver.yaml; \
              fi"
        
        echo "✓ Registration enabled in homeserver.yaml"
        echo ""
    fi
else
    echo "WARNING: homeserver.yaml not found. Will be generated on first run."
    echo ""
fi

# Start the homeserver
echo "Starting Matrix homeserver..."
$DOCKER_COMPOSE_CMD -f docker-compose.matrix.yml up -d

echo ""
echo "Waiting for homeserver to start..."
sleep 5

# Check if homeserver is running
if curl -s http://localhost:8008/_matrix/client/versions > /dev/null 2>&1; then
    echo ""
    echo "========================================"
    echo "✓ Matrix homeserver is running!"
    echo "========================================"
    echo ""
    echo "Homeserver URL: http://localhost:8008"
    echo "Registration: ENABLED (auto-registration on first login)"
    echo ""
    echo "To view logs:"
    echo "  $DOCKER_COMPOSE_CMD -f docker-compose.matrix.yml logs -f"
    echo ""
    echo "To stop the homeserver:"
    echo "  $DOCKER_COMPOSE_CMD -f docker-compose.matrix.yml down"
    echo ""
    echo "To test the API:"
    echo "  curl http://localhost:8008/_matrix/client/versions"
    echo ""
    echo "Next steps:"
    echo "  1. Enable Matrix backend in src/environments/environment.ts"
    echo "  2. Run 'npm start' to start the Vodle application"
    echo "  3. Login to Vodle - users will be auto-registered in Matrix"
    echo ""
else
    echo ""
    echo "ERROR: Homeserver did not start properly"
    echo "Check logs with: $DOCKER_COMPOSE_CMD -f docker-compose.matrix.yml logs"
    exit 1
fi
