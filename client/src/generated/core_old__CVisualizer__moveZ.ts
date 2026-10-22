// core.old.cct / CVisualizer / moveZ

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function moveZ(_me: LingoMe, tZ: LingoValue) {
  if (!lingoTruthy(callNamed("integerp", tZ))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Integer expected:", tZ), symbol("moveZ"));
  }

  for (var i = 1; i <= meProp(_me, "pSpriteList").count; ++i) {
  setThePropOf(meProp(_me, "pSpriteList")[i], "locZ", lingoBinary("sub", lingoBinary("add", tZ, i), 1));
  }

  setMeProp(_me, "pLocZ", tZ);
}

