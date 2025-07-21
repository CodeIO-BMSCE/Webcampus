#!/bin/bash
set -e

# Start Docker Desktop (only works on Windows WSL/macOS with Docker CLI integration)
docker desktop start

# Move into the docker directory
pushd docker

# Start all Docker services defined in compose.yaml in detached mode
docker compose up -d

# Return to the previous directory
popd
