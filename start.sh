#!/bin/sh
# Start VMK on macOS / Linux. A release carries its own Node in node/; a dev
# checkout uses the installed one.
cd "$(dirname "$0")" || exit 1

if [ -x ./node/bin/node ]; then
  NODE=./node/bin/node
elif command -v node >/dev/null 2>&1; then
  NODE=node
else
  echo
  echo "  VMK needs Node.js 22.5 or newer, and none was found."
  echo "  Get it from https://nodejs.org/ and run this again."
  echo
  exit 1
fi

exec "$NODE" start.mjs "$@"
