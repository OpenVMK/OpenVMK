// core.old.cct / CWindowElementWrapper / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  callNamed("call", symbol("deconstruct"), meProp(_me, "pElemList"))
  setMeProp(_me, "pElemList", new LingoList([]));
  setMeProp(_me, "pBuffer", undefined);
  setMeProp(_me, "pSprite", undefined);
  return 1;
}

