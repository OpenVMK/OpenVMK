// core.old.cct / CWindow / getElement

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getElement(_me: LingoMe, _this: LingoValue, a_sID: LingoValue) {
  var tElement = meProp(_me, "pElemList")[a_sID];
  if (callNamed("voidp", tElement)) {
  return 0;
  }

  return tElement;
}

