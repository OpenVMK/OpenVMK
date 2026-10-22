// d0e535313898676eb605277339b50f27.cct / CProjectionImage / DrawProjection

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DrawProjection(_me: LingoMe, _this: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_ar_BodyPartObjects"))) ? 0 : 1)) {
  var t_HumanImg = callNamed("image", 200, 300, 32);
  var t_ImgAlpha = callNamed("image", 200, 300, 8, symbol("grayscale"));
  callMethod("fill", t_HumanImg, t_HumanImg.rect, callNamed("rgb", 255, 250, 123))
  var t_mpList = new LingoList(["tr", "lh", "ls", "ch", "ch2", "rh", "rs", "hd", "fc", "ey", "hr", "ht"]);
  callMethod("getPartImg", _this, t_mpList, t_HumanImg)
  callMethod("getPartAlpha", _this, t_mpList, t_ImgAlpha)
  callMethod("setAlpha", t_HumanImg, t_ImgAlpha)
  var tWidth = 90;
  var tHeight = 100;
  var t_PrewImg = callNamed("image", tWidth, tHeight, 32);
  // HAND-CORRECTED: the Steamboat screen must show the figure over the
  // pale-yellow fill (255,250,123), as real Shockwave does — ours showed WHITE.
  //
  // Director's `setAlpha` does not turn on `useAlpha` (64 of VMK's 87 calls set
  // it themselves; this one does not), so there the copy below ignores the mask
  // and the yellow survives. Ours sets useAlpha = 1 in `setAlpha`, so the copy
  // composites the silhouette over the fresh WHITE destination. Turning
  // useAlpha off here instead does not work either: our copyPixels then copies
  // the alpha raw and the background goes see-through (MEASURED: 0,0,0,0).
  // Painting the destination the same yellow first gives Director's picture
  // exactly. Scoped to this handler: changing `setAlpha` globally was tried and
  // broke UI across the client.
  callMethod("fill", t_PrewImg, t_PrewImg.rect, callNamed("rgb", 255, 250, 123))
  var tdestrect = lingoBinary("sub", t_PrewImg.rect, lingoBinary("mul", t_HumanImg.rect, 2));
  var tMargins = callNamed("rect", 0, -float(50), 0, 10);
  tdestrect = callNamed("rect", 0, lingoBinary("add", tdestrect.bottom, 210), lingoBinary("mul", t_HumanImg.width, 2), lingoBinary("add", t_PrewImg.rect.bottom, 100));
  callMethod("copyPixels", t_PrewImg, t_HumanImg, tdestrect, t_HumanImg.rect)
  return t_PrewImg;
  }

}

