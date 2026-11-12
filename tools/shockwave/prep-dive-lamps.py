"""Cut the door lamps out of the dive rooms' tube rings, for build-dive-doors.mjs.

    python -I tools/shockwave/prep-dive-lamps.py <reference ediM> <out_dir> "<side>|<ring.png>|<greenlight.png>|<x>|<y>" ...

Each lamp over a Nautilus Grotto / Shipwreck Graveyard door is painted red on
the tube ring in front of it. Disney's `greenlight_L` / `greenlight_R` members
are the same lamp lit green, at the same spot, but whatever showed them is lost.
<x>|<y> is where that lamp sits in the ring member (found by sliding the
greenlight's shape over the ring for the reddest match).

For each lamp this writes:
  <ring>.alpha       the ring's alpha with the lamp punched out (raw 8-bit plane),
                     so whatever is drawn behind the ring shows through there
  redlight_<side>    the red lamp itself, cut from the ring's own pixels: JPEG
                     (.jpg, with <reference>'s tables) + raw alpha (.alpha),
                     covering the hole plus one pixel all round
and art.json with every image's size, the ring's name and the lamp's offset.

The hole is the greenlight's own shape (alpha >= 128).
"""
import json
import os
import sys

from PIL import Image, ImageFilter, JpegImagePlugin

reference, out_dir, *lamps = sys.argv[1:]
os.makedirs(out_dir, exist_ok=True)
ref = Image.open(reference)
qtables = ref.quantization
subsampling = JpegImagePlugin.get_sampling(ref)

art = {}
for spec in lamps:
    side, ring_path, mask_path, x, y = spec.split("|")
    x, y = int(x), int(y)
    ring_name = os.path.splitext(os.path.basename(ring_path))[0].split("_", 1)[1]  # 00092_tube_left_b -> tube_left_b
    ring = Image.open(ring_path).convert("RGBA")
    mask = Image.open(mask_path).convert("RGBA").getchannel("A")
    hole = mask.point(lambda a: 255 if a >= 128 else 0)

    # The ring, punched.
    alpha = ring.getchannel("A")
    punched = alpha.copy()
    punched.paste(0, (x, y), hole)
    with open(os.path.join(out_dir, ring_name + ".alpha"), "wb") as handle:
        handle.write(punched.tobytes())

    # The red lamp: the ring's pixels over the hole and one pixel round it.
    name = f"redlight_{side}"
    patch = ring.crop((x, y, x + mask.width, y + mask.height))
    cover = hole.filter(ImageFilter.MaxFilter(3))
    cover = Image.composite(cover, Image.new("L", cover.size, 0), patch.getchannel("A").point(lambda a: 255 if a else 0))
    patch.convert("RGB").save(os.path.join(out_dir, name + ".jpg"), "JPEG", qtables=qtables, subsampling=subsampling, optimize=False)
    with open(os.path.join(out_dir, name + ".alpha"), "wb") as handle:
        handle.write(cover.tobytes())
    Image.merge("RGBA", (*patch.convert("RGB").split(), cover)).save(os.path.join(out_dir, name + ".png"))

    art[name] = {"width": mask.width, "height": mask.height, "ring": ring_name, "x": x, "y": y}
    art[ring_name] = {"width": ring.width, "height": ring.height}
    print(f"{side}: {ring_name} {ring.width}x{ring.height}, lamp at {x},{y} ({sum(1 for p in hole.getdata() if p)} px punched)")

with open(os.path.join(out_dir, "art.json"), "w") as handle:
    json.dump(art, handle, indent=2)
