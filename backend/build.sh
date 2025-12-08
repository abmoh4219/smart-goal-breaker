#!/usr/bin/env bash
# Render build script - runs migrations before starting the app

set -o errexit  # Exit on error

echo "Running database migrations..."
alembic upgrade head

echo "Migrations completed successfully!"
