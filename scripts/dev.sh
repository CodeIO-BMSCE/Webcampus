#!/bin/bash
set -e

pushd scripts
bun tsx banner.ts
popd

#Boostrap the required resources
bun run bootstrap

# Start the required docker resources
sh scripts/docker.sh

# Free up common development ports before starting the dev server
sh scripts/kill-ports.sh

# Start the Turborepo development server using Bun
bunx turbo dev
