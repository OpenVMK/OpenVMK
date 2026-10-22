// core.old.cct / CMgrConnection / unregisterCommands

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function unregisterCommands(_me: LingoMe, tID: LingoValue, tObjID: LingoValue, tCmdList: LingoValue) {
  if (lingoBinary("and", lingoBinary("neq", callNamed("ilk", tID), symbol("symbol")), lingoBinary("neq", callNamed("ilk", tID), symbol("string")))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Invalid message header ID:", tID), symbol("unregisterCommands"));
  }

  var tPtr = meProp(_me, "pCommandsList")[tID];
  if (callNamed("voidp", tPtr)) {
  return 0;
  }

  return 1;
}

