// vmk_casual.cct / CCasualGameManager / ShowInterface

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowInterface(_me: LingoMe, _this: LingoValue, a_iGameCode: LingoValue, a_kInterface: LingoValue) {
  var t_rModule = callMethod("getaProp", meProp(_me, "m_mp_iCode_rModule"), a_iGameCode);
  if (callNamed("objectp", t_rModule)) {
  callMethod("ShowInterface", t_rModule, a_kInterface)
  }

}

