/**
 * The addresses PLAYERS use to reach this server — as opposed to what it binds.
 *
 * The client is told where everything lives by the config it downloads
 * (`external_variables_casts.txt`, `loadingscreens_6`), and those files were
 * written for one machine: `http://127.0.0.1:5199` and a game socket at
 * `127.0.0.1:8080`. Served as-is, every player not sitting at the server's own
 * keyboard is sent to their OWN computer and the game never loads.
 *
 * Two settings decide it, each with a fallback that works without setup:
 *
 *   VMK_PUBLIC_ORIGIN    where players open the game, e.g. https://vmk.example.com
 *                        unset: whatever host the browser used for this request
 *   VMK_PUBLIC_GAME_URL  the game WebSocket, e.g. wss://vmk.example.com/game
 *                        unset: the same host on VMK_GAME_PORT, wss under https
 *
 * Behind a reverse proxy, set both: the proxy's own address is what the
 * browser sees, and only you know which path it forwards to the game server.
 */
import type { IncomingMessage } from "node:http";

const HTTP_PORT = Number(process.env.VMK_SHOCKWAVE_PORT ?? 5199);
const GAME_PORT = Number(process.env.VMK_GAME_PORT ?? 8080);

/** The addresses the config was authored with. */
export const AUTHORED_ORIGIN = "http://127.0.0.1:5199";

/**
 * A Host header we are willing to echo into a config file. It is client
 * input: anything beyond host[:port] could break out of a config line.
 */
const SAFE_HOST = /^(\[[0-9a-f:.]+\]|[a-z0-9.-]+)(:\d{1,5})?$/i;

const trimSlash = (url: string) => url.replace(/\/+$/, "");

export interface PublicUrls {
  /** e.g. `https://vmk.example.com` — no trailing slash. */
  origin: string;
  /** e.g. `wss://vmk.example.com/game`. */
  gameUrl: string;
  /** Host and port of `gameUrl`, for the config's `connection.mus.*` lines. */
  gameHost: string;
  gamePort: number;
}

/**
 * ⚠ Empty counts as unset. docker-compose passes `VMK_PUBLIC_ORIGIN: ${X:-}`
 * through as "" when the .env leaves it blank, and `?? ` would keep that ""
 * and then throw in `new URL("")` on every config request.
 */
const setting = (name: string): string | undefined => process.env[name]?.trim() || undefined;

export function publicUrls(req: IncomingMessage | undefined): PublicUrls {
  const configured = setting("VMK_PUBLIC_ORIGIN");
  const host = req?.headers.host;
  const fallback = `http://127.0.0.1:${HTTP_PORT}`;
  let origin = trimSlash(configured ?? (host && SAFE_HOST.test(host) ? `http://${host}` : fallback));
  let page: URL;
  try {
    page = new URL(origin);
  } catch {
    // SAFE_HOST still passes hosts URL rejects (`a:99999`, `[::::]`); a Host
    // header is client input, so fall back rather than throw mid-request.
    origin = fallback;
    page = new URL(origin);
  }
  const gameUrl = trimSlash(
    setting("VMK_PUBLIC_GAME_URL") ??
      `${page.protocol === "https:" ? "wss" : "ws"}://${page.hostname}:${GAME_PORT}`,
  );
  const game = new URL(gameUrl);
  const gamePort = Number(game.port) || (game.protocol === "wss:" ? 443 : 80);
  return { origin, gameUrl, gameHost: game.hostname, gamePort };
}

/**
 * Point a config file at this server's public addresses.
 *
 * Rewrites the authored `http://127.0.0.1:5199` URLs to the public origin and
 * the game-connection lines to the public game host/port. The client opens the
 * socket from `window.__VMK_GAME_URL` (injected into /play) when it has one —
 * the host/port lines are kept consistent for anything that reads them.
 */
export function withPublicUrls(text: string, urls: PublicUrls): string {
  return text
    .split(AUTHORED_ORIGIN)
    .join(urls.origin)
    .replace(/^(connection\.mus\.host|main\.connection\.ip)=.*$/gm, `$1=${urls.gameHost}`)
    .replace(/^(connection\.mus\.port|main\.connection\.pt)=.*$/gm, `$1=${urls.gamePort}`);
}
