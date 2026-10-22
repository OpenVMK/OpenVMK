// core.old.cct / CMgrError / SystemAlert

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SystemAlert(_me: LingoMe, tObject: LingoValue, tMsg: LingoValue, tMethod: LingoValue) {
  return callMethod("error", _me, tObject, tMsg, tMethod);
}

