#!/bin/bash
set -e

bunx tsx scripts/banner.ts

# Start the required docker resources
sh scripts/docker.sh

#Boostrap the required resources
bun run bootstrap

# Free up common development ports before starting the dev server
sh scripts/kill-ports.sh

# Start the Turborepo development server using Bun
bunx turbo dev
