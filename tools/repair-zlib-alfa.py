"""
Repair extracted bitmaps whose ALFA chunk is zlib-wrapped PackBits.

Most ALFA chunks are plain PackBits; a few (53 of ~94k) are zlib-compressed
PackBits. The extractor unpacks those as plain PackBits, so the PNG's alpha is
garbage — e.g. the Pirates shoot-direction arrow `shoot0060` drew on an opaque
off-white box while its 35 sibling frames were clean.

A chunk is only repaired when zlib -> PackBits yields EXACTLY width*height
bytes for its PNG, so a coincidental 0x78 header is never touched.

  python tools/repair-zlib-alfa.py                 # dry run: report only
  python tools/repair-zlib-alfa.py --apply NAME..  # rewrite PNGs whose path contains NAME

Originals are kept beside the PNG as `<name>.png.orig-alpha` on --apply.
"""
import glob
import os
import shutil
import sys
import zlib

from PIL import Image

CASTS = os.path.join(os.path.dirname(__file__), "..", "client", "assets", "casts")


def unpack_bits(data: bytes) -> bytearray:
    out = bytearray()
    i = 0
    while i < len(data):
        c = data[i]
        i += 1
        if c < 128:
            out += data[i : i + c + 1]
            i += c + 1
        elif c > 128:
            out += bytes([data[i]]) * (257 - c)
            i += 1
    return out


def png_for(chunk: str) -> str | None:
    # raw_chunks/00429_shoot0060_2512_ALFA.bin -> bitmaps/00429_shoot0060.png
    cast = os.path.dirname(os.path.dirname(chunk))
    stem = os.path.basename(chunk).rsplit("_", 2)[0]
    path = os.path.join(cast, "bitmaps", stem + ".png")
    return path if os.path.exists(path) else None


def main() -> None:
    args = sys.argv[1:]
    apply = "--apply" in args
    names = [a for a in args if a != "--apply"]
    for chunk in glob.glob(os.path.join(CASTS, "*", "raw_chunks", "*ALFA.bin")):
        with open(chunk, "rb") as f:
            data = f.read()
        if len(data) < 2 or data[0] != 0x78 or (data[0] * 256 + data[1]) % 31:
            continue
        try:
            alpha = unpack_bits(zlib.decompress(data))
        except (zlib.error, IndexError):
            continue
        png = png_for(chunk)
        rel = os.path.relpath(chunk, CASTS)
        if png is None:
            print(f"skip  {rel}: no bitmap")
            continue
        img = Image.open(png).convert("RGBA")
        w, h = img.size
        if len(alpha) != w * h:
            print(f"skip  {rel}: {len(alpha)} bytes for {w}x{h}")
            continue
        old = img.getchannel("A").tobytes()
        diff = sum(1 for a, b in zip(old, alpha) if a != b)
        wanted = apply and any(n in png for n in names)
        print(f"{'FIX ' if wanted else 'would'} {os.path.relpath(png, CASTS)}  {w}x{h}  {diff} px change")
        if wanted and diff:
            backup = png + ".orig-alpha"
            if not os.path.exists(backup):
                shutil.copyfile(png, backup)
            img.putalpha(Image.frombytes("L", (w, h), bytes(alpha)))
            img.save(png)


if __name__ == "__main__":
    main()
