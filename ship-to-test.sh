#!/usr/bin/env bash
# Ship the test stand (https://test.178.20.42.212.sslip.io) from a dev machine.
#
# WHY: the server has 3.8 GB RAM and NO swap. Building Nuxt there OOMs and leaves a
# half-written .output -> the stand returns 500/404. So we build HERE (plenty of RAM)
# and send only the finished .output. The SERVER NEVER BUILDS.
#
# USAGE: from the repo root, on the branch you want live on the stand:
#   ./ship-to-test.sh
#
# Requires: node/npm, and SSH access to the server (developer@178.20.42.212).
# rsync is used when available; on machines without it (e.g. Git Bash on Windows)
# the script falls back to tar over ssh, which replaces .output just the same.
set -euo pipefail

SERVER="developer@178.20.42.212"
REMOTE="/var/www/ra-indigo-test"
BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo '?')"

echo ">> [1/3] building locally (branch: $BRANCH) ..."
npm install
npm run build
test -f .output/server/index.mjs || { echo "ERROR: build produced no .output/server/index.mjs" >&2; exit 1; }
test -d .output/public/_nuxt     || { echo "ERROR: build produced no .output/public/_nuxt" >&2; exit 1; }

echo ">> [2/3] shipping .output to the stand (stale files are removed) ..."
if command -v rsync >/dev/null 2>&1; then
  rsync -az --delete .output/ "$SERVER:$REMOTE/.output/"
else
  echo "   rsync not found - using tar over ssh"
  # unpack next to the live one, then swap in place so the stand is never half-updated
  tar -czf - -C .output . | ssh "$SERVER" "
    set -e
    rm -rf '$REMOTE/.output.new' '$REMOTE/.output.old'
    mkdir -p '$REMOTE/.output.new'
    tar -xzf - -C '$REMOTE/.output.new'
    test -f '$REMOTE/.output.new/server/index.mjs'
    test -d '$REMOTE/.output.new/public/_nuxt'
    if [ -d '$REMOTE/.output' ]; then mv '$REMOTE/.output' '$REMOTE/.output.old'; fi
    mv '$REMOTE/.output.new' '$REMOTE/.output'
    rm -rf '$REMOTE/.output.old'
  "
fi

echo ">> [3/3] restarting the app on the stand (no build runs there) ..."
ssh "$SERVER" "$REMOTE/deploy-test.sh"

echo ">> done. Open https://test.178.20.42.212.sslip.io  (login: indigo)"
