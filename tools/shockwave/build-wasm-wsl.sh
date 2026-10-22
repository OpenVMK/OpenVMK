#!/usr/bin/env bash
# Build LibreShockwave WASM with zlib enabled (fixes "built without zlib support").
# Run inside WSL from repo root:
#   wsl bash tools/shockwave/build-wasm-wsl.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
LIBRE_DIR="${ROOT}/tools/shockwave/LibreShockwave"
DIST="${ROOT}/tools/shockwave/wasm/dist"

if [[ ! -d "${LIBRE_DIR}/.git" ]]; then
  git clone --depth 1 https://github.com/LibreShockwave/LibreShockwave.git "${LIBRE_DIR}"
fi

if ! command -v cmake >/dev/null || ! command -v ninja >/dev/null || ! dpkg -s zlib1g-dev >/dev/null 2>&1; then
  echo "Installing build dependencies (requires sudo password)..."
  sudo apt-get update
  sudo apt-get install -y build-essential cmake ninja-build zlib1g-dev git
fi

if ! command -v emcc >/dev/null; then
  echo "Installing Emscripten SDK..."
  EMSDK="${HOME}/emsdk"
  if [[ ! -d "${EMSDK}" ]]; then
    git clone https://github.com/emscripten-core/emsdk.git "${EMSDK}"
  fi
  pushd "${EMSDK}" >/dev/null
  ./emsdk install latest
  ./emsdk activate latest
  popd >/dev/null
  # shellcheck disable=SC1091
  source "${EMSDK}/emsdk_env.sh"
fi

# shellcheck disable=SC1091
source "${HOME}/emsdk/emsdk_env.sh" 2>/dev/null || true

cd "${LIBRE_DIR}"

# Patch CMake so Emscripten gets -sUSE_ZLIB=1 when find_package(ZLIB) fails
python3 "${ROOT}/tools/shockwave/apply-emscripten-zlib-patch.py" "${LIBRE_DIR}/cpp/CMakeLists.txt"

if command -v embuilder >/dev/null 2>&1; then
  embuilder build zlib || true
fi

./build.sh --wasm --release --generator Ninja -- \
  -DLIBRESHOCKWAVE_REQUIRE_ZLIB=ON

BUILT="${LIBRE_DIR}/cmake-build-wasm/cpp/wasm-dist"
if [[ ! -f "${BUILT}/libreshockwave-cpp-wasm.wasm" ]]; then
  echo "Build failed — wasm output missing" >&2
  exit 1
fi

mkdir -p "${DIST}"
cp -a "${BUILT}/." "${DIST}/"
# Preserve our VMK-specific player page
if [[ -f "${ROOT}/tools/shockwave/vmk-player.html" ]]; then
  cp "${ROOT}/tools/shockwave/vmk-player.html" "${DIST}/vmk-player.html"
fi

echo ""
echo "WASM build with zlib copied to ${DIST}"
echo "Restart: npm run tools:shockwave:serve"
echo "Open:    http://127.0.0.1:5199/player/vmk-player.html"
