#!/usr/bin/env bash
# Build native lingo export tool (WSL/Linux) and dump login/network handlers.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
LIBRE_DIR="${ROOT}/tools/shockwave/LibreShockwave"
SHOCKWAVE="${VMK_SHOCKWAVE:-${ROOT}/shockwave}"
OUT="${ROOT}/docs/original-client-spec/lingo-export"
BIN="${LIBRE_DIR}/cmake-build-release/cpp/libreshockwave_lingo_export"

if [[ ! -d "${LIBRE_DIR}/.git" ]]; then
  git clone --depth 1 https://github.com/LibreShockwave/LibreShockwave.git "${LIBRE_DIR}"
fi

if ! command -v cmake >/dev/null || ! dpkg -s zlib1g-dev >/dev/null 2>&1; then
  echo "Installing deps (sudo may prompt)..."
  sudo apt-get update
  sudo apt-get install -y build-essential cmake ninja-build zlib1g-dev git
fi

cd "${LIBRE_DIR}"
./build.sh --release --generator Ninja --no-tests \
  --target libreshockwave_lingo_export -- \
  -DLIBRESHOCKWAVE_REQUIRE_ZLIB=ON

mkdir -p "${OUT}"
"${BIN}" "${OUT}" \
  "${SHOCKWAVE}/vmk_8.dcr" \
  "${SHOCKWAVE}/vmk_14.dcr" \
  "${SHOCKWAVE}/vmk_core/core.cct" \
  2>&1 | tee "${OUT}/export.log"

echo ""
echo "Lingo export written to: ${OUT}"
ls -la "${OUT}"/*.ls 2>/dev/null | head -30 || true
