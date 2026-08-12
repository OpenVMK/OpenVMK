# Virtual Magic Kingdom Server

> **Status: Coming Soon.** This project is in early development. There is no public release yet.

An open source server implementation for **Virtual Magic Kingdom (VMK)**, the Disney virtual world that ran from 2005 to 2008.

The goal is a self hostable, well documented server that speaks the original VMK client protocol, so the game can be preserved, studied, and run by anyone.

**[Join the Discord](https://discord.gg/xgt5chaXS)** for discussion, progress updates, and release announcements.

## About VMK

Virtual Magic Kingdom launched in 2005 as part of Disneyland's 50th anniversary celebration. Players explored virtual versions of the Disney parks, collected pins and furniture, decorated their own rooms, and played mini games. Disney shut the servers down on May 21, 2008. The client was Shockwave based, and since the official servers went dark, the game has only lived on through community preservation work.

## Planned Features

- [ ] Authentication and account management
- [ ] Player state (avatars, inventory, pins, credits)
- [ ] Room hosting, navigation, and guest rooms
- [ ] Chat and messaging
- [ ] Furniture placement and room editing
- [ ] Mini games
- [ ] Friends list and social features
- [ ] Admin tooling and moderation
- [ ] Docker based deployment

## Tech Stack

_To be finalized._

| Layer | Choice |
| --- | --- |
| Server | TBD |
| Database | TBD |
| Client | Original Shockwave client |
| Deployment | Docker (planned) |

## Getting Started

Setup instructions will be published with the first release. Nothing here is runnable yet.

```bash
# Coming soon
git clone https://github.com/OpenVMK/OpenVMK.git
cd OpenVMK
```

## Roadmap

1. Document the client protocol
2. Minimum viable server (login, walk into a room, chat)
3. Persistence layer
4. Rooms, furniture, and inventory
5. Mini games
6. First public release

## Community

Discussion, questions, and development chat happen in Discord: **https://discord.gg/xgt5chaXS**

For bugs and feature requests, use GitHub Issues so they stay searchable.

## Contributing

Contributions are welcome once the initial code lands. Protocol documentation, packet captures, preserved client assets, and testing help are all useful in the meantime. Open an issue or drop into the Discord if you want to get involved early.

## Disclaimer

This project is not affiliated with, endorsed by, or associated with The Walt Disney Company or any of its subsidiaries. Virtual Magic Kingdom, Disney, and all related names and marks are the property of their respective owners.

## License

TBD
