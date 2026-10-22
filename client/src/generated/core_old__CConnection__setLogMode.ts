// core.old.cct / CConnection / setLogMode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setLogMode(_me: LingoMe, tMode: LingoValue) {
  if (lingoBinary("neq", callNamed("ilk", tMode), symbol("integer"))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Invalid argument:", tMode), symbol("setLogMode"));
  }

  setMeProp(_me, "pLogMode", tMode);
  if (lingoBinary("eq", meProp(_me, "pLogMode"), 2)) {
  if (callNamed("memberExists", "connectionLog.text")) {
  setMeProp(_me, "pLogfield", callNamed("member", callNamed("getmemnum", "connectionLog.text")));
  } else {
  setMeProp(_me, "pLogfield", undefined);
  setMeProp(_me, "pLogMode", 1);
  }

  }

  return 1;
}

