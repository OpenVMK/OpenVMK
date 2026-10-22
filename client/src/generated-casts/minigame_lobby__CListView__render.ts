// minigame_lobby.cct / CListView / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe) {
  setMeProp(_me, "m_pImage", callNamed("image", meProp(_me, "m_iWidth"), lingoBinary("mul", meProp(_me, "m_iItemHeight"), meProp(_me, "m_ar_pItems").count), 8));
  callMethod("fill", meProp(_me, "m_pImage"), meProp(_me, "m_pImage").rect, new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("color"), meProp(_me, "m_fillColor")]))
  callNamed("call", symbol("render"), meProp(_me, "m_ar_pItems"))
  var i = 0;
  for (var tItem of meProp(_me, "m_ar_pItems").toArray()) {
  var tImage = callMethod("getImage", tItem);
  var tdestrect = callNamed("rect", 0, lingoBinary("mul", i, meProp(_me, "m_iItemHeight")), tImage.rect.right, lingoBinary("add", lingoBinary("mul", i, meProp(_me, "m_iItemHeight")), tImage.rect.bottom));
  callMethod("copyPixels", meProp(_me, "m_pImage"), tImage, tdestrect, tImage.rect)
  i = lingoBinary("add", i, 1);
  }

  return meProp(_me, "m_pImage");
}

