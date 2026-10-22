// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryComponent / _SetState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _SetState(_me: LingoMe, _this: LingoValue, a_kState: LingoValue) {
  switch (a_kState) {
case symbol("reset"):
  setMeProp(_me, "m_kState", a_kState);
  break;
case symbol("load"):
  if (lingoBinary("eq", meProp(_me, "m_kState"), symbol("reset"))) {
  callMethod("_RequestItemList", _this)
  setMeProp(_me, "m_kState", a_kState);
  } else {
  }

  break;
case symbol("wait"):
  setMeProp(_me, "m_kState", a_kState);
  break;
case symbol("ready"):
  setMeProp(_me, "m_kState", a_kState);
  break;
  default:
  callNamed("error", _this, lingoBinary("joinPad", "Unknown state:", a_kState), symbol("_SetState"))
  }

}

