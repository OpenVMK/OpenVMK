/**
 * Session + ticket plumbing shared by the login page, the client embed and the
 * dev player page.
 *
 * The important rule: **a ticket is minted only here, and only for a user who
 * has authenticated.** Before this existed, `/client` minted its own ticket for
 * a hardcoded `userId: 1`, which meant a ticket proved nothing. Everything that
 * needs one now goes through `issueTicketFor()`.
 */
import type { IncomingMessage, ServerResponse } from "node:http";
import {
  createSession,
  createTicket,
  getUserBySession,
  loginOrCreate,
  type User,
} from "./db.js";
import { bridgeSecret } from "./staff-db.js";

export const SESSION_COOKIE = "vmk_session";

/** Dev-only surfaces (the debug player, /dev/*) are gated on this. */
export const DEV_MODE = process.env.VMK_DEV === "1";

export function parseCookies(req: IncomingMessage): Record<string, string> {
  const header = req.headers.cookie;
  if (!header) {
    return {};
  }
  const out: Record<string, string> = {};
  for (const part of header.split(";")) {
    const eq = part.indexOf("=");
    if (eq < 0) {
      continue;
    }
    const raw = part.slice(eq + 1).trim();
    // A broken `%` escape throws, and the cookie header is the client's to
    // send: keep such a value as-is rather than let one request kill the server.
    try {
      out[part.slice(0, eq).trim()] = decodeURIComponent(raw);
    } catch {
      out[part.slice(0, eq).trim()] = raw;
    }
  }
  return out;
}

export function currentUser(req: IncomingMessage): User | undefined {
  return getUserBySession(parseCookies(req)[SESSION_COOKIE]);
}

export function setSessionCookie(res: ServerResponse, token: string): void {
  // httpOnly so page scripts cannot read it; SameSite=Lax so the redirect from
  // the login POST still carries it. Not Secure -- this runs over plain http on
  // localhost; add it behind TLS before exposing the server to a network.
  res.setHeader(
    "Set-Cookie",
    `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${
      60 * 60 * 24 * 7
    }`,
  );
}

export function clearSessionCookie(res: ServerResponse): void {
  res.setHeader("Set-Cookie", `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
}

export interface AuthOutcome {
  user: User;
  created: boolean;
  token: string;
}

/**
 * The login page's behaviour: unknown username creates the account, known
 * username verifies the password. Returns undefined only for a bad password.
 */
export function authenticate(username: string, password: string): AuthOutcome | undefined {
  const result = loginOrCreate(username, password);
  if (!result) {
    return undefined;
  }
  return { user: result.user, created: result.created, token: createSession(result.user.id) };
}

/**
 * Mint a ticket for an authenticated user and register it with the MUS server
 * so the socket side can resolve it at login.
 *
 * The registration call is best-effort: the ticket is already durable in the
 * database, so a MUS server that is down (or restarts) does not invalidate it.
 */
export async function issueTicketFor(user: User, gameServer: string): Promise<string> {
  const ticket = createTicket(user.id);
  try {
    const response = await fetch(`${gameServer}/dev/register`, {
      method: "POST",
      // The game server takes registrations from this server only.
      headers: { "Content-Type": "application/json", "X-HK-Secret": bridgeSecret() },
      body: JSON.stringify({
        userId: user.id,
        ticket,
        loginName: user.character_name ?? user.username,
      }),
    });
    if (!response.ok) {
      console.warn(`[auth] MUS ticket registration returned ${response.status}`);
    }
  } catch {
    console.warn(
      `[auth] could not reach the MUS server at ${gameServer} to register a ticket — ` +
        `the client will fail at login until it is running`,
    );
  }
  return ticket;
}

export function redirect(res: ServerResponse, location: string): void {
  res.writeHead(302, { Location: location });
  res.end();
}

export function readFormBody(req: IncomingMessage, limitBytes = 8 * 1024): Promise<URLSearchParams> {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => {
      size += chunk.length;
      if (size > limitBytes) {
        reject(new Error("body too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(new URLSearchParams(Buffer.concat(chunks).toString("utf8"))));
    req.on("error", reject);
  });
}
