// core.old.cct / CEventBroker / redirectEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function redirectEvent(_me: LingoMe, _this: LingoValue, tEvent: LingoValue) {
  if (callNamed("voidp", meProp(_me, "pProcList"))) {
  setMeProp(_me, "pProcList", callMethod("createProcListTemplate", _this));
  }

  if (!lingoTruthy(meProp(_me, "pProcList")[tEvent][2])) {
  return 0;
  }

  if (!lingoTruthy(callNamed("objectExists", meProp(_me, "pProcList")[tEvent][2]))) {
  return 0;
  }

  return callNamed("call", meProp(_me, "pProcList")[tEvent][1], callNamed("getObject", meProp(_me, "pProcList")[tEvent][2]), tEvent, meProp(_me, "id"));
}

