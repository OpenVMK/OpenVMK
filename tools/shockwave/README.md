# Shockwave / LibreShockwave Toolchain

Run the **original OpenVMK Shockwave client** locally using [LibreShockwave](https://github.com/LibreShockwave/LibreShockwave) (actively maintained C++20 player + Lingo VM, WASM + Qt debugger).

## One-time setup

```powershell
npm run tools:shockwave:setup
```

Downloads (~30MB):
- **Windows debugger** — Qt desktop app for stepping through Lingo, inspecting casts
- **WASM nightly** — browser player (`libreshockwave-cpp-*.wasm`)

Set the archive path if it is not `<repo>\shockwave`:

```powershell
$env:VMK_SHOCKWAVE = "D:\path\to\VMKShockwave"
```

Downloads (~30MB):
- **Windows debugger** — Qt desktop app for stepping through Lingo, inspecting casts
- **WASM nightly** — fallback only; prefer `npm run tools:shockwave:build-wasm` for zlib support

## Browser player (WASM)

```powershell
npm run tools:shockwave:serve
```

Open **http://127.0.0.1:5199/player/vmk-player.html**

### Build WASM with zlib (required for VMK files)

The upstream nightly zip often lacks zlib. **Build locally** (already done on this machine; re-run after LibreShockwave updates):

```powershell
npm run tools:shockwave:build-wasm
```

Installs Emscripten to `%USERPROFILE%\emsdk` on first run (~5 min), then compiles (~2 min). Output goes to `tools/shockwave/wasm/dist/`.

WSL alternative: `npm run tools:shockwave:build-wasm:wsl`

After rebuild: restart serve + **Ctrl+F5** hard refresh in browser.

Verified: `vmk_8.dcr` loads as **800×600 @ 24fps** with no zlib errors.

Enable **Debug playback** and watch **socket** lines when testing the client against a server.

## Desktop debugger (recommended for VMK today)

```powershell
npm run tools:shockwave:debug -- vmk_core/core.cct
npm run tools:shockwave:debug -- vmk_spaces/vmk_central.cct
npm run tools:shockwave:debug -- vmk_8.dcr
```

Or directly:

```powershell
& "tools\shockwave\debugger\win\windows-x86_64\libreshockwave_debugger.exe" `
  --play "shockwave\vmk_8.dcr"
```

The debugger provides:
- **Decompiled Lingo** (`.ls` view) and bytecode listing per handler
- Breakpoints, stepping, call stack, watches
- **Parameters → Edit Parameters** for `sw1`–`sw8` (connection host, external texts URL, etc.)
- Input recording (`.lswdebug`) for reproducing login flows

**Suggested load order:**
1. `vmk_core/core.cct` — verify cast parsing + UI sprites
2. `vmk_spaces/vmk_central.cct` — hub room rendering
3. `vmk_8.dcr` — full client (needs correct external params + game server)

## Local server shims

The serve script (`tools/src/serve-shockwave.ts`) exposes:

| Route | Purpose |
|-------|---------|
| `/player/*` | LibreShockwave WASM + `vmk-player.html` |
| `/shockwave/*` | Your VMKShockwave files |
| `/file.php?code=` | OpenVMK cast-delivery shim (MD5 filename lookup + request logging) |
| `/shockwave/external_texts.txt` | UI strings |

External params (`sw1`–`sw8`) in the player page are **starting guesses**. Refine them from debugger output and socket captures — they are not recoverable as plaintext from the DCR binaries.

## Batch decompilation (asset extractor)

LibreShockwave can emit **decompiled Lingo source** (`.ls`) and bytecode (`.lsasm`) for every cast:

```bash
# Build from source (Linux/WSL recommended — needs CMake + zlib)
git clone https://github.com/LibreShockwave/LibreShockwave
cd LibreShockwave
./build.sh --release --target libreshockwave_asset_extractor --no-tests
./cmake-build-release/cpp/libreshockwave_asset_extractor \
  /path/to/VMKShockwave/vmk_core/core.cct \
  ./output/core-catalogue
```

Output includes `scripts/*.ls`, `bitmaps/`, `sounds/`, `manifest.tsv`. This is the practical "decompile Shockwave" path — run it against priority casts (`core.cct`, `framework.dcr`, `vmk_8.dcr`) and use the `.ls` files as the game-logic spec for a compatible server.

## Protocol research workflow

1. Start `npm run tools:shockwave:serve` and load `vmk_8.dcr` with debug on
2. Watch **socket** lines in the event log when the client tries to connect
3. Point `connection.info.host/port` at a capture server or `vmk-web` server once format is known
4. Compare captured packets with what the client's Lingo sends and expects

## String extraction (no build)

```powershell
npm run tools:extract-strings   # ASCII from vmk_8.dcr, core.cct, vmk_central.cct
npm run tools:inventory         # Full VMKShockwave inventory
```

Note: game logic strings are often compressed in Afterburner DCRs — expect few network hints in plaintext.

## OpenShockwave (bytecode reference)

Clone https://github.com/Brian151/OpenShockwave for Lingo opcode documentation when reading debugger disassembly.

## Updating LibreShockwave builds

```powershell
# Re-download latest nightly
gh release download nightly --repo LibreShockwave/LibreShockwave --pattern "libreshockwave-cpp-wasm-*.zip" --dir tools/shockwave/wasm
gh release list --repo LibreShockwave/LibreShockwave --limit 3   # find latest debugger tag
```

Live upstream demo: https://libre.oldskooler.org/

## Converted web assets (fallback)

If a cast won't render yet in LibreShockwave, compare against synced CDN output:

```powershell
npm run tools:sync-assets
```

Assets land in `assets/`.
