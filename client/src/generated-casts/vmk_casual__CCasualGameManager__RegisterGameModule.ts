// vmk_casual.cct / CCasualGameManager / RegisterGameModule

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RegisterGameModule(_me: LingoMe, _this: LingoValue, a_rModule: LingoValue) {
  if (_this.valid) {
  var t_iCode = callMethod("GetGameTypeCode", a_rModule);
  if (callNamed("voidp", callMethod("getaProp", meProp(_me, "m_mp_iCode_rModule"), t_iCode))) {
  callMethod("setaProp", meProp(_me, "m_mp_iCode_rModule"), t_iCode, a_rModule)
  } else {
  callNamed("error", _this, "Given module already registered!", symbol("RegisterGameModule"))
  }

  }

}

