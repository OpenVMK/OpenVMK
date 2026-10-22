/**
 * Synthesize a minimal GetSec external cast (.cct) for the VMK client.
 *
 * CInit loads loading.php into castLib(3) and expects member("CSpecialScript")
 * with handlers/tCode returning three secrets. See GetSecCastBuilder.cpp.
 */
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Resolved from the REPO ROOT, not relative to this file.
//
// This used to be `../shockwave/...`, which worked only while the file lived in
// tools/src/. The builder is a LibreShockwave build artifact and stays under
// tools/, so anchor to the root and walk down explicitly -- otherwise moving
// this file silently breaks GetSec, and the symptom is a session that fails to
// authenticate rather than a missing-file error.
const TOOL_REL = path.join(
  "tools",
  "shockwave",
  "LibreShockwave",
  "cmake-build-native",
  "cpp",
  "libreshockwave_getsec_cast.exe",
);

function repoRoot(): string {
  // this file is <root>/server/src/getsec-cast.ts
  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
}

function toolPath(): string {
  return path.join(repoRoot(), TOOL_REL);
}

export interface GetSecSecrets {
  code1: string;
  code2: string;
  code3: string;
}

/** Derive dev stub secrets from the login ticket (sw1). */
export function secretsFromTicket(ticket: string): GetSecSecrets {
  const md5 = (s: string) => createHash("md5").update(s).digest("hex");
  return {
    code1: ticket,
    code2: md5(`${ticket}:sec2`),
    // m_sSecretCode3 seeds cast.entry.N MD5 paths in Core_Thread_Class
    code3: md5(`${ticket}:sec3`),
  };
}

let cachedBinary: Buffer | null = null;
let cachedKey = "";

/**
 * Build (or return cached) GetSec cast bytes.
 * Falls back to spawning the native builder; set VMK_GETSEC_CAST_PATH to override.
 */
export function buildGetSecCast(secrets: GetSecSecrets): Buffer {
  const key = `${secrets.code1}\0${secrets.code2}\0${secrets.code3}`;
  if (cachedBinary && cachedKey === key) return cachedBinary;

  const exe = process.env.VMK_GETSEC_CAST_PATH ?? toolPath();
  if (!fs.existsSync(exe)) {
    throw new Error(
      `GetSec cast builder not found at ${exe}. Run: npm run tools:shockwave:build-getsec-cast`,
    );
  }

  const result = spawnSync(exe, [secrets.code1, secrets.code2, secrets.code3], {
    encoding: "buffer",
    maxBuffer: 16 * 1024 * 1024,
    windowsHide: true,
  });

  if (result.error) throw result.error;
  if (result.status !== 0) {
    const err = result.stderr?.toString("utf8") ?? "";
    throw new Error(`GetSec cast builder failed (${result.status}): ${err}`);
  }
  if (!result.stdout?.length) {
    throw new Error("GetSec cast builder returned empty output");
  }

  cachedKey = key;
  cachedBinary = result.stdout;
  return cachedBinary;
}
