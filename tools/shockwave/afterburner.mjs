/**
 * Read and rewrite Director "Afterburner" casts (.cct with XFIR/CDGF).
 *
 * Layout, for whoever comes next:
 *
 *   "XFIR" <len32le> "CDGF"          header; XFIR = RIFX stored little-endian
 *   "Fver" <varint len> ...          version block
 *   "Fcdr" <varint len> ...          compression-type GUID table (zlib'd)
 *   "ABMP" <varint len> ...          the MAP, itself zlib-compressed
 *   "FGEI" <varint len>              marker; every chunk's bytes follow it
 *
 * ABMP, once inflated, is a run of base-128 varints:
 *   <version> <mapLength> <entryCount> then per entry:
 *   <resourceId> <offset> <compressedLen> <decompressedLen> <compressionType>
 *   <fourcc as 4 raw bytes>
 *
 * `offset` is relative to the first byte after the FGEI header. A chunk with
 * compressedLen == decompressedLen is stored raw; otherwise it is zlib.
 *
 * ⚠ Rewriting one chunk shifts every later offset, so the ABMP must be rebuilt
 * and re-deflated as a unit. Its own varints can change width when a value
 * crosses a 7-bit boundary, which changes the ABMP's length, which changes
 * where FGEI starts — so `write` recomputes the whole file rather than patching
 * bytes in place.
 */
import { deflateSync, inflateSync } from "node:zlib";

/**
 * ⚠ Fourccs are stored BYTE-REVERSED in an XFIR file — the header literally
 * reads "XFIR"/"CDGF" for RIFX/FGDC, and the block tags follow the same rule
 * ("revF", "rdcF", "PMBA", "IEGF"). Reading them forwards finds nothing, which
 * looks exactly like a missing chunk.
 */
const FOURCC = (buf, off) =>
  buf.toString("latin1", off, off + 4).split("").reverse().join("");
const fourccBytes = (tag) => Buffer.from(tag.split("").reverse().join(""), "latin1");

/** Base-128 varint, high bit = "more bytes follow". Big-endian order. */
function readVarint(buf, off) {
  let value = 0;
  let n = 0;
  for (;;) {
    const byte = buf[off + n];
    if (byte === undefined) throw new Error(`varint ran off the end at ${off}`);
    value = (value << 7) | (byte & 0x7f);
    n++;
    if ((byte & 0x80) === 0) break;
    if (n > 5) throw new Error(`varint too long at ${off}`);
  }
  return { value, next: off + n };
}

function writeVarint(value) {
  const out = [value & 0x7f];
  let v = value >>> 7;
  while (v > 0) {
    out.unshift((v & 0x7f) | 0x80);
    v >>>= 7;
  }
  return Buffer.from(out);
}

/**
 * Parse a cast into its header blocks and chunk table.
 *
 * Returns `{ blocks, entries, payload }` where `blocks` are the raw pre-ABMP
 * sections we pass through untouched, `entries` is the decoded map, and
 * `payload` is everything after the FGEI header.
 */
export function read(buf) {
  // Logical names, since FOURCC un-reverses: on disk these read XFIR/CDGF.
  if (FOURCC(buf, 0) !== "RIFX" || FOURCC(buf, 8) !== "FGDC") {
    throw new Error(`not an afterburner cast: ${FOURCC(buf, 0)}/${FOURCC(buf, 8)}`);
  }
  let off = 12;
  const blocks = [];
  let abmp = null;
  let payloadStart = null;

  while (off < buf.length) {
    const tag = FOURCC(buf, off);
    if (tag === "FGEI") {
      // ⚠ FGEI DOES carry a varint before the payload, and missing it puts
      // every chunk offset out by one — which is silent, because the container
      // still round-trips (the stray byte just rides along at the head of the
      // payload) while not one chunk will inflate. Measured on the catalogue
      // cast: the bytes are `IEGF 00 78 da …`, and the ILS only decodes to its
      // stated 63995 with that `00` consumed.
      const fgei = readVarint(buf, off + 4);
      blocks.push({
        tag,
        header: buf.subarray(off, off + 4),
        body: Buffer.alloc(0),
        fgeiPrefix: fgei.value,
      });
      payloadStart = fgei.next;
      break;
    }
    const { value: len, next } = readVarint(buf, off + 4);
    const body = buf.subarray(next, next + len);
    if (tag === "ABMP") abmp = { at: off, len, body };
    blocks.push({ tag, header: buf.subarray(off, off + 4), body, lenAt: off + 4 });
    off = next + len;
  }
  if (!abmp) throw new Error("no ABMP chunk");
  if (payloadStart === null) throw new Error("no FGEI chunk");

  // The ABMP body begins with its own compression fields before the zlib data.
  let p = 0;
  const a1 = readVarint(abmp.body, p);
  p = a1.next;
  const a2 = readVarint(abmp.body, p);
  p = a2.next;
  const map = inflateSync(abmp.body.subarray(p));

  let m = 0;
  const version = readVarint(map, m);
  m = version.next;
  const mapLength = readVarint(map, m);
  m = mapLength.next;
  const count = readVarint(map, m);
  m = count.next;

  const entries = [];
  for (let i = 0; i < count.value; i++) {
    const resId = readVarint(map, m);
    const offset = readVarint(map, resId.next);
    const compLen = readVarint(map, offset.next);
    const decompLen = readVarint(map, compLen.next);
    const compType = readVarint(map, decompLen.next);
    m = compType.next;
    const tag = FOURCC(map, m);
    m += 4;
    entries.push({
      resId: resId.value,
      offset: offset.value,
      compLen: compLen.value,
      decompLen: decompLen.value,
      compType: compType.value,
      tag,
    });
  }

  const cast = {
    blocks,
    abmpPrefix: [a1.value, a2.value],
    mapHeader: [version.value, mapLength.value],
    entries,
    payload: buf.subarray(payloadStart),
    // Kept so an unmodified cast can be re-emitted byte-for-byte — see `write`.
    abmpRaw: abmp.body,
    abmpMap: map,
    ilsData: null,
  };

  /**
   * ⚠ MOST CHUNKS ARE NOT IN THE PAYLOAD. An entry with `offset === -1` lives
   * inside the "initial load segment" — the one `ILS ` chunk — where the small
   * chunks (Lnam, Lscr, CASt, …) are packed end to end in map order. On
   * core.old.cct that is 161 of the entries against a 110 KB payload.
   *
   * Without this, every script and name table reads as an empty or truncated
   * buffer, which looks like a parse bug in whatever is asking rather than a
   * chunk that simply is not there.
   */
  const ils = entries.find((e) => e.tag === "ILS ");
  if (ils && ils.offset >= 0) {
    try {
      cast.ilsData = chunkData(cast, ils);
      // ⚠ The ILS is SELF-DESCRIBING and NOT in map order. Each chunk is
      // preceded by a varint naming its RESOURCE ID; the length then comes from
      // that resource's map entry (its COMPRESSED size — a chunk can still be
      // deflated inside the ILS).
      //
      // Walking it in map order instead — pairing each varint with the next
      // entry — puts every id after the first against the wrong chunk, which
      // reads as plausible garbage rather than an error. That is what made the
      // script headers unparseable at every offset and endianness.
      const byResId = new Map(entries.map((e) => [e.resId, e]));
      let at = 0;
      while (at < cast.ilsData.length) {
        const id = readVarint(cast.ilsData, at);
        const entry = byResId.get(id.value);
        if (!entry) break;
        entry.ilsAt = id.next;
        at = id.next + entry.compLen;
      }
    } catch {
      cast.ilsData = null; // leave the entries unresolved rather than guess
    }
  }
  return cast;
}

/**
 * Inflate one chunk's bytes.
 *
 * ⚠ Equal lengths mean stored-raw, but UNEQUAL lengths do not guarantee zlib —
 * `Fcdr` lists the compression types a cast uses and not all of them are
 * deflate. Rather than throw on the others, hand back the raw bytes: a caller
 * comparing or copying chunks then still works, and only a caller that needs
 * the decoded contents has to care.
 */
export function chunkData(cast, entry) {
  // ILS-resident: the bytes are inside the initial load segment, not the
  // payload. ⚠ They are sliced by COMPRESSED length and can still be deflated
  // in there — being inside the ILS is about load timing, not storage.
  if (entry.offset === -1) {
    if (!cast.ilsData) throw new Error(`chunk ${entry.tag}/${entry.resId} is in an unread ILS`);
    // A map slot can be free: null fourcc, zero length, and no bytes in the
    // ILS stream at all (measured: 4 of 719 on one overlay cast). That is not a
    // parse failure — it has no content — so hand back an empty buffer. Any
    // OTHER unlocated entry means the walk really did go wrong, so still throw.
    if (entry.ilsAt === undefined) {
      if (entry.compLen === 0) return Buffer.alloc(0);
      throw new Error(`chunk ${entry.tag}/${entry.resId} was not named by the ILS`);
    }
    const raw = Buffer.from(cast.ilsData.subarray(entry.ilsAt, entry.ilsAt + entry.compLen));
    if (entry.compLen === entry.decompLen) return raw;
    try {
      return inflateSync(raw);
    } catch {
      return raw;
    }
  }
  const raw = Buffer.from(cast.payload.subarray(entry.offset, entry.offset + entry.compLen));
  if (entry.compLen === entry.decompLen) return raw;
  try {
    return inflateSync(raw);
  } catch {
    return raw;
  }
}

/**
 * Rebuild a cast with `replacements` (resId -> new decompressed Buffer) and
 * optional `additions`: NEW chunks, each `{ resId, tag, data, ils, compType,
 * deflate }`. An `ils` addition is packed into the initial load segment (where
 * a cast keeps its CASt headers); any other goes in the payload, deflated when
 * `deflate` is set and stored raw otherwise. `compType` indexes the Fcdr table
 * (0 = zlib; a JPEG `ediM` uses 1 and is stored raw).
 *
 * Every chunk is re-emitted in map order so offsets stay monotonic; anything
 * not replaced is copied through in its ORIGINAL compressed form, so untouched
 * chunks are byte-identical and only what we edited can differ. Additions go
 * after the existing entries, so give them ids above every existing one.
 *
 * ⚠ Adding a chunk only puts its bytes in the file. Nothing loads a member
 * until KEY* links its children to it and CAS* gives it a slot; the caller
 * rewrites those two as replacements.
 */
export function write(cast, replacements, additions = []) {
  // ⚠ Nothing to change means change NOTHING. The original payload is not
  // tightly packed — chunks sit at the offsets the map states, with small gaps
  // between them (measured: 9 bytes across item_41.cct). Repacking is perfectly
  // valid, since every offset is explicit, but it makes an untouched cast
  // differ from its source, which would mask real regressions in the walk.
  if (replacements.size === 0 && additions.length === 0) {
    return rebuild(cast, cast.entries, cast.payload, cast.abmpRaw);
  }
  const taken = new Set(cast.entries.map((e) => e.resId));
  for (const add of additions) {
    if (taken.has(add.resId)) throw new Error(`chunk id ${add.resId} already exists`);
    taken.add(add.resId);
  }
  const ilsAdds = additions.filter((a) => a.ils);
  const payloadAdds = additions.filter((a) => !a.ils);

  // ⚠ A replacement aimed at an ILS-RESIDENT chunk is rewritten into a
  // replacement of the ILS itself, because that is the only chunk the payload
  // repack below can see. Doing it here rather than in the caller keeps the
  // API honest: `write` takes resource ids and does not care where they live.
  //
  // The ILS is self-describing — varint(resId) then that resource's bytes, in
  // ILS order, not map order — so it is re-emitted IN ITS ORIGINAL ORDER with
  // the changed bytes swapped in. Rebuilding it in map order would still parse
  // but would silently reorder load, and the whole point of the segment is
  // what loads first.
  const ilsEntry = cast.entries.find((e) => e.tag === "ILS ");
  const residentEdits = [...replacements].filter(([resId]) => {
    const entry = cast.entries.find((e) => e.resId === resId);
    return entry && entry.offset === -1;
  });
  if (residentEdits.length > 0 || ilsAdds.length > 0) {
    if (!ilsEntry || !cast.ilsData) throw new Error("cannot edit an ILS-resident chunk without the ILS");
    const edited = new Map(residentEdits);
    const order = cast.entries
      .filter((e) => e.offset === -1 && e.ilsAt !== undefined)
      .sort((a, b) => a.ilsAt - b.ilsAt);
    const out = [];
    for (const entry of order) {
      const bytes = edited.has(entry.resId)
        ? edited.get(entry.resId)
        : cast.ilsData.subarray(entry.ilsAt, entry.ilsAt + entry.compLen);
      out.push(writeVarint(entry.resId), bytes);
      if (edited.has(entry.resId)) {
        // Stored uncompressed inside the ILS: equal lengths is exactly how the
        // reader decides not to inflate.
        entry.compLen = bytes.length;
        entry.decompLen = bytes.length;
      }
    }
    // New resident chunks load after everything the cast already had.
    for (const add of ilsAdds) out.push(writeVarint(add.resId), add.data);
    replacements = new Map(
      [...replacements].filter(([resId]) => !edited.has(resId)),
    );
    replacements.set(ilsEntry.resId, Buffer.concat(out));
  }

  const pieces = [];
  const entries = [];
  let cursor = 0;

  for (const entry of cast.entries) {
    const replacement = replacements.get(entry.resId);

    // ⚠ ILS-RESIDENT ENTRIES HAVE NO PAYLOAD BYTES. Their `offset` of -1 is a
    // marker, not a position, so repacking them like payload chunks would slice
    // `payload.subarray(-1, …)` and write garbage in place of every script and
    // name table. Carry the entry through untouched — its real bytes travel
    // inside the ILS chunk, which IS a payload entry and gets repacked below.
    //
    // This stayed hidden for a long time because `write` short-circuits when
    // there is nothing to replace, so the round-trip suite passed 77/77 without
    // ever exercising this loop on a cast that has an ILS.
    if (entry.offset === -1) {
      // Resident edits were folded into the ILS above, so nothing aimed at one
      // should still be here.
      if (replacement) {
        throw new Error(`ILS-resident chunk ${entry.tag}/${entry.resId} was not folded into the ILS`);
      }
      entries.push({ ...entry });
      continue;
    }

    let bytes;
    let decompLen;
    if (replacement) {
      decompLen = replacement.length;
      bytes = entry.compLen === entry.decompLen ? replacement : deflateSync(replacement);
    } else {
      decompLen = entry.decompLen;
      bytes = cast.payload.subarray(entry.offset, entry.offset + entry.compLen);
    }
    entries.push({ ...entry, offset: cursor, compLen: bytes.length, decompLen });
    pieces.push(bytes);
    cursor += bytes.length;
  }
  for (const add of ilsAdds) {
    const len = add.data.length;
    entries.push({ resId: add.resId, offset: -1, compLen: len, decompLen: len, compType: add.compType ?? 0, tag: add.tag });
  }
  for (const add of payloadAdds) {
    const bytes = add.deflate ? deflateSync(add.data) : add.data;
    entries.push({
      resId: add.resId,
      offset: cursor,
      compLen: bytes.length,
      decompLen: add.data.length,
      compType: add.compType ?? 0,
      tag: add.tag,
    });
    pieces.push(bytes);
    cursor += bytes.length;
  }
  // Director lists the map in ascending resource-id order, and so does every
  // cast we hold; keep added chunks in that order too. Offsets are explicit, so
  // this reorders the table only, not the bytes. (Shockwave already rejects a
  // cast whose KEY* rows are out of order; don't hand it a map that is either.)
  if (additions.length > 0) entries.sort((a, b) => a.resId - b.resId);

  // The entry table, without the three leading header varints.
  const table = Buffer.concat(
    entries.flatMap((e) => [
      writeVarint(e.resId),
      writeVarint(e.offset),
      writeVarint(e.compLen),
      writeVarint(e.decompLen),
      writeVarint(e.compType),
      fourccBytes(e.tag),
    ]),
  );
  // ⚠ The map's second header varint is NOT a byte count, and treating it as
  // one is what broke the round-trip. Measured on hof_furni/item_41.cct: the
  // inflated map is 751 bytes and that field reads 75, while the ABMP body's
  // OWN second varint is the 751. Recomputing it widened the varint and left
  // the file 8 bytes short. Whatever it means, it does not describe the table,
  // so it is carried through untouched.
  //
  // ...unless chunks were ADDED. On vmk_pirates_private.cct it reads 214, the
  // highest resource id in the map, so it is raised to cover the new ids.
  const highest = Math.max(cast.mapHeader[1], ...additions.map((a) => a.resId));
  const map = Buffer.concat([
    writeVarint(cast.mapHeader[0]),
    writeVarint(highest),
    writeVarint(entries.length),
    table,
  ]);

  const abmpBody = Buffer.concat([
    writeVarint(cast.abmpPrefix[0]),
    // ⚠ The ABMP body's second varint IS the map's inflated size, so it tracks
    // the new table rather than being carried through.
    writeVarint(map.length),
    deflateSync(map),
  ]);
  return rebuild(cast, entries, Buffer.concat(pieces), abmpBody);
}

/** Assemble the file from its blocks, a chunk map and a payload. */
function rebuild(cast, entries, payload, abmpBody) {
  void entries; // already encoded into abmpBody by the caller
  const out = [];
  for (const block of cast.blocks) {
    if (block.tag === "FGEI") {
      // Tag, then its varint, then the payload — see the note in `read`.
      out.push(fourccBytes("FGEI"), writeVarint(block.fgeiPrefix ?? 0));
      continue;
    }
    const body = block.tag === "ABMP" ? abmpBody : block.body;
    out.push(fourccBytes(block.tag), writeVarint(body.length), body);
  }
  const afterHeader = Buffer.concat([...out, payload]);
  const header = Buffer.alloc(12);
  header.write("XFIR", 0, "latin1");
  header.writeUInt32LE(afterHeader.length + 4, 4);
  header.write("CDGF", 8, "latin1");
  return Buffer.concat([header, afterHeader]);
}
