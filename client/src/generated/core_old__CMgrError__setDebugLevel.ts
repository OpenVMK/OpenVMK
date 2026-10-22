// core.old.cct / CMgrError / setDebugLevel

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setDebugLevel(_me: LingoMe, tDebugLevel: LingoValue) {
  if (!lingoTruthy(callNamed("integerp", tDebugLevel))) {
  return 0;
  }

  setMeProp(_me, "pDebugLevel", tDebugLevel);
  if (lingoBinary("gte", callNamed("float", theProperty("productVersion").char.range(1, 3)), 8.5)) {
  if (lingoBinary("gt", meProp(_me, "pDebugLevel"), 0)) {
  setTheProperty("debugPlaybackEnabled", 1);
  }

  }

  return 1;
}

