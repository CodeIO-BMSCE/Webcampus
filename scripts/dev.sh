#!/bin/bash
set -e

bunx tsx scripts/banner.ts

docker desktop start

# Starts db and other services required for bootstrap
bun dx

# Bootstrap the required resources
bun run bootstrap

# Free up common development ports before starting the dev server
sh scripts/kill-ports.sh

# Start the Turborepo development server using Bun
bunx turbo dev
