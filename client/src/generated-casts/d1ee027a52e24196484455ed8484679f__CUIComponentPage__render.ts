// d1ee027a52e24196484455ed8484679f.cct / CUIComponentPage / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe) {
  if (meProp(_me, "m_bNeedSorting")) {
  switch (meProp(_me, "m_iSortingOrder")) {
case symbol("alphabetical"):
  callMethod("sortComponentsAlphabetically", _me)
  break;
case symbol("fifo"):
case symbol("normal"):
  callNamed("nothing")
  break;
  default:
  callNamed("nothing")
  break;
  }

  setMeProp(_me, "m_bNeedSorting", 0);
  }

  var t_ar_visible = callMethod("getVisible", _me);
  var t_pOffset = callNamed("point", 0, 0);
  for (var t_rComponent of t_ar_visible.toArray()) {
  var t_pLoc = lingoBinary("add", callMethod("getPos", t_rComponent), t_pOffset);
  t_pOffset = lingoBinary("add", t_pOffset, callNamed("point", 0, lingoBinary("add", t_rComponent.m_iHeight, callMethod("GetPadding", t_rComponent))));
  }

  callMethod("resize", _me, meProp(_me, "m_iWidth"), t_pOffset.locV)
  setMeProp(_me, "m_rImg", callNamed("image", meProp(_me, "m_iWidth"), meProp(_me, "m_iHeight"), 32));
  setThePropOf(meProp(_me, "m_rImg"), "useAlpha", 1);
  var t_rMask = callNamed("image", meProp(_me, "m_iWidth"), meProp(_me, "m_iHeight"), 8, symbol("grayscale"));
  if (callNamed("objectp", meProp(_me, "m_rBgColor"))) {
  callMethod("fill", meProp(_me, "m_rImg"), meProp(_me, "m_rImg").rect, new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("lineSize"), 0, symbol("color"), meProp(_me, "m_rBgColor")]))
  } else {
  // HAND-CORRECTED: start TRANSPARENT. The original fills the 8-bit mask white
  // (index 0 = alpha 0) and setAlpha's it on; our setAlpha ignores an all-zero
  // mask (see its "EMPTY MASK" guard), so the buffer stayed opaque WHITE and the
  // rounded row art blended into white at its corners: a white outline round
  // every friend-list name. clearTransparent is what the mask means.
  callNamed("clearTransparent", meProp(_me, "m_rImg"))
  }

  t_pOffset = callNamed("point", 0, 0);
  for (var t_rComponent of t_ar_visible.toArray()) {
  var t_rImg = callMethod("render", t_rComponent, meProp(_me, "m_rWriter"));
  t_pLoc = lingoBinary("add", callMethod("getPos", t_rComponent), t_pOffset);
  callMethod("copyPixels", meProp(_me, "m_rImg"), t_rImg, lingoBinary("add", callNamed("rect", t_pLoc, t_pLoc), t_rImg.rect), t_rImg.rect)
  t_pOffset = lingoBinary("add", t_pOffset, callNamed("point", 0, lingoBinary("add", t_rComponent.m_iHeight, callMethod("GetPadding", t_rComponent))));
  }

  if (callNamed("objectp", meProp(_me, "m_rBgColor"))) {
  callMethod("fill", t_rMask, t_rMask.rect, new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("lineSize"), 0, symbol("color"), callNamed("rgb", "#000000")]))
  callMethod("setAlpha", meProp(_me, "m_rImg"), t_rMask)
  }

  return meProp(_me, "m_rImg");
}

