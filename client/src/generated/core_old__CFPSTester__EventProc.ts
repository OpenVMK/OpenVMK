// core.old.cct / CFPSTester / EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function EventProc(_me: LingoMe, _this: LingoValue, a_kEvent: LingoValue, a_sElemID: LingoValue, a_vParam: LingoValue) {
  if (lingoBinary("eq", a_sElemID, "close")) {
  return callNamed("removeObject", callMethod("getID", _this));
  } else {
  return 0;
  }

}

