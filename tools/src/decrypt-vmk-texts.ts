/**
 * VMK `encrypted_texts` decoder.
 *
 * Recovered from the matched `encrypted_texts_208` / `decrypted_texts_208` pair
 * published by ElectricLime (enchanter.net/vmk/external_files/), mirrored in
 * Alex/Space's VMK archive. See docs/original-client-spec/enchanter/.
 *
 * The scheme, established by measurement over 61,856 encrypted characters:
 *
 *   - Byte-for-byte length preserving; line structure is untouched.
 *   - Only characters in a fixed 64-symbol alphabet are enciphered. Everything
 *     else (space, CR, LF, and " !"#$%&'(),-/:;?[\]_ ) passes through verbatim
 *     and does NOT advance the stream position.
 *   - Position-dependent substitution with period 64: the row is chosen by
 *     (index within the encrypted stream) % 64. Each of the 64 rows is a full
 *     permutation of the alphabet — not a rotation, so the table is data, not
 *     a formula.
 *
 * Round-trip against revision 208 is exact: 0 mismatches over 71,917 bytes.
 *
 * ⚠ A derived tableau is REVISION-SPECIFIC. Applying revision 208's table to a
 * different revision yields garbage — not readable text with gaps — verified
 * against OpenVMK's 71,643-byte `assets/config/encrypted_texts`. Each revision
 * is separately keyed, so each needs its own matched plaintext/ciphertext pair.
 * The scheme above is general; the table is not.
 */

import { readFileSync, writeFileSync } from 'node:fs';

export const ALPHABET =
  '.0123456789=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const N = ALPHABET.length; // 64
const IDX = new Map<string, number>([...ALPHABET].map((c, i) => [c, i]));

export type Tableau = number[][]; // [row][plainIndex] -> cipherIndex

/** Derive the tableau from a known plaintext/ciphertext pair. */
export function deriveTableau(plain: string, cipher: string): Tableau {
  if (plain.length !== cipher.length) {
    throw new Error(
      `length mismatch: plain ${plain.length} vs cipher ${cipher.length}`,
    );
  }
  const enc: Tableau = Array.from({ length: N }, () => new Array(N).fill(-1));
  let stream = 0;
  for (let i = 0; i < plain.length; i++) {
    const pi = IDX.get(plain[i]);
    if (pi === undefined) continue; // pass-through, does not advance
    const ci = IDX.get(cipher[i]);
    if (ci === undefined) {
      throw new Error(`cipher char outside alphabet at ${i}: ${cipher[i]!}`);
    }
    const row = stream % N;
    const prev = enc[row]![pi]!;
    if (prev === -1) enc[row]![pi] = ci;
    else if (prev !== ci) {
      throw new Error(`tableau conflict at row ${row}, plain '${plain[i]!}'`);
    }
    stream++;
  }
  return completeTableau(enc);
}

/**
 * Fill gaps using the fact that every row is a permutation: within a row, if
 * exactly one plaintext index and one cipher index remain unassigned, they must
 * map to each other. Repeat to fixpoint.
 */
export function completeTableau(enc: Tableau): Tableau {
  for (let row = 0; row < N; row++) {
    for (;;) {
      const missingPlain: number[] = [];
      const usedCipher = new Set<number>();
      for (let p = 0; p < N; p++) {
        const v = enc[row]![p]!;
        if (v === -1) missingPlain.push(p);
        else usedCipher.add(v);
      }
      if (missingPlain.length !== 1) break;
      const freeCipher: number[] = [];
      for (let c = 0; c < N; c++) if (!usedCipher.has(c)) freeCipher.push(c);
      if (freeCipher.length !== 1) break;
      enc[row]![missingPlain[0]!] = freeCipher[0]!;
    }
  }
  return enc;
}

export function coverage(enc: Tableau): { filled: number; total: number } {
  let filled = 0;
  for (const row of enc) for (const v of row) if (v !== -1) filled++;
  return { filled, total: N * N };
}

export function invert(enc: Tableau): Tableau {
  const dec: Tableau = Array.from({ length: N }, () => new Array(N).fill(-1));
  for (let r = 0; r < N; r++) {
    for (let p = 0; p < N; p++) {
      const c = enc[r]![p]!;
      if (c !== -1) dec[r]![c] = p;
    }
  }
  return dec;
}

/** Decrypt. Characters the tableau cannot resolve become `unresolved`. */
export function decrypt(
  cipher: string,
  enc: Tableau,
  unresolved = '�',
): { text: string; gaps: number } {
  const dec = invert(enc);
  let out = '';
  let stream = 0;
  let gaps = 0;
  for (const ch of cipher) {
    const ci = IDX.get(ch);
    if (ci === undefined) {
      out += ch; // pass-through
      continue;
    }
    const pi = dec[stream % N]![ci]!;
    if (pi === -1) {
      out += unresolved;
      gaps++;
    } else {
      out += ALPHABET[pi];
    }
    stream++;
  }
  return { text: out, gaps };
}

/** Encrypt — useful for verifying a derived tableau round-trips. */
export function encrypt(plain: string, enc: Tableau): string {
  let out = '';
  let stream = 0;
  for (const ch of plain) {
    const pi = IDX.get(ch);
    if (pi === undefined) {
      out += ch;
      continue;
    }
    const ci = enc[stream % N]![pi]!;
    out += ci === -1 ? '�' : ALPHABET[ci];
    stream++;
  }
  return out;
}

// ---------------------------------------------------------------------------

function main(argv: string[]): void {
  const [refPlain, refCipher, target, outPath] = argv;
  if (!refPlain || !refCipher) {
    console.error(
      'usage: decrypt-vmk-texts <decrypted_ref> <encrypted_ref> [target] [out]\n' +
        '  With only the two reference files, derives and reports the tableau.\n' +
        '  With <target>, decrypts that file using the derived tableau.',
    );
    process.exit(2);
  }

  const plain = readFileSync(refPlain, 'latin1');
  const cipher = readFileSync(refCipher, 'latin1');
  const enc = deriveTableau(plain, cipher);

  const { filled, total } = coverage(enc);
  console.log(
    `tableau: ${filled}/${total} cells (${((100 * filled) / total).toFixed(1)}%)`,
  );

  const check = decrypt(cipher, enc);
  const exact = check.text === plain;
  console.log(
    `self-check on reference: ${exact ? 'EXACT' : 'MISMATCH'}, gaps ${check.gaps}`,
  );
  if (!exact) process.exitCode = 1;

  if (target) {
    const t = readFileSync(target, 'latin1');
    const { text, gaps } = decrypt(t, enc);
    if (outPath) {
      writeFileSync(outPath, text, 'latin1');
      console.log(`wrote ${outPath} (${text.length} bytes, ${gaps} unresolved)`);
    } else {
      console.log(text);
    }
    if (gaps > 0) {
      console.warn(
        `WARNING: ${gaps} characters could not be resolved — the tableau has ` +
          `gaps at those (row, symbol) pairs. Another matched pair would close them.`,
      );
    }
  }
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'))) {
  main(process.argv.slice(2));
}
