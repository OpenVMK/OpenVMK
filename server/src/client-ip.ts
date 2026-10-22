/**
 * The player's real IP address, for the staff tools: online users, the login
 * log, clone check, trade logs, the staff audit.
 *
 * Behind a reverse proxy every connection comes FROM the proxy, so the socket
 * address alone shows one IP for everyone. The proxy reports the real one in
 * `X-Forwarded-For` — but that header is just text, and a player can send their
 * own. So it is believed only when the connection comes from a proxy you trust:
 *
 *   VMK_TRUSTED_PROXIES   comma-separated IPs, CIDR ranges, or the keywords
 *                         `loopback` (127.0.0.0/8, ::1) and `private`
 *                         (10/8, 172.16/12, 192.168/16, fc00::/7).
 *                         Default: `loopback` — a proxy on the same machine.
 *
 * ⚠ The header is read RIGHT TO LEFT, skipping trusted hops. Each proxy
 * APPENDS the address it saw, so the rightmost untrusted entry is the first one
 * a trusted proxy vouched for. The LEFTMOST entry is whatever the client typed:
 * taking it (as hk.ts used to) lets anyone choose the IP the staff see.
 */
import { BlockList, isIP } from "node:net";
import type { IncomingHttpHeaders } from "node:http";

/** `host:port`, `[v6]:port`, `::ffff:1.2.3.4` -> the bare address. */
export function bareIp(address: string | undefined): string {
  if (!address) return "";
  let ip = address.trim();
  const bracketed = /^\[([^\]]+)\](?::\d+)?$/.exec(ip);
  if (bracketed) ip = bracketed[1];
  else if ((ip.match(/:/g) ?? []).length === 1) ip = ip.slice(0, ip.lastIndexOf(":"));
  return ip.replace(/^::ffff:/i, "");
}

function buildTrusted(spec: string): BlockList {
  const list = new BlockList();
  const add = (entry: string) => {
    const [address, prefix] = entry.split("/");
    const family = isIP(address) === 6 ? "ipv6" : isIP(address) === 4 ? "ipv4" : null;
    if (!family) {
      console.warn(`[client-ip] VMK_TRUSTED_PROXIES: ignoring "${entry}" (not an IP or CIDR)`);
      return;
    }
    if (prefix === undefined) list.addAddress(address, family);
    else list.addSubnet(address, Number(prefix), family);
  };
  for (const raw of spec.split(",")) {
    const entry = raw.trim().toLowerCase();
    if (!entry) continue;
    if (entry === "loopback") ["127.0.0.0/8", "::1/128"].forEach(add);
    else if (entry === "private") ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16", "fc00::/7", "127.0.0.0/8", "::1/128"].forEach(add);
    else add(entry);
  }
  return list;
}

/** `||`, not `??`: docker-compose passes an unset value as "". */
const TRUSTED_SPEC = process.env.VMK_TRUSTED_PROXIES?.trim() || "loopback";
const trusted = buildTrusted(TRUSTED_SPEC);

export function trustedProxies(): string {
  return TRUSTED_SPEC;
}

const isTrusted = (ip: string): boolean => {
  const family = isIP(ip);
  return family !== 0 && trusted.check(ip, family === 6 ? "ipv6" : "ipv4");
};

/**
 * The client's IP for a connection from `socketAddress` carrying `headers`.
 * Works for both servers: the web server's requests and the game server's
 * WebSocket upgrade both have the proxy's headers.
 */
export function clientIp(socketAddress: string | undefined, headers: IncomingHttpHeaders | Record<string, string | undefined>): string {
  const direct = bareIp(socketAddress);
  if (!isTrusted(direct)) return direct;
  const header = headers["x-forwarded-for"];
  const chain = String(Array.isArray(header) ? header.join(",") : (header ?? ""))
    .split(",")
    .map((hop) => bareIp(hop))
    .filter((hop) => isIP(hop) !== 0);
  for (let i = chain.length - 1; i >= 0; i--) {
    if (!isTrusted(chain[i])) return chain[i];
  }
  // Every hop trusted (or no header): the earliest one we were told of, else
  // the proxy itself. `X-Real-IP` covers proxies configured to send only that.
  const realIp = bareIp(String(headers["x-real-ip"] ?? ""));
  return chain[0] ?? (isIP(realIp) ? realIp : direct);
}

/** `ip:port` for the game server's connection labels, `[v6]:port` for IPv6. */
export function remoteLabel(ip: string, port: number | undefined): string {
  return isIP(ip) === 6 ? `[${ip}]:${port ?? 0}` : `${ip}:${port ?? 0}`;
}
