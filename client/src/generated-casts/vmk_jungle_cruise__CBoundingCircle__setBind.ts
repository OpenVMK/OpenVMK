// vmk_jungle_cruise.cct / CBoundingCircle / setBind

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setBind(_me: LingoMe, tCircle: LingoValue) {
  setMeProp(_me, "bind", tCircle);
  setMeProp(_me, "bindDistance", lingoBinary("sub", tCircle.origin, meProp(_me, "origin")));
}

