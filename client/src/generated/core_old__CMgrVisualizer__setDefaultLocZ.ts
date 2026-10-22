// core.old.cct / CMgrVisualizer / setDefaultLocZ

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setDefaultLocZ(_me: LingoMe, tvalue: LingoValue) {
  if (callNamed("integerp", tvalue)) {
  setMeProp(_me, "pDefaultLocZ", tvalue);
  return callMethod("Activate", _me);
  } else {
  return callNamed("error", _me, lingoBinary("joinPad", "integer expected:", tvalue), symbol("setDefaultLocZ"));
  }

}

