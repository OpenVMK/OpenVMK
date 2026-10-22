// core.old.cct / CWindow / registerProcedure

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function registerProcedure(_me: LingoMe, _this: LingoValue, tMethod: LingoValue, tClientID: LingoValue, tEvent: LingoValue) {
  if (!lingoTruthy(callNamed("symbolp", tMethod))) {
  return callNamed("error", _this, lingoBinary("joinPad", "Symbol expected:", tMethod), symbol("registerProcedure"));
  }

  if (!lingoTruthy(callNamed("objectExists", tClientID))) {
  return callNamed("error", _this, lingoBinary("joinPad", "Object not found:", tClientID), symbol("registerProcedure"));
  }

  if (callNamed("voidp", tEvent)) {
  for (var i = 1; i <= meProp(_me, "pProcedures").count; ++i) {
  meProp(_me, "pProcedures")[i] = new LingoList([tMethod, tClientID]);
  }

  } else {
  meProp(_me, "pProcedures")[tEvent] = new LingoList([tMethod, tClientID]);
  }

  return 1;
}

