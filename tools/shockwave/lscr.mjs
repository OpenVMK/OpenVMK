/**
 * Minimal reader for Director `Lscr` (compiled Lingo script) chunks.
 *
 * Only what a patcher needs: the handler table, so a handler can be found by
 * name and its bytecode located. Field offsets are the ones
 * `patch-bytecode.mjs` established against real data:
 *
 *   u16 @72   handler count
 *   i32 @74   handler table offset
 *   record    46 bytes: u16 nameId, .., i32 bytecodeLength @+4,
 *             i32 bytecodeOffset @+8, i32 argOffset @+14,
 *             i32 localOffset @+20, i32 globalsNameOffset @+26,
 *             i32 lineOffset @+38
 *
 * ⚠ `+30`, `+34` and `+42` are NOT chunk offsets — see the note in
 * patch-bytecode.mjs. Shifting them corrupts the script.
 *
 * ⚠ EVERYTHING HERE IS BIG-ENDIAN, even inside an Afterburner cast whose
 * container framing is little-endian. Director splits it that way: the
 * structural chunks (KEY*, imap, mmap) follow the file's byte order, while the
 * Lingo chunks stay big-endian regardless. Verified on core.old.cct — Lnam
 * decodes to 1773 names consuming the chunk exactly at BE and to garbage at LE,
 * and 72 of 73 Lscr headers validate at BE against 0 at LE.
 */

export const HANDLER_RECORD = 46;

/** Names live in a separate `Lnam` chunk: count, then length-prefixed strings. */
export function parseNames(lnam) {
  const names = [];
  // Header is 20 bytes; the last u16 pair is the count, then the strings.
  const count = lnam.readUInt16BE(18);
  let at = 20;
  for (let i = 0; i < count && at < lnam.length; i++) {
    const len = lnam[at];
    names.push(lnam.toString("latin1", at + 1, at + 1 + len));
    at += 1 + len;
  }
  return names;
}

export function parseHandlers(lscr) {
  const count = lscr.readUInt16BE(72);
  const tableAt = lscr.readInt32BE(74);
  const handlers = [];
  for (let i = 0; i < count; i++) {
    const at = tableAt + i * HANDLER_RECORD;
    if (at + HANDLER_RECORD > lscr.length) break;
    handlers.push({
      index: i,
      recordAt: at,
      nameId: lscr.readUInt16BE(at),
      bytecodeLength: lscr.readInt32BE(at + 4),
      bytecodeOffset: lscr.readInt32BE(at + 8),
    });
  }
  return handlers;
}

/** Hex dump a byte range, for eyeballing an instruction sequence. */
export function hex(buf, from, len) {
  return [...buf.subarray(from, from + len)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(" ");
}
