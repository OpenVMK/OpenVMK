// 02a651b7c670fb161ce1a3e4d28713a1.cct / CMessageBar / setEditable

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setEditable(_me: LingoMe, t_bState: LingoValue) {
  if ((lingoTruthy(lingoBinary("eq", callMethod("get", callNamed("getObject", symbol("session")), "IsTrading"), 1)) ? 0 : 1)) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWndTitle"));
  if (lingoBinary("neq", tWndObj, 0)) {
  var tElem = callMethod("getElement", tWndObj, "chat.field");
  if (lingoBinary("neq", tElem, 0)) {
  callMethod("setEdit", tElem, t_bState)
  if (t_bState) {
  setThePropOf(tElem.pMember, "selection", meProp(_me, "m_ar_lastSelection"));
  } else {
  callMethod("setFocus", tElem, 0)
  }

  }

  }

  }

}

