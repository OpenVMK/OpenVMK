// core.old.cct / CMgrVisualizer / hideAll

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function hideAll(_me: LingoMe) {
  for (var tItem of _me.pItemList.toArray()) {
  var tObj = callMethod("get", _me, tItem);
  if (callMethod("getProperty", tObj, symbol("visible"))) {
  callMethod("hide", tObj)
  callMethod("add", meProp(_me, "pHideList"), tItem)
  }

  }

  return 1;
}

