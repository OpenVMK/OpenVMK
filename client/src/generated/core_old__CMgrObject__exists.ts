// core.old.cct / CMgrObject / exists

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function exists(_me: LingoMe, _this: LingoValue, tID: LingoValue) {
  if (callNamed("voidp", tID)) {
  return 0;
  }

  return callNamed("objectp", meProp(_me, "pObjectList")[tID]);
}

