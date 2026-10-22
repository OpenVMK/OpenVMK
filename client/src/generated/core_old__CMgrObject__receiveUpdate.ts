// core.old.cct / CMgrObject / receiveUpdate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function receiveUpdate(_me: LingoMe, _this: LingoValue, tID: LingoValue) {
  if (callNamed("voidp", meProp(_me, "pObjectList")[tID])) {
  return 0;
  }

  if (lingoBinary("gt", callMethod("getPos", meProp(_me, "pUpdateList"), meProp(_me, "pObjectList")[tID]), 0)) {
  return 0;
  }

  callMethod("add", meProp(_me, "pUpdateList"), meProp(_me, "pObjectList")[tID])
  if (!lingoTruthy(meProp(_me, "pUpdatePause"))) {
  if (callNamed("voidp", meProp(_me, "pTimeOut"))) {
  setMeProp(_me, "pTimeOut", callMethod("new", callNamed("timeout", lingoBinary("join", "objectmanager", theProperty("milliSeconds"))), lingoBinary("mul", lingoBinary("mul", 60, 1000), 60), symbol("null"), _this));
  }

  }

  return 1;
}

