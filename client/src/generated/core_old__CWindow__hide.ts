// core.old.cct / CWindow / hide

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function hide(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("eq", meProp(_me, "pVisible"), 1)) {
  setMeProp(_me, "pVisible", 0);
  callMethod("moveX", _this, 10000)
  return 1;
  }

  return 0;
}

