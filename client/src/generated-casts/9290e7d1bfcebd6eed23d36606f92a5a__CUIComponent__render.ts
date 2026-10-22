// 9290e7d1bfcebd6eed23d36606f92a5a.cct / CUIComponent / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe, t_rWriter: LingoValue) {
  var t_bNeedUpdate = 0;
  for (var t_rScale of meProp(_me, "m_ar_layouts").toArray()) {
  if (t_rScale.m_bNeedUpdate) {
  t_bNeedUpdate = 1;
  break;
  }

  }

  if ((lingoTruthy(t_bNeedUpdate) ? 0 : 1)) {
  return meProp(_me, "m_rImg");
  }

  setMeProp(_me, "m_rImg", callNamed("image", meProp(_me, "m_iWidth"), meProp(_me, "m_iHeight"), 32));
  setThePropOf(meProp(_me, "m_rImg"), "useAlpha", 1);
  var t_rMask = callNamed("image", meProp(_me, "m_iWidth"), meProp(_me, "m_iHeight"), 8, symbol("grayscale"));
  var t_rBgColor = meProp(_me, "m_rBgColor");
  if (lingoBinary("and", lingoBinary("or", meProp(_me, "m_bActive"), meProp(_me, "m_bShowAsActive")), callNamed("objectp", meProp(_me, "m_rActiveColor")))) {
  t_rBgColor = meProp(_me, "m_rActiveColor");
  }

  if (callNamed("objectp", t_rBgColor)) {
  callMethod("fill", meProp(_me, "m_rImg"), meProp(_me, "m_rImg").rect, new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("lineSize"), 0, symbol("color"), t_rBgColor]))
  } else {
  // HAND-CORRECTED: start TRANSPARENT. The original fills the 8-bit mask white
  // (index 0 = alpha 0) and setAlpha's it on; our setAlpha ignores an all-zero
  // mask (see its "EMPTY MASK" guard), so the buffer stayed opaque WHITE and the
  // rounded row art blended into white at its corners: a white outline round
  // every friend-list name. clearTransparent is what the mask means.
  callNamed("clearTransparent", meProp(_me, "m_rImg"))
  }

  if (callNamed("objectp", meProp(_me, "m_rBackground"))) {
  switch (callNamed("ilk", meProp(_me, "m_rBackground"))) {
case symbol("instance"):
  callMethod("resize", meProp(_me, "m_rBackground"), meProp(_me, "m_iWidth"), meProp(_me, "m_iHeight"))
  var t_rBgImg = callMethod("render", meProp(_me, "m_rBackground"));
  break;
case symbol("image"):
  t_rBgImg = meProp(_me, "m_rBackground");
  break;
  default:
  t_rBgImg = callNamed("image", 0, 0, 32);
  }

  callMethod("copyPixels", meProp(_me, "m_rImg"), t_rBgImg, t_rBgImg.rect, t_rBgImg.rect, new LingoPropList([symbol("maskImage"), callMethod("extractAlpha", t_rBgImg)]))
  }

  for (var t_rScale of meProp(_me, "m_ar_layouts").toArray()) {
  var t_pLoc = callMethod("getPos", t_rScale);
  var t_rImg = callMethod("render", t_rScale, t_rWriter);
  if (lingoBinary("and", callMethod("isMask", t_rScale), callNamed("objectp", meProp(_me, "m_rBgColor")))) {
  callMethod("copyPixels", meProp(_me, "m_rImg"), t_rImg, lingoBinary("add", callNamed("rect", t_pLoc, t_pLoc), t_rImg.rect), t_rImg.rect, new LingoPropList([symbol("blend"), t_rScale.m_iBlend, symbol("maskImage"), callMethod("extractAlpha", t_rImg)]))
  continue;
  }

  callMethod("copyPixels", meProp(_me, "m_rImg"), t_rImg, lingoBinary("add", callNamed("rect", t_pLoc, t_pLoc), t_rImg.rect), t_rImg.rect, new LingoPropList([symbol("blend"), t_rScale.m_iBlend]))
  }

  if (callNamed("objectp", meProp(_me, "m_rBgColor"))) {
  callMethod("fill", t_rMask, t_rMask.rect, new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("lineSize"), 0, symbol("color"), callNamed("rgb", "#000000")]))
  callMethod("setAlpha", meProp(_me, "m_rImg"), t_rMask)
  }

  return meProp(_me, "m_rImg");
}

