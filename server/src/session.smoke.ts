/**
 * End-to-end check that sessions are per-account and actually isolate users.
 *
 * Runs against a LIVE server:  npx tsx server/src/session.smoke.ts
 * (start it first:             npm run start:http)
 *
 * This exists because "logging in works" is easy to believe from a single
 * happy-path click and easy to get wrong -- a cookie that is ignored, a session
 * that resolves to whoever logged in last, or a ticket that is shared between
 * accounts all look fine when you only ever test one user.
 */
/**
 * ⚠ NO DEFAULT. This test CREATES ACCOUNTS on whatever server it reaches, and
 * it used to default to :5199 — the server you are playing on — so a plain
 * `npm test` wrote two SmokeA_/SmokeB_ users into the real database. Point it
 * at a throwaway server explicitly:
 *
 *   $env:VMK_DB = "<scratch>.db"; $env:VMK_SHOCKWAVE_PORT = "5197"; npm run start:http
 *   $env:VMK_BASE = "http://127.0.0.1:5197"; npx tsx server/src/session.smoke.ts
 */
const BASE = process.env.VMK_BASE ?? "";
if (!BASE) {
  console.log("session.smoke: skipped — set VMK_BASE to a THROWAWAY server (it creates accounts).");
  process.exit(0);
}

let failures = 0;
const check = (label: string, ok: boolean, detail = "") => {
  console.log(`${ok ? "  ok  " : "  FAIL"}  ${label}${detail ? `  — ${detail}` : ""}`);
  if (!ok) failures++;
};

/** A browser-like cookie jar: one per simulated user. */
class Jar {
  private cookies = new Map<string, string>();

  absorb(res: Response): void {
    for (const raw of res.headers.getSetCookie?.() ?? []) {
      const [pair] = raw.split(";");
      const eq = pair.indexOf("=");
      if (eq > 0) {
        this.cookies.set(pair.slice(0, eq).trim(), pair.slice(eq + 1).trim());
      }
    }
  }

  header(): string {
    return [...this.cookies].map(([k, v]) => `${k}=${v}`).join("; ");
  }

  get session(): string | undefined {
    const v = this.cookies.get("vmk_session");
    return v && v.length > 0 ? v : undefined;
  }
}

async function login(jar: Jar, username: string, password: string): Promise<number> {
  const res = await fetch(`${BASE}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", Cookie: jar.header() },
    body: new URLSearchParams({ username, password }),
    redirect: "manual",
  });
  jar.absorb(res);
  return res.status;
}

async function getPlay(jar: Jar): Promise<{ status: number; body: string }> {
  const res = await fetch(`${BASE}/play`, {
    headers: { Cookie: jar.header() },
    redirect: "manual",
  });
  return { status: res.status, body: res.status === 200 ? await res.text() : "" };
}

function bootOf(html: string): { ticket?: string; username?: string } {
  const m = html.match(/window\.__VMK_BOOT = (\{.*?\});/);
  return m ? JSON.parse(m[1]) : {};
}

const stamp = Date.now();
const userA = `SmokeA_${stamp}`;
const userB = `SmokeB_${stamp}`;

console.log(`server: ${BASE}\n`);

// --- no session at all -------------------------------------------------------
const anon = new Jar();
const anonPlay = await getPlay(anon);
check("anonymous /play is refused", anonPlay.status === 302, `status ${anonPlay.status}`);

// --- account A ---------------------------------------------------------------
const jarA = new Jar();
const statusA = await login(jarA, userA, "passwordA");
check("new account A logs in", statusA === 302, `status ${statusA}`);
check("account A got a session cookie", !!jarA.session);

// --- account B, entirely separate jar ----------------------------------------
const jarB = new Jar();
const statusB = await login(jarB, userB, "passwordB");
check("new account B logs in", statusB === 302, `status ${statusB}`);
check("account B got a session cookie", !!jarB.session);
check("A and B have DIFFERENT session tokens", jarA.session !== jarB.session);

// --- each session resolves to its OWN user -----------------------------------
const playA = await getPlay(jarA);
const playB = await getPlay(jarB);
const bootA = bootOf(playA.body);
const bootB = bootOf(playB.body);

check("A reaches /play", playA.status === 200, `status ${playA.status}`);
check("B reaches /play", playB.status === 200, `status ${playB.status}`);
check("A's page identifies A", bootA.username === userA, `got ${bootA.username}`);
check("B's page identifies B", bootB.username === userB, `got ${bootB.username}`);
check("tickets are not shared between accounts", !!bootA.ticket && bootA.ticket !== bootB.ticket);

// --- a second visit keeps the same identity ----------------------------------
const playA2 = await getPlay(jarA);
check("A stays A on a second request", bootOf(playA2.body).username === userA);
check("a fresh ticket is minted per visit", bootOf(playA2.body).ticket !== bootA.ticket);

// --- wrong password must not log in and must not create a second account -----
const jarBad = new Jar();
const badStatus = await login(jarBad, userA, "not-A's-password");
const badPlay = await getPlay(jarBad);
check("wrong password does not grant a session", badPlay.status === 302, `status ${badPlay.status}`);
check("wrong password is a redirect, not a 500", badStatus === 302, `status ${badStatus}`);

// --- logout drops the session ------------------------------------------------
await fetch(`${BASE}/logout`, { headers: { Cookie: jarA.header() }, redirect: "manual" });
const afterLogout = await getPlay(jarA);
check(
  "session still valid for the OLD cookie after logout (server-side delete)",
  afterLogout.status === 302,
  `status ${afterLogout.status}`,
);

console.log(`\n${failures === 0 ? "ALL PASS" : `${failures} FAILURE(S)`}`);
process.exit(failures === 0 ? 0 : 1);
