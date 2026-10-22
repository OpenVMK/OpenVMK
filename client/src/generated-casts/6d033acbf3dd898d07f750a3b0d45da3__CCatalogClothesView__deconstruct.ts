// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogClothesView / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rGridRenderer"))) {
  callMethod("deconstruct", meProp(_me, "m_rGridRenderer"))
  setMeProp(_me, "m_rGridRenderer", undefined);
  }

  if (callNamed("objectp", meProp(_me, "m_rPrevierRenderer"))) {
  callMethod("deconstruct", meProp(_me, "m_rPrevierRenderer"))
  setMeProp(_me, "m_rPrevierRenderer", undefined);
  }

  if (callNamed("objectp", meProp(_me, "m_rGridLoadAnim"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rGridLoadAnim")))
  setMeProp(_me, "m_rGridLoadAnim", undefined);
  }

  var m_iPageToShow = undefined;
  callNamed("unregisterMessage", "showCatalogPage")
  return 1;
}

