// d0e535313898676eb605277339b50f27.cct / CClothesPreviewRenderer / RenderClothesPreview

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RenderClothesPreview(_me: LingoMe, a_iPartID: LingoValue) {
  if (lingoBinary("eq", a_iPartID, -float(1))) {
  return;
  }

  var t_arSetPieces = new LingoList([]);
  var t_iPartNum = a_iPartID;
  var t_sSetName = callMethod("GetSetName", _me, t_iPartNum);
  if (callNamed("voidp", t_sSetName)) {
  return;
  }

  var t_Img = callNamed("image", 200, 200, 32);
  var t_Alpha = callNamed("image", 200, 200, 8, symbol("grayscale"));
  t_arSetPieces = new LingoList([]);
  t_Img = undefined;
  var t_iPos = callMethod("findPos", meProp(_me, "m_ar_SetsForRenderer")[t_sSetName], t_iPartNum);
  if (lingoBinary("gt", t_iPos, 0)) {
  var t_mp_partMems = meProp(_me, "m_ar_SetsForRenderer")[t_sSetName][t_iPos][1];
  var t_partCol = callNamed("rgb", meProp(_me, "m_ar_SetsForRenderer")[t_sSetName][t_iPos][2][1]);
  } else {
  callNamed("put", lingoBinary("joinPad", "No such set :", t_iPartNum))
  return;
  }

  switch (1) {
case lingoBinary("and", lingoBinary("gte", t_iPartNum, 24000), lingoBinary("lt", t_iPartNum, 26000)):
case lingoBinary("and", lingoBinary("gte", t_iPartNum, 34000), lingoBinary("lt", t_iPartNum, 36000)):
case lingoBinary("and", lingoBinary("gte", t_iPartNum, 44000), lingoBinary("lt", t_iPartNum, 46000)):
  var t_iDir = 4;
  break;
  default:
  t_iDir = 3;
  break;
  break;
  }

  for (var i = 1; i <= t_mp_partMems.count; ++i) {
  var t_sPart = callMethod("getPropAt", t_mp_partMems, i);
  var t_iModel = t_mp_partMems[i];
  var t_mem = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "std_", t_sPart), "_"), t_iModel), "_"), t_iDir), "_0");
  if ((lingoTruthy(callNamed("memberExists", t_mem)) ? 0 : 1)) {
  t_mem = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "std_", t_sPart), "_"), t_iModel), "_"), 3), "_0");
  }

  t_Img = callNamed("image", 200, 200, 32);
  t_Alpha = callNamed("image", 200, 200, 8, symbol("grayscale"));
  var t_PartObj = meProp(_me, "m_mp_ObjectPool")[t_sPart];
  callMethod("Define", t_PartObj, t_sPart, t_iModel, t_partCol, t_iDir, "std", _me)
  callMethod("add", t_arSetPieces, t_PartObj)
  }

  if ((lingoTruthy(callNamed("voidp", t_Img)) ? 0 : 1)) {
  for (var u = 1; u <= t_arSetPieces.count; ++u) {
  callNamed("call", symbol("copyPicture"), new LingoList([t_arSetPieces[u]]), t_Img, t_iDir, "std")
  callNamed("call", symbol("copyAlpha"), new LingoList([t_arSetPieces[u]]), t_Alpha, t_iDir, "std", undefined)
  }

  var t_img2 = callNamed("image", 400, 400, 32);
  var t_Alpha2 = callNamed("image", 400, 400, 8, symbol("grayscale"));
  var tdestrect = lingoBinary("sub", t_img2.rect, lingoBinary("mul", t_Img.rect, 2));
  var tMargins = callNamed("rect", 0, 5, 0, 5);
  tdestrect = lingoBinary("add", callNamed("rect", 0, tdestrect.bottom, lingoBinary("mul", t_Img.width, 2), t_img2.rect.bottom), tMargins);
  callMethod("copyPixels", t_img2, t_Img, tdestrect, t_Img.rect)
  callMethod("copyPixels", t_Alpha2, t_Alpha, tdestrect, t_Alpha.rect, new LingoPropList([symbol("ink"), 39]))
  callMethod("setAlpha", t_img2, t_Alpha2)
  setThePropOf(t_img2, "useAlpha", 1);
  t_img2 = callMethod("trimWhiteSpace", t_img2);
  if (lingoBinary("and", lingoBinary("gt", t_img2.width, 0), lingoBinary("gt", t_img2.height, 0))) {
  var t_rThumb = callNamed("image", meProp(_me, "m_rcThumbRect").width, meProp(_me, "m_rcThumbRect").height, 32);
  /*
   * ⚠ HAND-CORRECTED: start the thumb TRANSPARENT before scaling the figure in.
   * `t_img2` is already correctly carved (figure on transparent, useAlpha=1), but
   * the thumb was built as `image(w,h,32)` (fresh WHITE in our engine), the figure
   * source-over blended onto that white, and the follow-up `setAlpha(t_rThumb,
   * t_rThumbAlpha)` bailed (its scaled 8-bit mask came back all-zero, which our
   * setAlpha treats as "no coverage"). The thumb therefore stayed figure-on-opaque-
   * WHITE; the grid's exact-white ink-36 key removed the flat white but left the
   * antialiased edge (near-white, not exact) as a white FRINGE around every
   * clothing thumbnail (shop + inventory). Clearing to transparent first makes the
   * source-over copy of the carried-alpha `t_img2` land figure-on-transparent
   * directly (MEASURED near-white 786→8), and the later setAlpha is then a
   * harmless no-op. Same fix as `_ShrinkToThumbnail`. See lingo-builtins
   * `clearTransparent` + [[member-duplicate-not-implemented]].
   */
  callNamed("clearTransparent", t_rThumb)
  var t_rThumbAlpha = callNamed("image", meProp(_me, "m_rcThumbRect").width, meProp(_me, "m_rcThumbRect").height, 8, symbol("grayscale"));
  if (lingoBinary("gt", t_img2.width, t_img2.height)) {
  var t_iScale = lingoBinary("div", callNamed("float", t_rThumb.width), t_img2.width);
  var t_rcRect = callNamed("rect", 0, 0, t_rThumb.width, lingoBinary("mul", t_iScale, t_img2.height));
  var t_rcOff = new LingoList([0, lingoBinary("div", lingoBinary("sub", t_rThumb.height, t_rcRect.height), 2), 0, lingoBinary("div", lingoBinary("sub", t_rThumb.height, t_rcRect.height), 2)]);
  } else {
  t_iScale = lingoBinary("div", callNamed("float", t_rThumb.width), t_img2.height);
  t_rcRect = callNamed("rect", 0, 0, lingoBinary("mul", t_iScale, t_img2.width), t_rThumb.height);
  t_rcOff = new LingoList([lingoBinary("div", lingoBinary("sub", t_rThumb.width, t_rcRect.width), 2), 0, lingoBinary("div", lingoBinary("sub", t_rThumb.width, t_rcRect.width), 2), 0]);
  }

  var t_Alpha3 = callMethod("extractAlpha", t_img2);
  callMethod("copyPixels", t_rThumb, t_img2, lingoBinary("add", t_rcRect, t_rcOff), t_img2.rect, new LingoPropList([symbol("useFastQuads"), 1]))
  callMethod("copyPixels", t_rThumbAlpha, t_Alpha3, lingoBinary("add", t_rcRect, t_rcOff), t_img2.rect, new LingoPropList([symbol("useFastQuads"), 1]))
  callMethod("setAlpha", t_rThumb, t_rThumbAlpha)
  setThePropOf(t_rThumb, "useAlpha", 1);
  var t_mp_CachedImages = new LingoPropList([]);
  callMethod("addProp", t_mp_CachedImages, symbol("preview"), t_img2)
  callMethod("addProp", t_mp_CachedImages, symbol("thumb"), t_rThumb)
  callMethod("AddItemToCache", meProp(_me, "m_objThumbCache"), t_iPartNum, t_mp_CachedImages)
  if (lingoBinary("eq", meProp(_me, "m_sImageType"), "Preview")) {
  meProp(_me, "m_mp_ThumbList")[callNamed("string", t_iPartNum)] = t_img2;
  } else {
  meProp(_me, "m_mp_ThumbList")[callNamed("string", t_iPartNum)] = t_rThumb;
  }

  }

  }

}

