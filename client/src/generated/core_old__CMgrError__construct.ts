// core.old.cct / CMgrError / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  if (!lingoTruthy(lingoBinary("contains", theProperty("runMode"), "Author"))) {
  setTheProperty("alertHook", _me);
  }

  setMeProp(_me, "pDebugLevel", 1);
  setMeProp(_me, "pErrorCache", "");
  setMeProp(_me, "pCacheSize", 30);
  return 1;
}

