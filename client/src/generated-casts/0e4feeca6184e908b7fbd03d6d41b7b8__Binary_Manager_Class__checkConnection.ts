// 0e4feeca6184e908b7fbd03d6d41b7b8.cct / Binary Manager Class / checkConnection

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function checkConnection(_me: LingoMe) {
  if ((lingoTruthy(callNamed("multiuserExists", meProp(_me, "pConnectionId"))) ? 0 : 1)) {
  return callNamed("error", _me, lingoBinary("joinPad", "MUS connection not found:", meProp(_me, "pConnectionId")), symbol("checkConnection"));
  }

  if (callMethod("connectionReady", callNamed("getMultiuser", meProp(_me, "pConnectionId")))) {
  callMethod("send", callNamed("getMultiuser", meProp(_me, "pConnectionId")), lingoBinary("joinPad", "LOGIN", callMethod("get", callNamed("getObject", symbol("session")), "sessionID")))
  callMethod("next", _me)
  } else {
  callMethod("delay", _me, 2000, symbol("checkConnection"))
  }

}

