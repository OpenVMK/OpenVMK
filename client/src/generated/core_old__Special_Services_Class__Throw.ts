// core.old.cct / Special Services Class / Throw

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Throw(_me: LingoMe, a_cErrStr: LingoValue) {
  setMeProp(_me, "pCatchFlag", 1);
  if (callNamed("stringp", a_cErrStr)) {
  setMeProp(_me, "pLastErrStr", a_cErrStr);
  } else {
  setMeProp(_me, "pLastErrStr", "");
  }

}

