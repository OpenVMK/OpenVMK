# Local patches to the DirPlayer clone

`tools/shockwave/DirPlayer` is a gitignored `--depth 1` clone of
[igorlira/dirplayer-rs](https://github.com/igorlira/dirplayer-rs), so anything
fixed in it is lost on the next `git reset --hard origin/main`. Every local
change therefore lives here as a patch as well as in the clone.

Apply them after updating the clone, then rebuild the VM:

```powershell
cd tools/shockwave/DirPlayer
git apply ../dirplayer-patches/*.patch
cd vm-rust
wasm-pack build --target web        # ~7 min; needs ~/.cargo/bin on PATH
```

`git apply --check` first if the upstream file has moved; a patch that no longer
applies usually means upstream fixed it, so drop the file rather than forcing it.

## 0001-ils-trailing-pad.patch

**Symptom:** loading VMK halts the whole VM part-way through the external casts.

```
panicked at src\director\file.rs:930:44: called `Option::unwrap()` on a `None` value
Uncaught RuntimeError: unreachable
```

**Cause:** `read_afterburner_map` walks the initial load segment with
`while !ils_reader.eof()` and unwraps the ABMP entry for every resource id it
reads. The ILS is allowed to end in padding rather than exactly on a chunk
boundary — VMK's messenger cast
(`7a684fb5-…/0b6ee19273580ef7ae01b42744cca0a6.cct`) inflates to 37333 bytes of
which byte 37332 is a lone `0x00`. That reads back as resource id 0, which the
43-entry map does not describe, and the unwrap kills the VM.

The cast is fine — the other eight casts VMK loads are clean, and both other
readers of this format guard the case explicitly:

- LibreShockwave, `cpp/src/format/AfterburnerReader.cpp` (`readIlsChunk`):
  `const auto* info = getChunkInfo(resourceId); if (!info) { break; }`
- ours, `tools/shockwave/afterburner.mjs`: `if (!entry) break;`

**Fix:** break out of the walk at the first id the map does not describe (with
no entry there is no length, so it cannot continue anyway), and clamp the
payload read to the bytes remaining.

**Upstream:** not reported yet. `vm-rust/src/director/file.rs` was byte-identical
between `4a35e82` (2026-07-27) and `68376fb` (2026-09-06), so this is long-standing
rather than a regression — worth sending upstream.

## 0002-sound-channel-on-movie-datum.patch

**Symptom:** every sound channel VMK allocates comes back undefined. With the
debug UI (`#debug`) the VM stops on it:

```
No handler channel for datum <_movie>
  on DefineChannel  CSoundChannelObject
  on Define         CSoundChannelAllocator
  on AllCastsDone   CSoundComponent
```

**Cause:** `CSoundChannelObject.DefineChannel` opens with
`m_r_SndChannel = _sound.channel(a_iChannelNum)`. `bytecode/get_set.rs` maps
`BuiltInSymbol::_Sound` to `Datum::MovieRef` so that `_sound.soundDevice` reaches
the movie properties — which sends the *call* to the movie datum's handler arm.
`channel` is not in the built-in symbol table, so it fell through to the built-in
dispatcher and came back as an unknown name.

**Fix:** a `channel` arm on the movie datum that delegates to
`TypeHandlers::sound` — the same code `sound(n)` uses, including its
channel-range validation. Mirrors the existing `_system.time()` precedent in
`handlers/manager.rs`, which resolves through the movie datum for the same
reason.

**Verified:** `mcp_eval_lingo("_sound.channel(1)")` returns
`{"success": true, "result_type": "sound_channel"}`; before the patch it raised
the error above.

**Upstream:** worth sending, same as 0001 — nothing VMK-specific about it.
