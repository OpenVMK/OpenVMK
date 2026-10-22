#!/usr/bin/env bash
# Build native libreshockwave_probe + libreshockwave_render_probe (WSL/Linux).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
LIBRE_DIR="${ROOT}/tools/shockwave/LibreShockwave"
SHOCKWAVE="${VMK_SHOCKWAVE:-${ROOT}/shockwave}"

if [[ ! -d "${LIBRE_DIR}/.git" ]]; then
  git clone --depth 1 https://github.com/LibreShockwave/LibreShockwave.git "${LIBRE_DIR}"
fi

if ! command -v cmake >/dev/null || ! dpkg -s zlib1g-dev >/dev/null 2>&1; then
  echo "Installing deps (sudo password may be required)..."
  sudo apt-get update
  sudo apt-get install -y build-essential cmake ninja-build zlib1g-dev git
fi

cd "${LIBRE_DIR}"
./build.sh --release --generator Ninja --no-tests \
  --target libreshockwave_probe \
  --target libreshockwave_render_probe -- \
  -DLIBRESHOCKWAVE_REQUIRE_ZLIB=ON

PROBE="${LIBRE_DIR}/cmake-build-release/cpp/libreshockwave_probe"
RENDER="${LIBRE_DIR}/cmake-build-release/cpp/libreshockwave_render_probe"

echo ""
echo "=== Director metadata probe ==="
"${PROBE}" --verbose --show-current \
  "${SHOCKWAVE}/vmk_8.dcr" \
  "${SHOCKWAVE}/vmk_14.dcr" \
  "${SHOCKWAVE}/vmk_core/core.cct" \
  "${SHOCKWAVE}/vmk_spaces/vmk_central.cct" \
  "${SHOCKWAVE}/vmk_spaces/framework.dcr" \
  "${SHOCKWAVE}/vmk_files/empty.cct" 2>&1 || true

echo ""
echo "=== Render probe (60 ticks, preload casts) ==="
for f in vmk_8.dcr vmk_14.dcr vmk_spaces/framework.dcr vmk_spaces/vmk_central.cct; do
  echo "--- ${f} ---"
  "${RENDER}" --play --ticks 60 --scan-frames 30 --verbose \
    "${SHOCKWAVE}/${f}" 2>&1 | tail -20 || true
done

echo ""
echo "Binaries:"
echo "  ${PROBE}"
echo "  ${RENDER}"
