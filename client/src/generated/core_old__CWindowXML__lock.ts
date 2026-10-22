// core.old.cct / CWindowXML / lock

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function lock(_me: LingoMe, _this: LingoValue, a_bBool: LingoValue) {
  if (callNamed("voidp", a_bBool)) {
  a_bBool = 1;
  }

  setMeProp(_me, "pLock", a_bBool);
  return 1;
}

