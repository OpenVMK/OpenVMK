// core.old.cct / CWindowElementWrapper / hide

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function hide(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "pVisible", 0);
  setThePropOf(meProp(_me, "pSprite"), "visible", 0);
  return 1;
}

