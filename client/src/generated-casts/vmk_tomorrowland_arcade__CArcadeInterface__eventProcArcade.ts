// vmk_tomorrowland_arcade.cct / CArcadeInterface / eventProcArcade

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcArcade(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParam: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  switch (1) {
case lingoBinary("eq", tElemID, "arcade.return"):
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callMethod("send", callNamed("getConnection", "VMK"), "LeaveArcade")
  return 1;
case lingoBinary("eq", tElemID, "arcade.open"):
  callMethod("OpenArcade", _me)
  return 1;
  default:
  callNamed("put", tElemID)
  }

}

