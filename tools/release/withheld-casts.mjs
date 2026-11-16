// Casts kept in a maintainer's checkout but never published: neither the source
// export nor the release copies them. The names live in
// tools/release/withheld-casts.local.txt (one folder name under
// client/assets/casts per line, `#` comments), which itself never ships.
//
// A name withholds both client/assets/casts/<name>/ and its transpiled
// handlers, client/src/generated-casts/<name>__*.ts.
import { existsSync, readFileSync } from "node:fs";
import { basename, dirname, join, relative, sep } from "node:path";

/**
 * @param {string} root repo root
 * @param {{ required?: boolean }} [opts] required: throw when the list is
 *   missing, so a checkout that holds these casts can't publish them by accident.
 */
export function loadWithheldCasts(root, { required = false } = {}) {
  const file = join(root, "tools", "release", "withheld-casts.local.txt");
  if (!existsSync(file)) {
    if (required) throw new Error(`missing ${relative(root, file)}; refusing to publish without it.`);
    return { names: new Set(), withheld: () => false };
  }
  const names = new Set(
    readFileSync(file, "utf8")
      .replace(/^﻿/, "")
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#")),
  );
  const casts = join(root, "client", "assets", "casts");
  const generated = join(root, "client", "src", "generated-casts");
  /** True for a path under a withheld cast folder or a withheld generated module. */
  const withheld = (src) => {
    const parent = dirname(src);
    if (parent === casts) return names.has(basename(src));
    if (src.startsWith(casts + sep)) return names.has(relative(casts, src).split(sep)[0]);
    if (parent === generated) {
      const m = basename(src).match(/^(.+?)__/);
      return !!m && names.has(m[1]);
    }
    return false;
  };
  return { names, withheld };
}
