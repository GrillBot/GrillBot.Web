# GrillBot - Web

Repository for all web applications in the GrillBot infrastructure.

- [AdminWeb](https://github.com/GrillBot/GrillBot.Web/tree/master/src/AdminWeb)
- [KarmaWeb](https://github.com/GrillBot/GrillBot.Web/tree/master/src/KarmaWeb)
- [PrivateAdmin](https://github.com/GrillBot/GrillBot.Web/tree/master/src/PrivateAdmin)
- [PublicAdmin](https://github.com/GrillBot/GrillBot.Web/tree/master/src/PublicAdmin)

## Docker

Exists only one name of image `ghcr.io/grillbot/grillbot.web` and webs are divided by tags.

- AdminWeb - `ghcr.io/grillbot/grillbot.web:admin_web`
- KarmaWeb - `ghcr.io/grillbot/grillbot.web:karma`
- PrivateAdmin - `ghcr.io/grillbot/grillbot.web:private_admin`
- PublicAdmin - `ghcr.io/grillbot/grillbot.web:public_admin`

## Licence

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

This repository is released under the [MIT License](LICENSE), with one exception:
[`src/KarmaWeb`](src/KarmaWeb) is licensed under `GPL-3.0-only`, because it is derived
in part from Rubbergod. Contributions are accepted under the licence of the directory
they change, see [CONTRIBUTING.md](CONTRIBUTING.md). Attribution for third-party
material is in [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md).
