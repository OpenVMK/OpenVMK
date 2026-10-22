/**
 * Texture-atlas cast source.
 *
 * VMK's converted asset mirror stores art as packed atlases with a
 * TexturePacker-style descriptor:
 *
 *   { "frames": { "fw.ui.bg": { "frame": {x,y,w,h}, "rotated": true } },
 *     "meta": { "image": "5aa6…png", "size": {w,h} } }
 *
 * Window definitions reference those frame names directly, so an atlas becomes
 * a cast library whose member names are frame names — which is what makes it
 * possible to lay out a real VMK screen from the game's own data.
 */
import { CastLib, CastMember } from "./lingo-cast.js";
import { LingoRect } from "./lingo-builtins.js";

export interface AtlasFrame {
  frame: { x: number; y: number; w: number; h: number };
  rotated?: boolean;
  trimmed?: boolean;
}

export interface AtlasDescriptor {
  frames: Record<string, AtlasFrame>;
  meta?: { image?: string; size?: { w: number; h: number } };
}

/**
 * Builds a cast library from one atlas descriptor.
 *
 * ⚠ For a rotated frame, `frame.w`/`frame.h` are the **display** dimensions;
 * the region actually occupied in the sheet is transposed. Proof from the data
 * rather than from the spec: `fw.ui.bg` is `{x:1819, w:800, rotated:true}` on a
 * 1938px-wide sheet — 1819+800 overflows it, while 1819+61 (the transposed
 * width) fits. Swapping the display size instead, as a first pass did, renders
 * an 800×61 UI bar as a 61×800 column.
 */
export function castFromAtlas(
  descriptor: AtlasDescriptor,
  libName: string,
  libNumber: number,
  imageUrl: string,
  image: unknown,
): CastLib {
  const lib = new CastLib(libNumber, libName);
  let id = 1;

  for (const [name, frame] of Object.entries(descriptor.frames ?? {})) {
    const member = new CastMember(id++, "bitmap", libNumber);
    member.name = name;
    member.imagePath = imageUrl;
    member.image = image as never;
    member.rotated = frame.rotated === true;
    // sourceRect is the region in the sheet: transposed when packed rotated.
    member.sourceRect = member.rotated
      ? { x: frame.frame.x, y: frame.frame.y, w: frame.frame.h, h: frame.frame.w }
      : { ...frame.frame };
    member.rect = new LingoRect(0, 0, frame.frame.w, frame.frame.h);

    lib.add(member);
  }

  return lib;
}
