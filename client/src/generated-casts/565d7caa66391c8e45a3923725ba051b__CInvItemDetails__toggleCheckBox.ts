// 565d7caa66391c8e45a3923725ba051b.cct / CInvItemDetails / toggleCheckBox

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

/** How many pixels differ between two images, over the area they share. */
function pixelDistance(a: LingoValue, b: LingoValue): number {
  if (!a || !b) return Number.POSITIVE_INFINITY;
  const w = Math.min(Number(a.width), Number(b.width));
  const h = Math.min(Number(a.height), Number(b.height));
  if (!(w > 0 && h > 0)) return Number.POSITIVE_INFINITY;
  let differ = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (!lingoTruthy(lingoBinary("eq", callMethod("getPixel", a, x, y), callMethod("getPixel", b, x, y)))) differ++;
    }
  }
  return differ;
}

export function toggleCheckBox(_me: LingoMe, a_rWindow: LingoValue, a_sElement: LingoValue) {
  var t_Elem = callMethod("getElement", a_rWindow, a_sElement);
  var t_memTrue = callNamed("member", callNamed("getmemnum", "button.checkbox.1"));
  var t_memFalse = callNamed("member", callNamed("getmemnum", "button.checkbox.0"));
  if (lingoBinary("neq", t_Elem, 0)) {
  var tSprite = callMethod("getProperty", t_Elem, symbol("sprite"));
  if (lingoBinary("neq", tSprite, 0)) {
  // HAND-CORRECTED: read the box's state by LOOKS, not identity. The Lingo asks
  // `tSprite.member.image = t_memFalse.image`, but the box's image is never
  // that object: `changeImageInElement` and `feedImage` both COPY pixels into
  // the element's own member. Our `=` compares images by identity, so the test
  // was always false, every click "unticked" the box, and it could never be
  // ticked. That was "Let guests move this item" appearing unclickable. Pick
  // whichever checkbox image the box is closer to.
  var tstate = pixelDistance(tSprite.member.image, t_memFalse.image) <=
    pixelDistance(tSprite.member.image, t_memTrue.image) ? 0 : 1;

  tstate = (lingoTruthy(tstate) ? 0 : 1);
  if (tstate) {
  callMethod("feedImage", t_Elem, t_memTrue.image)
  } else {
  callMethod("feedImage", t_Elem, t_memFalse.image)
  }

  return tstate;
  }

  }

  return undefined;
}

