// core.old.cct / CMgrObject / resumeUpdate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function resumeUpdate(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("and", lingoBinary("gt", meProp(_me, "pUpdateList").count, 0), callNamed("voidp", meProp(_me, "pTimeOut")))) {
  setMeProp(_me, "pTimeOut", callMethod("new", callNamed("timeout", lingoBinary("join", "objectmanager", theProperty("milliSeconds"))), lingoBinary("mul", lingoBinary("mul", 60, 1000), 60), symbol("null"), _this));
  }

  setMeProp(_me, "pUpdatePause", 0);
  return 1;
}

