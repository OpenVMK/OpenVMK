# Publishing an OpenVMK release

For maintainers, on a Windows machine with a full working checkout: the release
is built from the extracted casts in `client/assets/casts`, which aren't in git.

The release goes to **https://github.com/OpenVMK/OpenVMK/releases**.

## 1. Build the release and its zip

```bash
node tools/release/make-release.mjs --force --zip
```

This rebuilds the client, bundles the two servers, copies everything into
`..\vmk-release` (next to the repo) and zips it to `..\vmk-release.zip`. It
takes about 30 minutes, mostly zipping. `--force` replaces an earlier build;
the new one always starts with an empty `data` folder.

## 2. Check the size

GitHub rejects any single file over **2 GiB**. The zip is currently about
1.85 GB:

```powershell
(Get-Item ..\vmk-release.zip).Length / 1GB
```

If it ever grows past 2, trim the art (duplicate loose PNGs that also live in
`bitmaps.pack` are the obvious candidate) or split the download.

## 3. Smoke-test the folder

Run `..\vmk-release\Start VMK.bat`, create an account, check it is the admin
(`/hk` opens), and walk into a room.

The zip was sealed in step 1, so testing the folder afterwards can't leak into
it. But **empty `..\vmk-release\data` and `..\vmk-release\logs` before any
later re-zip**, or your test account ships and nobody else gets the
first-account admin.

## 4. Take the checksum

```powershell
Get-FileHash ..\vmk-release.zip -Algorithm SHA256
```

## 5. Publish

**On GitHub:** Releases → *Draft a new release* → *Choose a tag* → type a new
one (for example `v1.0.0`) on `main` → title (`OpenVMK v1.0.0`) → paste the
notes below with the SHA-256 filled in → drag `vmk-release.zip` into the assets
box and **wait for the upload to finish** → *Publish release*.

**Or with the [GitHub CLI](https://cli.github.com/)**, from the repo folder,
with the notes saved as `release-notes.md`:

```bash
gh release create v1.0.0 ../vmk-release.zip --repo OpenVMK/OpenVMK --title "OpenVMK v1.0.0" --notes-file release-notes.md
```

## 6. Check what you published

From a clean folder: download `vmk-release.zip` from the release page, confirm
the SHA-256 matches, extract it, and start it once.

---

## Release notes template

```markdown
The first OpenVMK release: Virtual Magic Kingdom in your browser, no plugin.

**Download `vmk-release.zip` below** (1.9 GB; about 6 GB free needed once
extracted). The "Source code" archives GitHub adds don't contain the game.

### Getting started
- **Windows:** extract, double-click `Start VMK.bat`. Node.js is included.
- **macOS / Linux:** install Node.js 22.5+, extract, run `sh start.sh`.
- **Docker (Linux):** extract, `docker compose up -d` (early; feedback welcome).

The first account you create becomes the admin (staff panel at `/hk`).
Hosting for friends or on a domain: see `SELF-HOSTING.md` in the download.

### Known issues
- Some dark-ride scenes draw a few pieces in the wrong order (track over the
  deck of Hook's ship, the Nursery bed under the floor).
- The Docker setup is new and lightly tested.

### Checksum
SHA-256 of `vmk-release.zip`: `PASTE-HASH-HERE`

Bugs: [GitHub Issues](https://github.com/OpenVMK/OpenVMK/issues) ·
Chat: [Discord](https://discord.gg/WG9ch4exd5)
```
