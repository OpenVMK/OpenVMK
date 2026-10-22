// core.old.cct / CEventBroker / registerProcedure

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function registerProcedure(_me: LingoMe, _this: LingoValue, tMethod: LingoValue, tClientID: LingoValue, tEvent: LingoValue) {
  if (callNamed("voidp", meProp(_me, "pProcList"))) {
  setMeProp(_me, "pProcList", callMethod("createProcListTemplate", _this));
  }

  if (lingoBinary("and", callNamed("voidp", tEvent), callNamed("voidp", tMethod))) {
  for (var i = 1; i <= meProp(_me, "pProcList").count; ++i) {
  meProp(_me, "pProcList")[i] = new LingoList([callMethod("getPropAt", meProp(_me, "pProcList"), i), tClientID]);
  }

  } else {
  if (callNamed("voidp", tEvent)) {
  for (var i = 1; i <= meProp(_me, "pProcList").count; ++i) {
  meProp(_me, "pProcList")[i] = new LingoList([tMethod, tClientID]);
  }

  } else {
  if (callNamed("voidp", tMethod)) {
  tMethod = tEvent;
  }

  meProp(_me, "pProcList")[tEvent] = new LingoList([tMethod, tClientID]);
  }

  }

  return 1;
}

