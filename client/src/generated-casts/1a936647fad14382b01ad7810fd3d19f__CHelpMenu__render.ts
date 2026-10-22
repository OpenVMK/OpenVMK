// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpMenu / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe, a_bPageNotFound: LingoValue) {
  if (lingoBinary("and", callNamed("voidp", meProp(_me, "pActiveTopic")), (lingoTruthy(a_bPageNotFound) ? 0 : 1))) {
  callMethod("setFirstPageActive", _me)
  }

  var visibleItems = callMethod("getVisible", _me);
  callMethod("fill", meProp(_me, "pImg"), meProp(_me, "pImg").rect, new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("color"), meProp(_me, "m_fillColor")]))
  var i = 0;
  for (var helpitem of visibleItems.toArray()) {
  callMethod("update", helpitem.item)
  callMethod("render", helpitem.item, meProp(_me, "pImg"), i)
  i = lingoBinary("add", i, 1);
  }

}

