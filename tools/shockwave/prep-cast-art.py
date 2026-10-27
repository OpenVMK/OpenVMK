"""Split 32-bit PNGs into what a JPEG bitmap member stores: an `ediM` JPEG of the
colour and a raw 8-bit alpha plane (packed into the member's `ALFA` by the cast
builder).

    python -I tools/shockwave/prep-cast-art.py <reference.jpg> <out_dir> <png>...

Writes <name>.jpg and <name>.alpha per PNG, plus art.json with each image's
width and height.

The JPEGs reuse the quantization tables and chroma subsampling of
<reference.jpg>, an `ediM` from the same cast, so new art compresses the way the
original members did instead of at some arbitrary quality.

Colour under fully transparent pixels is kept as it is: the alpha plane hides it,
and flattening it would only move JPEG ringing into the visible edges.
"""
import json
import os
import sys

from PIL import Image, JpegImagePlugin

reference, out_dir, *pngs = sys.argv[1:]
os.makedirs(out_dir, exist_ok=True)
ref = Image.open(reference)
qtables = ref.quantization
subsampling = JpegImagePlugin.get_sampling(ref)

art = {}
for path in pngs:
    name = os.path.splitext(os.path.basename(path))[0]
    image = Image.open(path).convert("RGBA")
    image.convert("RGB").save(
        os.path.join(out_dir, name + ".jpg"), "JPEG", qtables=qtables, subsampling=subsampling, optimize=False
    )
    with open(os.path.join(out_dir, name + ".alpha"), "wb") as handle:
        handle.write(image.getchannel("A").tobytes())
    art[name] = {"width": image.width, "height": image.height}
    print(f"{name}: {image.width}x{image.height}")

with open(os.path.join(out_dir, "art.json"), "w", encoding="utf-8") as handle:
    json.dump(art, handle, indent=2)
