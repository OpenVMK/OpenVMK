# OpenVMK — Virtual Magic Kingdom Server

> **Status: In active development.** Much of the game already works end to end against the original client. There is no public release yet.

An open source server implementation for **Virtual Magic Kingdom (VMK)**, the Disney virtual world that ran from 2005 to 2008.

The goal is a self-hostable, well-documented server that speaks the original VMK client protocol, so the game can be preserved, studied, and run by anyone.

**Website:** [openvmk.site](https://openvmk.site) · **[Join the Discord](https://discord.gg/WG9ch4exd5)** for discussion, progress updates, and release announcements.

## About VMK

Virtual Magic Kingdom launched in 2005 as part of Disneyland's 50th anniversary celebration. Players explored virtual versions of the Disney parks, collected pins and furniture, decorated their own rooms, and played mini games. Disney shut the servers down on May 21, 2008. The client was Shockwave based, and since the official servers went dark, the game has only lived on through community preservation work.

## What OpenVMK is

- **Faithful.** OpenVMK runs the original VMK client, not a remake. Rooms, furni, clothing, and games come from preserved game files, and the server is rebuilt message by message from what that client sends and expects back.
- **No plugin needed.** VMK's own Lingo scripts (the framework plus all 40 game casts, roughly 5,000 handlers) are ported to TypeScript and run in a modern browser on a Lingo runtime. It's the same game logic, without Shockwave.
- **Self-hostable and documented.** TypeScript on Node.js with SQLite, so it runs on pretty much any machine. Protocol messages, rooms, and assets are documented as they are worked out.

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
- [x] Mini games: Castle Fireworks Remixed, Jungle Cruise Photo Safari, Street Party Music Mixer

**In progress**

- [ ] Mini games: Pirates of the Caribbean, Haunted Mansion
- [ ] TypeScript browser port of the original client
- [ ] Quests and Hidden Mickeys
- [ ] Docker-based deployment
- [ ] Setup documentation and first public release

## Tech Stack

| Layer | Choice |
| --- | --- |
| Game server | TypeScript / Node.js, speaking VMK's original protocol (100+ client messages handled) |
| Web server | TypeScript / Node.js: serves the client, casts, and texts; accounts; staff panel |
| Database | SQLite |
| Client | TypeScript port of the original Lingo client, running in the browser |
| Reference client | Original Shockwave client, used to verify behavior |
| Deployment | Docker (planned) |

## Game Files

The TypeScript browser port ships with the game files it needs, so you won't have to track down an archive to run a server.

The original Shockwave files (`.dcr` / `.cct` casts) are not included, but are **available on request** for preservation and research. Ask in the [Discord](https://discord.gg/WG9ch4exd5).

## Getting Started

Setup instructions will be published with the first release.

```bash
# Coming with the first release
git clone https://github.com/OpenVMK/OpenVMK.git
cd OpenVMK
npm install
npm start
```

All you'll need is Node.js. Docker-based deployment is planned.

## Roadmap

1. ~~Document the client protocol~~ (ongoing as new areas are restored)
2. ~~Minimum viable server: login, walk into a room, chat~~
3. ~~Persistence layer~~
4. ~~Rooms, furniture, and inventory~~
5. Mini games: three done, Pirates and Haunted Mansion in progress
6. TypeScript browser client
7. Docker packaging and setup docs
8. First public release

## Community

Discussion, questions, and development chat happen in Discord: **https://discord.gg/WG9ch4exd5**

For bugs and feature requests, use GitHub Issues so they stay searchable.

## Contributing

Code contributions will open up with the first public release. In the meantime, these are all useful:

- **Game files.** Archived client files, casts, and text files, especially rare or late versions.
- **Research.** Packet captures, protocol notes, screenshots, videos, and recollections of how rooms, items, and games worked.
- **Testing.** Trying development builds and reporting what doesn't match the original.

Open an issue or drop into the Discord if you want to get involved.

## Disclaimer

This project is not affiliated with, endorsed by, or associated with The Walt Disney Company or any of its subsidiaries. Virtual Magic Kingdom, Disney, and all related names and marks are the property of their respective owners.

## License

TBD — will be published with the code.
