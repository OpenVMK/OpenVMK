// core.old.cct / CEventBroker / removeProcedure

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function removeProcedure(_me: LingoMe, _this: LingoValue, tEvent: LingoValue) {
  if (callNamed("voidp", tEvent)) {
  setMeProp(_me, "pProcList", callMethod("createProcListTemplate", _this));
  } else {
  if (lingoBinary("neq", callMethod("getaProp", meProp(_me, "pProcList"), tEvent), undefined)) {
  meProp(_me, "pProcList")[tEvent] = new LingoList([symbol("null"), 0]);
  }

  }

  return 1;
}

