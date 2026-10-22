// core.old.cct / CMgrVisualizer / showAll

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showAll(_me: LingoMe) {
  for (var tItem of meProp(_me, "pHideList").toArray()) {
  var tObj = callMethod("get", _me, tItem);
  if (lingoBinary("neq", tObj, 0)) {
  callMethod("show", tObj)
  }

  }

  setMeProp(_me, "pHideList", new LingoList([]));
  return 1;
}

