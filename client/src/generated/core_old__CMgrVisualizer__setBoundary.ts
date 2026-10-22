// core.old.cct / CMgrVisualizer / setBoundary

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setBoundary(_me: LingoMe, tvalue: LingoValue) {
  if (lingoBinary("and", !lingoTruthy(callNamed("listp", tvalue)), !lingoTruthy(callNamed("ilk", tvalue, symbol("rect"))))) {
  return callNamed("error", _me, lingoBinary("joinPad", "List or rect expected:", tvalue), symbol("setBoundary"));
  }

  meProp(_me, "pBoundary")[1] = tvalue[1];
  meProp(_me, "pBoundary")[2] = tvalue[2];
  meProp(_me, "pBoundary")[3] = tvalue[3];
  meProp(_me, "pBoundary")[4] = tvalue[4];
  callNamed("call", symbol("moveBy"), _me.pItemList, 0, 0)
  return 1;
}

