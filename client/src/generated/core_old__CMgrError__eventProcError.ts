// core.old.cct / CMgrError / eventProcError

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcError(_me: LingoMe, tEvent: LingoValue, tSprID: LingoValue, tParam: LingoValue) {
  if (lingoBinary("and", lingoBinary("eq", tEvent, symbol("mouseUp")), lingoBinary("eq", tSprID, "error_close"))) {
  callNamed("resetClient")
  }

}

