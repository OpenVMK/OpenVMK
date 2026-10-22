// core.old.cct / CWindow / elementExists

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function elementExists(_me: LingoMe, _this: LingoValue, a_sID: LingoValue) {
  return !lingoTruthy(callNamed("voidp", meProp(_me, "pElemList")[a_sID]));
}

