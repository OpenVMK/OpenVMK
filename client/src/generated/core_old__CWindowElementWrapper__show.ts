// core.old.cct / CWindowElementWrapper / show

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function show(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "pVisible", 1);
  setThePropOf(meProp(_me, "pSprite"), "visible", 1);
  return 1;
}

