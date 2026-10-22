// core.old.cct / CMgrVisualizer / Activate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Activate(_me: LingoMe, tID: LingoValue) {
  if (callMethod("exists", _me, tID)) {
  setMeProp(_me, "pActiveItem", tID);
  callMethod("setActive", callMethod("get", _me, tID))
  return 1;
  } else {
  return 0;
  }

}

