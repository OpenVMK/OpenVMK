# OpenVMK — Virtual Magic Kingdom Server

> **Just want to play or host?** **[Download the latest release](https://github.com/OpenVMK/OpenVMK/releases/latest)**, unzip it, and start it — no plugin, no installs. This repository is the full source code; see [Running from source](#running-from-source) to work on it.

An open source server implementation for **Virtual Magic Kingdom (VMK)**, the Disney virtual world that ran from 2005 to 2008.

The goal is a self-hostable, well-documented server that speaks the original VMK client protocol, so the game can be preserved, studied, and run by anyone.

**Website:** [openvmk.site](https://openvmk.site) · **[Join the Discord](https://discord.gg/WG9ch4exd5)** for discussion, progress updates, and release announcements.

## About VMK

Virtual Magic Kingdom launched in 2005 as part of Disneyland's 50th anniversary celebration. Players explored virtual versions of the Disney parks, collected pins and furniture, decorated their own rooms, and played mini games. Disney shut the servers down on May 21, 2008. The client was Shockwave based, and since the official servers went dark, the game has only lived on through community preservation work.

## What OpenVMK is

- **Faithful.** OpenVMK runs the original VMK client, not a remake. Rooms, furni, clothing, and games come from preserved game files, and the server is rebuilt message by message from what that client sends and expects back.
- **No plugin needed.** VMK's own Lingo scripts (the framework and the game's casts, about 13,800 handlers) are ported to TypeScript and run in a modern browser on a Lingo runtime. It's the same game logic, without Shockwave.
- **Self-hostable and documented.** TypeScript on Node.js with SQLite, so it runs on pretty much any machine. Protocol messages, rooms, and assets are documented as they are worked out.

## Getting Started

You need about **5 GB of free disk space** (a 1.8 GB download that unpacks to about 3 GB).

1. Open the **[latest release](https://github.com/OpenVMK/OpenVMK/releases/latest)** and, under **Assets**, download **`vmk-release.zip`**. Skip the "Source code" archives GitHub adds automatically; they are the unbuilt source (see [Running from source](#running-from-source)), not the ready-to-run game.
2. *(Optional)* Check the download against the **SHA-256** in the release notes:
   - Windows (PowerShell): `Get-FileHash vmk-release.zip`
   - macOS / Linux: `shasum -a 256 vmk-release.zip`
3. **Extract it** to a folder of your choice, such as `Documents\OpenVMK`. The game is about 340,000 small files, so Windows' built-in "Extract All" is very slow. [7-Zip](https://www.7-zip.org/) is much faster, or from a terminal in the download folder:
   - Windows (PowerShell): `tar -xf vmk-release.zip`
   - macOS / Linux: `unzip vmk-release.zip`
4. **Start it** from inside the new `vmk-release` folder:

   | You have | Do this |
   | --- | --- |
   | Windows | Double-click **`Start VMK.bat`**. Nothing to install: the release carries its own Node.js. |
   | macOS / Linux | Install [Node.js](https://nodejs.org/) 22.5 or newer, then run **`sh start.sh`** in a terminal. |
   | Linux, with Docker | Run **`docker compose up -d`**, then open `http://<your-server>:5199`. |

   Windows may warn because the file came from the internet: on *"Windows protected your PC"* click **More info**, then **Run anyway**; on *"Open File – Security Warning"* click **Run**.
5. Wait for **"VMK is running"** (10–30 seconds). Your browser opens `http://127.0.0.1:5199/`. Leave the window open while you play; closing it stops the server.
6. **Create your account. The first account on a new server becomes the admin**, with the staff panel at `/hk`.

**Playing with friends, or hosting on a domain with HTTPS?** The release includes **`SELF-HOSTING.md`**: playing over your network, Docker with automatic HTTPS, running behind your own reverse proxy, every setting, backups, and troubleshooting.

**Updating:** stop the server, extract the new release next to the old one, copy your old **`data`** folder (your accounts, inventories, and rooms) into it, and start the new one.

**Uninstalling:** stop the server and delete the folder. Nothing is installed anywhere else.

## Running from source

For working on OpenVMK. To play or run a server for people, **use the [release](https://github.com/OpenVMK/OpenVMK/releases/latest)**: it is built, optimised (recompressed art, packed casts, bundled servers) and loads much faster.

You need [Node.js](https://nodejs.org/) 22.5 or newer and about 4.5 GB of disk. The clone is large (about a 600 MB download that checks out to about 3 GB and 143,000 files) because it carries the game's extracted art in `client/assets`, exactly as it was extracted.

On Windows, clone into a short path such as `C:\OpenVMK` or `Documents\OpenVMK`: some asset paths are long, and a deeply nested folder can pass Windows' 260-character limit. If checkout fails with "Filename too long", run `git config --global core.longpaths true` and clone again.

```bash
git clone https://github.com/OpenVMK/OpenVMK.git
cd OpenVMK
npm install
npx vite build --config client/vite.config.ts
node start.mjs
```

The game opens at `http://127.0.0.1:5199/`. The first account you create becomes the admin (`/hk`).

**Build before you play.** `client/dist` is not in the repository; the servers serve the built client, and `start.mjs` refuses to start without it. Rebuild after changing anything under `client/src`. The Vite dev server (`npx vite --config client/vite.config.ts`, port 5180) works for quick iteration, but transforms ~13,800 generated modules on first load, so it is slow.

**Optional: cast packs.** The release bundles each cast's bitmaps into one `bitmaps.pack` download. They are derived files and not committed; without them the client batches its requests instead. To build them locally:

```bash
node tools/pack-cast-bitmaps.mjs
```

### Developer tools

These act directly on your local database (`data/vmk.db`), so only someone who can already edit that file can use them:

- `node tools/dev-account.mjs [name] [--new-user | --existing]` creates a password-less test account (default `devtest`) that can only log in with a minted ticket.
- `node tools/mint-ticket.mjs [name] [--new-user | --existing]` issues a 10-minute login ticket for an existing account and prints a client URL that skips the login page. `--new-user` sends it through avatar creation again.
- `node tools/set-admin.mjs <name>` grants staff permissions (`--revoke`, `--list`).

### Re-extracting the game files

`client/assets` was produced from the original Shockwave files (`.dcr` / `.cct`) by `tools/extract-casts.mjs`, using [LibreShockwave](https://github.com/LibreShockwave/LibreShockwave). The originals are not in this repository (they are available on request, see [Game Files](#game-files)). With them in `shockwave/` (or `VMK_SHOCKWAVE` pointing at them) and a LibreShockwave build (see [tools/shockwave/README.md](tools/shockwave/README.md)), `node tools/extract-casts.mjs` regenerates the casts. Re-extracting is only needed when changing the extractor.

## Progress

**Working**

- [x] Accounts, sign-in, and session tickets
- [x] Avatar creation (figure sets, name suggestions, guest room style, EULA)
- [x] Persistence (SQLite): avatars, inventory, credits
- [x] Navigator, public rooms, guest rooms, and room queues (144 room codes mapped)
- [x] Walking, chat, canned chat, emoticons, and avatar actions
- [x] Friends list and messenger
- [x] Shops, furni catalog, buying and selling, credits
- [x] Furniture placement, posters, and guest room editing
- [x] Trading
- [x] Pins, magic, and FastPasses
- [x] Camera, photo album, and photo walls
- [x] Staff admin panel and moderation (kicks, bans, staff alerts)
- [x] Mini games: Pirates of the Caribbean, Haunted Mansion Ghost Chasers, Castle Fireworks Remixed, Jungle Cruise Photo Safari, Street Party Music Game
- [x] TypeScript browser port of the original client: plays in a modern browser, no plugin
- [x] First release on GitHub Releases (October 18, 2026)

**In progress**

- [ ] Mini games: Magic Shop Checkers (the last one)
- [ ] Haunted Mansion public rooms with NPC ghosts
- [ ] Quests and Hidden Mickeys
- [ ] Docker deployment: a Compose setup ships with the release but is still early; reports welcome

**Known issues**

- Some dark-ride scenes draw a few pieces in the wrong order (track over the deck of Hook's ship, the Nursery bed under the floor in Peter Pan's Flight).

## Tech Stack

| Layer | Choice |
| --- | --- |
| Game server | TypeScript / Node.js, speaking VMK's original protocol (100+ client messages handled) |
| Web server | TypeScript / Node.js: serves the client, casts, and texts; accounts; staff panel |
| Database | SQLite |
| Client | TypeScript port of the original Lingo client, running in the browser |
| Reference client | Original Shockwave client, used to verify behavior |
| Deployment | Windows launcher (Node.js bundled), Node.js on macOS / Linux, or Docker Compose |

## Game Files

The release and this repository both include the game files the browser client needs (extracted art, sounds and texts in `client/assets`), so you won't have to track down an archive to run a server.

The original Shockwave files (`.dcr` / `.cct` casts) are not included, but are **available on request** for preservation and research. Ask in the [Discord](https://discord.gg/WG9ch4exd5).

## Roadmap

1. ~~Document the client protocol~~ (ongoing as new areas are restored)
2. ~~Minimum viable server: login, walk into a room, chat~~
3. ~~Persistence layer~~
4. ~~Rooms, furniture, and inventory~~
5. Mini games: five of six done, Checkers in progress
6. ~~First release on GitHub Releases: October 18, 2026~~
7. ~~Publish the full source code~~
8. Quests and Hidden Mickeys
9. Docker packaging

## Community

Discussion, questions, and development chat happen in Discord: **https://discord.gg/WG9ch4exd5**

For bugs and feature requests, use [GitHub Issues](https://github.com/OpenVMK/OpenVMK/issues) so they stay searchable. When reporting a problem with the release, mention your operating system and attach the relevant file from the release's `logs` folder.

## Contributing

Pull requests are welcome. For anything bigger than a fix, say hello in the Discord or open an issue first so work isn't duplicated. Other contributions are just as useful:

- **Game files.** Archived client files, casts, and text files, especially rare or late versions.
- **Research.** Packet captures, protocol notes, screenshots, videos, and recollections of how rooms, items, and games worked.
- **Testing.** Trying the release and reporting what doesn't match the original.

Open an issue or drop into the Discord if you want to get involved.

## Special Thanks

OpenVMK's browser client wouldn't be possible without two open source Shockwave projects:

- **[LibreShockwave](https://github.com/LibreShockwave/LibreShockwave)**: its Director file reader and Lingo decompiler extracted every cast and translated VMK's original Lingo scripts to TypeScript, and its player is the reference for much of how the runtime draws, inks and lays out text.
- **[DirPlayer](https://github.com/igorlira/dirplayer-rs)**: its Director player was the second reference for compositing, colour and Lingo behaviour, and settled many questions where the original's behaviour wasn't obvious.

Years of reverse-engineering Director and Shockwave went into both. Thank you.

## Disclaimer

This project is not affiliated with, endorsed by, or associated with The Walt Disney Company or any of its subsidiaries. Virtual Magic Kingdom, Disney, and all related names and marks are the property of their respective owners.

## License

OpenVMK's own code is licensed under the **GNU Affero General Public License v3.0 or later** ([LICENSE](LICENSE)). If you run a modified OpenVMK server for other people, the AGPL requires you to offer them your modified source.

Parts of the browser runtime (`client/src/lingo`) are ported from [LibreShockwave](https://github.com/LibreShockwave/LibreShockwave) (AGPL-3.0) and [DirPlayer](https://github.com/igorlira/dirplayer-rs) (GPL-3.0); the comments mark where. See [Special Thanks](#special-thanks).

The game content is not covered by this license: the art, sounds and texts in `client/assets` and `assets`, and the original client scripts translated into `client/src/generated*`, remain the property of their respective owners and are included for preservation.
