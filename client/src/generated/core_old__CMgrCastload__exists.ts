// core.old.cct / CMgrCastload / exists

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function exists(_me: LingoMe, _this: LingoValue, tCastName: LingoValue) {
  if (lingoBinary("eq", tCastName, "internal")) {
  return 1;
  }

  if (callNamed("voidp", meProp(_me, "pLoadedCasts")[tCastName])) {
  return 0;
  } else {
  return 1;
  }

}

