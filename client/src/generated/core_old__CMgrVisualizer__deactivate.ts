// core.old.cct / CMgrVisualizer / deactivate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deactivate(_me: LingoMe, tID: LingoValue) {
  if (callMethod("exists", _me, tID)) {
  callMethod("setDeactive", callMethod("get", _me, tID))
  return 1;
  } else {
  return 0;
  }

}

