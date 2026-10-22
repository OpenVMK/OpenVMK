// core.old.cct / CWindow / getClientRect

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getClientRect(_me: LingoMe, _this: LingoValue) {
  return callNamed("rect", meProp(_me, "pLocX"), meProp(_me, "pLocY"), lingoBinary("add", meProp(_me, "pLocX"), meProp(_me, "pwidth")), lingoBinary("add", meProp(_me, "pLocY"), meProp(_me, "pheight")));
}

