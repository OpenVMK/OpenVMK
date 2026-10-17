# OpenVMK — Virtual Magic Kingdom Server

> **First release: October 18, 2026** on [GitHub Releases](https://github.com/OpenVMK/OpenVMK/releases). **[Download the latest release](https://github.com/OpenVMK/OpenVMK/releases/latest)**, unzip it, and start it — no plugin, no installs. It's a GitHub Release for now: the full source code will be published here once it's been cleaned up.

An open source server implementation for **Virtual Magic Kingdom (VMK)**, the Disney virtual world that ran from 2005 to 2008.

The goal is a self-hostable, well-documented server that speaks the original VMK client protocol, so the game can be preserved, studied, and run by anyone.

**Website:** [openvmk.site](https://openvmk.site) · **[Join the Discord](https://discord.gg/WG9ch4exd5)** for discussion, progress updates, and release announcements.

## About VMK

Virtual Magic Kingdom launched in 2005 as part of Disneyland's 50th anniversary celebration. Players explored virtual versions of the Disney parks, collected pins and furniture, decorated their own rooms, and played mini games. Disney shut the servers down on May 21, 2008. The client was Shockwave based, and since the official servers went dark, the game has only lived on through community preservation work.

## What OpenVMK is

- **Faithful.** OpenVMK runs the original VMK client, not a remake. Rooms, furni, clothing, and games come from preserved game files, and the server is rebuilt message by message from what that client sends and expects back.
- **No plugin needed.** VMK's own Lingo scripts (the framework plus all 40 game casts, roughly 5,000 handlers) are ported to TypeScript and run in a modern browser on a Lingo runtime. It's the same game logic, without Shockwave.
- **Self-hostable and documented.** TypeScript on Node.js with SQLite, so it runs on pretty much any machine. Protocol messages, rooms, and assets are documented as they are worked out.

## Getting Started

You need about **6 GB of free disk space** (a 1.9 GB download that unpacks to 5.2 GB).

1. Open the **[latest release](https://github.com/OpenVMK/OpenVMK/releases/latest)** and, under **Assets**, download **`vmk-release.zip`**. Skip the "Source code" archives GitHub adds automatically; they don't contain the game.
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
- [ ] Publish the full source code once it's cleaned up
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

The release ships with the game files the browser client needs, so you won't have to track down an archive to run a server.

The original Shockwave files (`.dcr` / `.cct` casts) are not included, but are **available on request** for preservation and research. Ask in the [Discord](https://discord.gg/WG9ch4exd5).

## Roadmap

1. ~~Document the client protocol~~ (ongoing as new areas are restored)
2. ~~Minimum viable server: login, walk into a room, chat~~
3. ~~Persistence layer~~
4. ~~Rooms, furniture, and inventory~~
5. Mini games: five of six done, Checkers in progress
6. ~~First release on GitHub Releases: October 18, 2026~~
7. Publish the full source code once it's cleaned up
8. Quests and Hidden Mickeys
9. Docker packaging

## Community

Discussion, questions, and development chat happen in Discord: **https://discord.gg/WG9ch4exd5**

For bugs and feature requests, use [GitHub Issues](https://github.com/OpenVMK/OpenVMK/issues) so they stay searchable. When reporting a problem with the release, mention your operating system and attach the relevant file from the release's `logs` folder.

## Contributing

Code contributions will open up once the source code is published. In the meantime, these are all useful:

- **Game files.** Archived client files, casts, and text files, especially rare or late versions.
- **Research.** Packet captures, protocol notes, screenshots, videos, and recollections of how rooms, items, and games worked.
- **Testing.** Trying the release and reporting what doesn't match the original.

Open an issue or drop into the Discord if you want to get involved.

## Disclaimer

This project is not affiliated with, endorsed by, or associated with The Walt Disney Company or any of its subsidiaries. Virtual Magic Kingdom, Disney, and all related names and marks are the property of their respective owners.

## License

TBD — will be published with the source code.
