import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");
const SHOCKWAVE = process.env.VMK_SHOCKWAVE ?? join(ROOT, "shockwave");
/** Optional message-schema text file to cross-reference; skipped when unset. */
const PROTOCOL_SCHEMA = process.env.VMK_PROTOCOL_SCHEMA;
const OUT = join(ROOT, "docs", "original-client-spec", "protocol-inventory.json");

interface MessageDef {
  name: string;
  direction: "client" | "server" | "shared";
}

function parseSchema(content: string): MessageDef[] {
  const messages: MessageDef[] = [];
  const blocks = content.split(/^=== /m).slice(1);
  for (const block of blocks) {
    const headerEnd = block.indexOf(" ===");
    if (headerEnd < 0) continue;
    const file = block.slice(0, headerEnd);
    const direction = file.includes("/client/") ? "client" : file.includes("/server/") ? "server" : "shared";
    const body = block.slice(headerEnd + 4);
    const msgMatches = body.matchAll(/message\s+(\w+)\s*\{/g);
    for (const m of msgMatches) {
      messages.push({ name: m[1], direction });
    }
  }
  return messages;
}

function extractDcrMessageHints(buffer: Buffer): string[] {
  const strings = new Set<string>();
  let current = "";
  for (let i = 0; i < buffer.length; i++) {
    const b = buffer[i];
    if (b >= 0x20 && b <= 0x7e) {
      current += String.fromCharCode(b);
    } else {
      if (/^(Client|Server)[A-Z]\w+$/.test(current)) strings.add(current);
      current = "";
    }
  }
  return [...strings].sort();
}

const dcrPath = join(SHOCKWAVE, "vmk_8.dcr");
const dcrHints = existsSync(dcrPath) ? extractDcrMessageHints(readFileSync(dcrPath)) : [];

let schemaMessages: MessageDef[] = [];
if (PROTOCOL_SCHEMA && existsSync(PROTOCOL_SCHEMA)) {
  schemaMessages = parseSchema(readFileSync(PROTOCOL_SCHEMA, "utf8"));
}

const inventory = {
  generatedAt: new Date().toISOString(),
  dcrMessageHints: dcrHints,
  schemaMessageCount: schemaMessages.length,
  clientMessages: [...new Set(schemaMessages.filter((m) => m.direction === "client").map((m) => m.name))],
  serverMessages: [...new Set(schemaMessages.filter((m) => m.direction === "server").map((m) => m.name))],
  overlap: dcrHints.filter((h) => schemaMessages.some((m) => m.name === h)),
  wireFormat: {
    envelope: "[channel byte][0x5A magic][message type varint][protobuf body]",
    mvpTransport: "JSON WebSocket messages with type + payload (see @vmk/shared WireMessage)",
  },
  coreConstants: { tileSize: 24, walkMsPerTile: 400, directionCount: 8 },
};

mkdirSync(dirname(OUT), { recursive: true });
mkdirSync(join(ROOT, "packages", "shared", "src"), { recursive: true });
writeFileSync(OUT, JSON.stringify(inventory, null, 2));
writeFileSync(
  join(ROOT, "packages", "shared", "src", "protocol-messages.json"),
  JSON.stringify({ client: inventory.clientMessages, server: inventory.serverMessages }, null, 2),
);

console.log(`Protocol inventory: ${schemaMessages.length} schema messages, ${dcrHints.length} DCR hints`);
console.log(`Overlap: ${inventory.overlap.length} names found in both`);
