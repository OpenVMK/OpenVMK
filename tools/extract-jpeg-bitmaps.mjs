/**
 * Turn JPEG-compressed bitmap members into PNGs the client can draw.
 *
 * Director can store a bitmap as a JPEG (`ediM` media chunk) instead of `BITD`.
 * The LibreShockwave extractor only decodes those when it is built against
 * libjpeg (`LIBRESHOCKWAVE_HAVE_JPEG`); without it the member is extracted as a
 * raw chunk only, has no `bitmaps/` row in its manifest, and draws as nothing.
 * MEASURED: 90 bitmap members in 15 casts, among them the Fireworks warning
 * flash frames `fw.flash.02` / `.04`, whose empty image threw every frame and
 * froze the whole game.
 *
 * ⚠ A JPEG CARRIES ITS TRANSPARENCY SEPARATELY, in the member's `ALFA` chunk:
 * one PackBits-compressed alpha byte per pixel. Converting the JPEG alone gave
 * opaque rectangles — the Fireworks EXIT GAME button sat in a white box, which
 * ink 36 could not key because JPEG never reproduces exact white.
 *
 *   node tools/extract-jpeg-bitmaps.mjs            # every cast
 *   node tools/extract-jpeg-bitmaps.mjs vmk_fireworks_interface
 *
 * ⚠ Only members with NO `bitmaps/` row are converted. Most JPEG members in the
 * repo already have a committed PNG with correct alpha from an earlier source;
 * re-converting them overwrote 133 good files once. Decoding goes through .NET's
 * System.Drawing (Windows PowerShell), so it needs no native dependency.
 * Afterwards run tools/index-bitmap-sizes.mjs and tools/pack-cast-bitmaps.mjs
 * for the casts it reports.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CASTS = join(ROOT, "client", "assets", "casts");
const only = process.argv.slice(2).filter((a) => !a.startsWith("--"));

function unpackBits(data) {
  const out = [];
  for (let i = 0; i < data.length; ) {
    const n = data[i++];
    if (n < 128) {
      for (let k = 0; k <= n && i < data.length; k++) out.push(data[i++]);
    } else if (n > 128) {
      const v = data[i++];
      for (let k = 0; k < 257 - n; k++) out.push(v);
    }
  }
  return Buffer.from(out);
}

const jobs = [];
const manifestEdits = new Map();
const scratch = join(ROOT, "client", "assets", ".jpeg-jobs");
mkdirSync(scratch, { recursive: true });

for (const cast of only.length ? only : readdirSync(CASTS)) {
  const manifestPath = join(CASTS, cast, "manifest.tsv");
  if (!existsSync(manifestPath)) continue;
  const text = readFileSync(manifestPath, "utf8");
  const rows = text.split(/\r?\n/).slice(1).filter((l) => l.trim() !== "").map((l) => l.split("\t"));
  const hasRow = new Set(rows.filter((r) => (r[6] ?? "").startsWith("bitmaps/")).map((r) => r[0]));
  const alfaOf = new Map(rows.filter((r) => r[5] === "ALFA").map((r) => [r[0], r[6]]));
  const added = [];
  const seen = new Set();
  for (const row of rows) {
    if (row[1] !== "bitmap" || row[5] !== "ediM" || seen.has(row[0]) || hasRow.has(row[0])) continue;
    const source = join(CASTS, cast, row[6]);
    if (!existsSync(source)) continue;
    const head = readFileSync(source).subarray(0, 2);
    if (head[0] !== 0xff || head[1] !== 0xd8) continue;
    seen.add(row[0]);
    const stem = row[6].replace(/^raw_chunks\//, "").replace(/_\d+_ediM\.bin$/, "");
    const asset = `bitmaps/${stem}.png`;
    let alpha = "";
    const alfaPath = alfaOf.get(row[0]);
    if (alfaPath && existsSync(join(CASTS, cast, alfaPath))) {
      alpha = join(scratch, `${cast}_${row[0]}.alpha`);
      writeFileSync(alpha, unpackBits(readFileSync(join(CASTS, cast, alfaPath))));
    }
    jobs.push({ source, target: join(CASTS, cast, asset), alpha });
    added.push([row[0], "bitmap", row[2], row[3], "", "", asset, row[7] ?? "0", row[8] ?? "0"].join("\t"));
  }
  if (added.length) manifestEdits.set(cast, { manifestPath, text, added });
}

if (jobs.length === 0) {
  console.log("no JPEG-only bitmap members found");
  process.exit(0);
}

for (const { target } of jobs) mkdirSync(dirname(target), { recursive: true });
const listPath = join(scratch, "jobs.tsv");
writeFileSync(listPath, jobs.map((j) => `${j.source}\t${j.target}\t${j.alpha}`).join("\n"));
const script = `
Add-Type -AssemblyName System.Drawing
$ok = 0; $alphaApplied = 0; $alphaMismatch = 0
foreach ($line in Get-Content -LiteralPath '${listPath.replace(/'/g, "''")}') {
  $parts = $line -split "\`t"
  $img = [System.Drawing.Image]::FromFile($parts[0])
  try {
    $w = $img.Width; $h = $img.Height
    $bmp = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.DrawImage($img, 0, 0, $w, $h)
    $g.Dispose()
    if ($parts.Count -gt 2 -and $parts[2] -ne "") {
      $a = [System.IO.File]::ReadAllBytes($parts[2])
      $pitch = if ($a.Length -ge $w * $h) { [int][Math]::Floor($a.Length / $h) } else { 0 }
      if ($pitch -ge $w) {
        $rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
        $data = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
        $bytes = New-Object byte[] ($data.Stride * $h)
        [System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $bytes, 0, $bytes.Length)
        for ($y = 0; $y -lt $h; $y++) { for ($x = 0; $x -lt $w; $x++) { $bytes[$y * $data.Stride + $x * 4 + 3] = $a[$y * $pitch + $x] } }
        [System.Runtime.InteropServices.Marshal]::Copy($bytes, 0, $data.Scan0, $bytes.Length)
        $bmp.UnlockBits($data)
        $alphaApplied++
      } else { $alphaMismatch++; Write-Host ("alpha size mismatch: " + $parts[0] + " " + $a.Length + " for " + $w + "x" + $h) }
    }
    $bmp.Save($parts[1], [System.Drawing.Imaging.ImageFormat]::Png); $bmp.Dispose(); $ok++
  } finally { $img.Dispose() }
}
Write-Output "$ok $alphaApplied $alphaMismatch"
`;
const result = execFileSync("powershell", ["-NoProfile", "-NonInteractive", "-Command", script], { encoding: "utf8" }).trim().split(/\s+/).slice(-3).map(Number);
rmSync(scratch, { recursive: true, force: true });

for (const [cast, { manifestPath, text, added }] of manifestEdits) {
  const body = text.endsWith("\n") ? text : `${text}\n`;
  writeFileSync(manifestPath, body + added.join("\n") + "\n");
  console.log(`${cast}: ${added.length} new JPEG bitmap row(s)`);
}
const casts = [...new Set(jobs.map((j) => j.target.split(/[\\/]/).slice(-3)[0]))];
console.log(`converted ${result[0]} of ${jobs.length} (alpha applied to ${result[1]}, size mismatch ${result[2]}); now run tools/index-bitmap-sizes.mjs and tools/pack-cast-bitmaps.mjs for: ${casts.join(" ")}`);
