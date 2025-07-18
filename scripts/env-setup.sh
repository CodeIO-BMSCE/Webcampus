#!/bin/bash

set -e

cp packages/db/.env.example packages/db/.env
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

echo ".env files copied!"
