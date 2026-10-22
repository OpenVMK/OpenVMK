# Self-hosting VMK

Everything here uses the release download from the GitHub Releases page. There
are three ways to run it:

- [On your own computer](#on-your-own-computer): just you, or you and your network.
- [With Docker](#with-docker): a Linux server, plain HTTP or on your own domain with HTTPS.
- [Behind your own reverse proxy](#behind-your-own-reverse-proxy): nginx or similar, without Docker.

Then: [settings](#settings), [your data](#your-data-backups-and-updates), and
[troubleshooting](#troubleshooting).

## How it fits together

VMK is two servers, both started by the one launcher:

| Port | Server | What it does |
| --- | --- | --- |
| **5199** | web | Login page, the game client, its artwork and data, staff tools at `/hk` |
| **8080** | game | The live game: rooms, chat, trading. The browser connects to it over WebSocket. |

The browser needs to reach **both**. Each player's browser is told where to
find them, so the [`VMK_PUBLIC_*` settings](#settings) matter as soon as you're
on a domain or behind a proxy.

**The first account created becomes the admin.** On a server other people can
reach, create yours before you tell anyone the address.

---

## On your own computer

### Windows

1. Unzip the release somewhere with about 6 GB free.
2. Double-click **`Start VMK.bat`**.
3. Your browser opens `http://127.0.0.1:5199/` once the game is ready (10–30
   seconds). Create an account and play.

Leave the window open while you play; closing it stops the game. The release
carries its own copy of Node.js, so there is nothing to install.

### macOS and Linux

The release's built-in Node.js is the Windows one, so install
**Node.js 22.5 or newer** from [nodejs.org](https://nodejs.org/) (or your
package manager), then:

```bash
sh start.sh
```

Add `--no-browser` if you don't want a browser opened.

### Playing with others on your network

By default VMK only answers your own computer. To let others on your network
join, start it listening on every interface:

```powershell
# Windows (PowerShell), in the release folder
$env:VMK_HOST = "0.0.0.0"; .\node\node.exe start.mjs
```

```bash
# macOS / Linux
VMK_HOST=0.0.0.0 sh start.sh
```

Others then open `http://<your-computer's-IP>:5199`. Allow ports 5199 and 8080
through your firewall. No other setting is needed: each player is pointed back
at the address they typed.

---

## With Docker

The release includes `docker-compose.yml`. It runs the game straight out of the
release folder in the official Node.js image, so there is no image to build and
updating is just replacing the folder.

Requirements: Docker with the Compose plugin (`docker compose version`).

### Plain HTTP

```bash
cd vmk-release
docker compose up -d
```

Open `http://<server-address>:5199`. Logs: `docker compose logs -f`.
Stop: `docker compose down`.

> The container runs as user `1000:1000` so the files it writes in `data/` and
> `logs/` belong to you. If `id -u` says otherwise, copy `.env.example` to
> `.env` and set `VMK_UID` / `VMK_GID`.

### On a domain, with HTTPS

The compose file has an optional **Caddy** front door that gets and renews a
certificate for your domain automatically.

1. Point your domain's DNS (an `A` record, e.g. `vmk.example.com`) at the server.
2. Open ports **80** and **443**.
3. Create `.env` from the example and set:

   ```ini
   VMK_DOMAIN=vmk.example.com
   VMK_PUBLIC_ORIGIN=https://vmk.example.com
   VMK_PUBLIC_GAME_URL=wss://vmk.example.com/game
   VMK_BIND=127.0.0.1
   ```

   `VMK_BIND=127.0.0.1` keeps ports 5199/8080 off the internet, so HTTPS is
   the only way in.

4. Start it with the profile:

   ```bash
   docker compose --profile https up -d
   ```

Players open `https://vmk.example.com`. Caddy serves the site and forwards
`/game` (the game's WebSocket) to the game server.

---

## Behind your own reverse proxy

Run VMK on the server (Docker without the `https` profile, or `sh start.sh`), and
have your proxy forward:

- `/game` and everything under it → `127.0.0.1:8080`, **with WebSocket upgrade**
- everything else → `127.0.0.1:5199`

Then tell VMK its public addresses:

```ini
VMK_PUBLIC_ORIGIN=https://vmk.example.com
VMK_PUBLIC_GAME_URL=wss://vmk.example.com/game
```

nginx example:

```nginx
server {
    listen 443 ssl;
    server_name vmk.example.com;
    # ssl_certificate / ssl_certificate_key ...

    location /game {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_read_timeout 1h;   # game sockets stay open
    }

    location / {
        proxy_pass http://127.0.0.1:5199;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        client_max_body_size 10m;
    }
}
```

Without `VMK_PUBLIC_GAME_URL`, an HTTPS page would try `wss://<host>:8080`,
which the game server can't answer: it doesn't speak TLS itself. Always
route the game socket through the proxy.

Both locations must send `X-Forwarded-For`, or the staff tools show the
proxy's address for every player. See [players' real IPs](#players-real-ips).

---

## Players' real IPs

The staff tools (online users, login history, clone check, trade logs, the
staff log) show each player's IP. Behind a proxy, every connection comes *from
the proxy*, so VMK reads the player's address from the `X-Forwarded-For` header
the proxy adds. It only does this for proxies you trust, because any client
can send that header and would otherwise choose the IP your staff see.

| Setup | What to set |
| --- | --- |
| On your own computer, or plain Docker with no proxy | Nothing. There's no proxy; VMK sees players directly. |
| Docker with the bundled Caddy (`--profile https`) | Nothing. Caddy is trusted by default at its fixed address. |
| Your proxy on the **same machine**, VMK not in Docker | Nothing. Proxies on `127.0.0.1` are trusted by default. |
| Your proxy on the same machine, VMK **in Docker** | `VMK_TRUSTED_PROXIES=loopback,172.30.99.10,172.30.99.1`. Your proxy reaches the container through the Docker gateway. |
| Your proxy on **another machine** | `VMK_TRUSTED_PROXIES=<that machine's IP>`, or its CIDR range. |
| A CDN in front (e.g. Cloudflare) | Its published IP ranges, plus any proxy of yours between it and VMK. |

`VMK_TRUSTED_PROXIES` takes a comma-separated list of IPs and CIDR ranges, and
the shorthands `loopback` and `private` (all private ranges). Prefer exact
addresses over `private`: everything you list can set a player's apparent IP.

**Check it:** log in through your public address, then open `/hk` → Online
Users. Your row should show your own public IP, not `127.0.0.1` or a
`172.x` Docker address. The web server prints its trusted list at startup
(`Proxies:` in `logs/assets.log`).

---

## Settings

Set these as environment variables, or in `.env` for Docker. All are optional.

| Setting | Default | Meaning |
| --- | --- | --- |
| `VMK_PUBLIC_ORIGIN` | the address the player typed | Where players open the game, e.g. `https://vmk.example.com`. Set it whenever a proxy is in front. |
| `VMK_PUBLIC_GAME_URL` | `ws://<same host>:8080` (`wss` on HTTPS) | The game WebSocket as players reach it, e.g. `wss://vmk.example.com/game`. |
| `VMK_HOST` | `127.0.0.1` | Interface the servers listen on. `0.0.0.0` for network access (Docker sets this). |
| `VMK_TRUSTED_PROXIES` | `loopback` (Docker: also its Caddy) | Proxies whose `X-Forwarded-For` is believed, for players' real IPs. See [players' real IPs](#players-real-ips). |
| `VMK_SHOCKWAVE_PORT` | `5199` | Web server port. |
| `VMK_GAME_PORT` | `8080` | Game server port. |
| `VMK_SEASON` | *(none)* | Seasonal decorations: `xmas` or `halloween`. |
| `VMK_CHAT_CENSOR` | `on` | `off` lets chat words outside the dictionary through. |
| `VMK_DATA_DIR` | `./data` | Where the database lives. |

Docker-only (`.env`): `VMK_DOMAIN`, `VMK_BIND`, `VMK_HOST_WEB_PORT`,
`VMK_HOST_GAME_PORT`, `VMK_UID`, `VMK_GID`. See `.env.example`.

> **Changing ports:** if players reach VMK on ports other than 5199/8080 (a
> different `VMK_HOST_*_PORT` mapping, say), set `VMK_PUBLIC_ORIGIN` and
> `VMK_PUBLIC_GAME_URL` to match, so the client is sent to the right place.

---

## Your data, backups and updates

- **Everything lives in `data/vmk.db`**: accounts, inventories, guest rooms,
  messages. Back it up by copying it **while VMK is stopped**.
- **Start over:** stop VMK and delete `data/`. The next account created becomes
  the admin again.
- **Update to a new release:** stop VMK, unzip the new release, copy your old
  `data/` folder (and `.env`, if you made one) into it, start it.
- **Logs** are in `logs/`. The launcher window only shows startup and errors.

---

## Troubleshooting

**"Port 5199 is already in use"**: VMK (or another program) is already running.
Close the other window, or `docker compose down`.

**The page loads but the game stays on a black or loading screen**: the
browser can't reach the game server. Locally, check that port 8080 isn't
blocked. Behind a proxy, check `VMK_PUBLIC_GAME_URL` and that `/game` is
forwarded with WebSocket upgrade. The browser's developer console (F12) shows
the failed WebSocket connection and the address it was trying.

**Other people can't connect**: VMK listens only on your own computer unless
`VMK_HOST=0.0.0.0` is set (Docker sets it for you). Check your firewall for
ports 5199 and 8080.

**A server stopped**: the launcher prints which one and its last output; the
full log is in `logs/assets.log` (web) or `logs/mus-server.log` (game).
