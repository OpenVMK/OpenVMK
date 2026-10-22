// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFurniThumbRenderer / _ShrinkToThumbnail

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ShrinkToThumbnail(_me: LingoMe, _this: LingoValue, a_rImage: LingoValue) {
  if (lingoBinary("eq", callNamed("ilk", a_rImage), symbol("image"))) {
  var t_rThumb = callNamed("image", meProp(_me, "m_rcThumbRect").width, meProp(_me, "m_rcThumbRect").height, 32);
  /*
   * ⚠ HAND-CORRECTED: start the thumb TRANSPARENT.
   * The original does `t_rBlack = image(w,h,8,#grayscale); t_rBlack.fill(rgb(0,0,0));
   * t_rThumb.setAlpha(t_rBlack)` to make the thumb fully transparent before the
   * item is copied in centered. Our engine's `setAlpha` cannot reproduce that
   * (reversed-CLUT index space + the empty-mask bail): the thumb kept its fresh
   * WHITE margins, so every furni thumbnail showed two vertical white lines
   * flanking the item and empty-preview items came out solid white.
   * `clearTransparent` is the faithful transparent start; the item then copies in
   * with its own alpha and the margins stay transparent. See lingo-builtins.ts
   * `clearTransparent` + [[member-duplicate-not-implemented]].
   */
  callNamed("clearTransparent", t_rThumb)
  setThePropOf(t_rThumb, "useAlpha", 1);
  if (callNamed("voidp", t_rThumb)) {
  t_rThumb = callNamed("image", 0, 0, 32);
  }

  if (callNamed("voidp", a_rImage)) {
  a_rImage = callNamed("image", 0, 0, 32);
  }

  if (lingoBinary("or", lingoBinary("eq", a_rImage.width, 0), lingoBinary("eq", a_rImage.height, 0))) {
  return t_rThumb;
  }

  if (lingoBinary("gt", a_rImage.width, a_rImage.height)) {
  var t_iScale = lingoBinary("div", callNamed("float", t_rThumb.width), a_rImage.width);
  var t_rcRect = callNamed("rect", 0, 0, t_rThumb.width, lingoBinary("mul", t_iScale, a_rImage.height));
  var t_rcOff = new LingoList([0, lingoBinary("div", lingoBinary("sub", t_rThumb.height, t_rcRect.height), 2), 0, lingoBinary("div", lingoBinary("sub", t_rThumb.height, t_rcRect.height), 2)]);
  } else {
  t_iScale = lingoBinary("div", callNamed("float", t_rThumb.width), a_rImage.height);
  t_rcRect = callNamed("rect", 0, 0, lingoBinary("mul", t_iScale, a_rImage.width), t_rThumb.height);
  t_rcOff = new LingoList([lingoBinary("div", lingoBinary("sub", t_rThumb.width, t_rcRect.width), 2), 0, lingoBinary("div", lingoBinary("sub", t_rThumb.width, t_rcRect.width), 2), 0]);
  }

  callMethod("copyPixels", t_rThumb, a_rImage, lingoBinary("add", t_rcRect, t_rcOff), a_rImage.rect, new LingoPropList([symbol("useFastQuads"), 1]))
  return t_rThumb;
  }

}

