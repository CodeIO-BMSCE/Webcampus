#!/bin/bash
set -e

pushd scripts
bun tsx banner.ts
popd

# Start Docker Desktop (only works on Windows WSL/macOS with Docker CLI integration)
docker desktop start

# Move into the docker directory
pushd docker

# Start all Docker services defined in compose.yaml in detached mode
docker compose up -d

# Return to the previous directory
popd

# Free up common development ports before starting the dev server
pushd scripts
sh kill-ports.sh
popd

# Start the Turborepo development server using Bun
bunx turbo dev
