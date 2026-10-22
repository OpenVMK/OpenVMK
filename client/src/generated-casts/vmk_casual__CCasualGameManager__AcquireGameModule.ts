// vmk_casual.cct / CCasualGameManager / AcquireGameModule

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AcquireGameModule(_me: LingoMe, _this: LingoValue, a_rOutput: LingoValue) {
  for (var i = 1; i <= a_rOutput.count; ++i) {
  var t_iCode = callMethod("getPropAt", a_rOutput, i);
  var t_rModule = callMethod("getaProp", meProp(_me, "m_mp_iCode_rModule"), t_iCode);
  a_rOutput[i] = t_rModule;
  }

}

