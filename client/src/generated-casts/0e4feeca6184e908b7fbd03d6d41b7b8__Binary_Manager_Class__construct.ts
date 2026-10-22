// 0e4feeca6184e908b7fbd03d6d41b7b8.cct / Binary Manager Class / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "pConnectionId", callNamed("getVariable", "connection.mus.id", symbol("mus")));
  setMeProp(_me, "pTimeOutID", "mus_close_delay");
  setMeProp(_me, "pQueue", new LingoList([]));
  setMeProp(_me, "m_checkingConnection", 0);
  setMeProp(_me, "pRecycleCount", 0);
  callNamed("registerMessage", symbol("recycleMusConnection"), callMethod("getID", _me), symbol("recycleConnection"))
  return callMethod("registerCmds", _me, 1);
}

