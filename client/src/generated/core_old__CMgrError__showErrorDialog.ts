// core.old.cct / CMgrError / showErrorDialog

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showErrorDialog(_me: LingoMe, tErr: LingoValue, tMsgA: LingoValue, tMsgB: LingoValue) {
  if (lingoBinary("neq", callNamed("createWindow", symbol("error"), "error.window", 0, 0, symbol("modal")), 0)) {
  callMethod("registerClient", callNamed("getWindow", symbol("error")), callMethod("getID", _me))
  callMethod("registerProcedure", callNamed("getWindow", symbol("error")), symbol("eventProcError"), callMethod("getID", _me), symbol("mouseUp"))
  return 1;
  } else {
  return 0;
  }

}

