# VMK + LibreShockwave: Black Screen Guide

If every file shows a **black stage**, read this before assuming the toolchain is broken.

## 1. Know what each file is

| File | Type | Open standalone? |
|------|------|------------------|
| `vmk_8.dcr` / `vmk_5`–`vmk_7.dcr` | **Main client** (bootstrap + network) | Yes — **start here** |
| `vmk_14.dcr` / `vmk_13.dcr` | Smaller client builds | Yes — try if `vmk_8` fails |
| `vmk_spaces/framework.dcr` | Space/room loader framework | Maybe — test second |
| `vmk_core/core.cct` | **Shared cast library** (UI bits, not a game screen) | **No** — black is normal |
| `vmk_spaces/vmk_central.cct` | **Room cast** (hub map data) | **No** — loaded by client at runtime |
| `vmk_files/empty.cct` | Placeholder cast | Unlikely to show anything |

**`.cct` files are usually libraries**, not login screens. Opening `core.cct` or `vmk_central.cct` directly will almost always look black or empty even when LibreShockwave is working correctly.

## 2. WASM vs desktop debugger

| Symptom | Cause |
|---------|--------|
| Log says `built without zlib support` | WASM nightly cannot decompress VMK files — use **desktop debugger** or rebuild WASM |
| Player says "Ready" but load errors in log | Same zlib issue — black canvas |
| Debugger opens, Play works, frame counter moves, still black | See sections 3–5 below |

## 3. VMK client expects a server (black while waiting)

`vmk_8.dcr` is not a self-contained demo. On Play it typically:

1. Reads **external params** (`sw1`–`sw8` from the old HTML embed)
2. Fetches `external_texts.txt` / variables
3. Opens a **socket** to the game server
4. Loads casts via `file.php?code=…` or relative paths
5. Only then draws login UI or a room

**Without a compatible server + params, a black stage while the frame counter ticks is expected.**

### Local setup (two terminals)

**Terminal A — asset + file.php shim:**

```powershell
npm run tools:shockwave:serve
```

**Terminal B — debugger on the main client:**

```powershell
npm run tools:shockwave:debug -- vmk_8.dcr
```

In the debugger: **Parameters → Edit Parameters** — paste contents of `tools/shockwave/debugger-params.local.txt`, then **Play**.

## 4. What to check in the Qt debugger

1. **Frame counter** (status bar) — is it advancing? If yes, Lingo is running.
2. **Movies & Scripts** tree — expand casts; select a handler; read **Decompiled** tab for load/login logic.
3. **Debug / Lingo trace** — look for `getNetText`, `openNetText`, socket errors, missing cast paths.
4. **Pause** (Esc) early in playback — inspect globals/properties for connection state.
5. **File → Open Movie** must use files under `VMKShockwave` so relative paths like `vmk_core/core.cct` resolve.

The debugger now launches with **working directory = VMKShockwave root** (fixed in `launch-debugger.ts`).

## 5. LibreShockwave rendering limits (still black with moving frames)

LibreShockwave is actively developed but **not complete** for every Director 8.5 feature VMK uses:

- Behavior-heavy UI may not paint sprites yet
- Some inks / transition modes
- Casts loaded only after async network may never arrive offline

To measure whether anything renders, build native probes in WSL:

```powershell
wsl bash tools/shockwave/build-probe-wsl.sh
```

Look for `nonBackgroundPixels=0` vs `>0` in **render probe** output. Zero means the engine parsed the file but drew nothing (renderer gap). Non-zero means pixels exist but maybe wrong entry file.

## 6. Recommended test order

1. `vmk_8.dcr` + local serve + debugger params + Play  
2. `vmk_14.dcr` (smaller client)  
3. `vmk_spaces/framework.dcr`  
4. **Do not** use `core.cct` / `vmk_central.cct` as “does LibreShockwave work?” tests  

## 7. Parallel sanity check (optional)

[DirPlayer](https://github.com/igorlira/dirplayer-rs/releases) (standalone Windows app) can open the same `.dcr` files. If DirPlayer also stays black with the same params/server gap, the blocker is VMK’s server dependency, not LibreShockwave alone.

## 8. Next step for this project

Capture **socket bytes** and **Lingo decompile** from `vmk_8.dcr` login handlers → implement a minimal compatible server.
