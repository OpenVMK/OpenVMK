// core.old.cct / Special Services API / catch

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _catch(_me: LingoMe, a_sErrStr: LingoValue) {
  return callMethod("catch", callNamed("getSpecialServices"), a_sErrStr);
}

