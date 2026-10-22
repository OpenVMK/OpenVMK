// core.old.cct / CEventBroker / mouseDown

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function mouseDown(_me: LingoMe, _this: LingoValue) {
  if (!lingoTruthy(callNamed("voidp", meProp(_me, "pProcList")))) {
  callMethod("set", callNamed("getObject", symbol("session")), "client_lastclick", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", meProp(_me, "id"), "->"), meProp(_me, "pProcList")[symbol("mouseDown")][2]), "/"), theProperty("long time")))
  }

  if (callMethod("redirectEvent", _this, symbol("mouseDown"))) {
  callNamed("stopEvent")
  return 1;
  } else {
  callNamed("pass")
  return 0;
  }

}

