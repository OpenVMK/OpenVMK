// core.old.cct / CObject / cancel

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function cancel(_me: LingoMe, _this: LingoValue, a_sDelayID: LingoValue) {
  if (callNamed("voidp", _this.delays[a_sDelayID])) {
  return 0;
  }

  callMethod("forget", callNamed("timeout", a_sDelayID))
  return callMethod("deleteProp", _this.delays, a_sDelayID);
}

