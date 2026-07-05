#!/usr/bin/env bash
# Standalone setup script for Pulse Frontend
# Use this to run the frontend independently:
#   cd frontend && bash setup.sh

set -e
echo "==> Installing Pulse Frontend dependencies..."
npm install
echo ""
echo "==> Starting dev server..."
echo "    Frontend: http://localhost:5173"
echo "    API proxy: http://localhost:3001"
echo ""
npm run dev