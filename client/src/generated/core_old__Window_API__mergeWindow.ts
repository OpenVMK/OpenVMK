// core.old.cct / Window API / mergeWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function mergeWindow(_me: LingoMe, a_sID: LingoValue, a_sLayout: LingoValue) {
  if (callNamed("windowExists", a_sID)) {
  return callMethod("merge", callNamed("getWindow", a_sID), a_sLayout);
  } else {
  return 0;
  }

}

