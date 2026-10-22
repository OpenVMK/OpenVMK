// 0e4feeca6184e908b7fbd03d6d41b7b8.cct / Binary Manager Class / checkRecycleCount

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function checkRecycleCount(_me: LingoMe) {
  if (lingoBinary("gt", meProp(_me, "pRecycleCount"), callNamed("getVariableValue", "connection.mus.maxretries", 6))) {
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "MUSConnectionProblem", 1, 1);
  callMethod("show", t)
  callMethod("setText", t, callNamed("getText", "phototransfer.error.could.not.connect"), callNamed("getText", "phototransfer.error.title"), "OK")
  callNamed("unregisterMessage", symbol("recycleMusConnection"), callMethod("getID", _me))
  return 0;
  }

  return 1;
}

