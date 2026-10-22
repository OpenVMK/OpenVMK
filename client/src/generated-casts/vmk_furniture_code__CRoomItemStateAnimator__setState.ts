// vmk_furniture_code.cct / CRoomItemStateAnimator / setState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setState(_me: LingoMe, a_iState: LingoValue, a_bInternal: LingoValue) {
  var t_rItem = callMethod("getObject", _me);
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "Set State Animation", a_iState), callMethod("GetParam", t_rItem, "TYPE")), callMethod("GetParam", t_rItem, "DIR")))
  if (lingoBinary("eq", a_iState, 0)) {
  callMethod("reset", _me)
  }

  t_rItem = callMethod("getObject", _me);
  if (lingoBinary("neq", a_iState, meProp(_me, "m_iState"))) {
  setMeProp(_me, "m_bReady", 0);
  }

  setMeProp(_me, "m_iState", a_iState);
  if (a_bInternal) {
  callMethod("SetParam", callMethod("getObject", _me), "STATE", callNamed("string", meProp(_me, "m_iState")))
  }

}

