// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageItems / merge

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function merge(_me: LingoMe, _this: LingoValue, a_rWindow: LingoValue) {
  setMeProp(_me, "m_rWindow", a_rWindow);
  if (callMethod("merge", meProp(_me, "m_rWindow"), "vmk_inv_furniture.window")) {
  if (lingoBinary("eq", callMethod("get", callNamed("getObject", symbol("session")), "RoomType"), symbol("public"))) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.place.button"), symbol("blend"), 50)
  } else {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.place.button"), symbol("blend"), 100)
  }

  return 1;
  } else {
  return 0;
  }

}

