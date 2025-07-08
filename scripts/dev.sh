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

# Free up common development ports before starting the dev server
bun kill-port 8080
bun kill-port 3000

# Start the Turborepo development server using Bun
bunx turbo dev
