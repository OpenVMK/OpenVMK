// vmk_casual.cct / CCasualGameManager / UnregisterGameModule

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UnregisterGameModule(_me: LingoMe, _this: LingoValue, a_rModule: LingoValue) {
  if (_this.valid) {
  callMethod("deleteProp", meProp(_me, "m_mp_iCode_rModule"), callMethod("GetGameTypeCode", a_rModule))
  }

}

