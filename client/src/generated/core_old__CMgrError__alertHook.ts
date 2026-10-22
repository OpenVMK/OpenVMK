// core.old.cct / CMgrError / alertHook

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function alertHook(_me: LingoMe, tErr: LingoValue, tMsgA: LingoValue, tMsgB: LingoValue) {
  callMethod("set", callNamed("getObject", symbol("session")), "client_crashtime", theProperty("long time"))
  callMethod("showErrorDialog", _me, tErr, tMsgA, tMsgB)
  callNamed("pauseUpdate")
  return 1;
}

