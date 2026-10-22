// vmk_3.dcr / CMgrObject222 / receivePrepare

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function receivePrepare(_me: LingoMe, _this: LingoValue, tID: LingoValue) {
  if (callNamed("voidp", _this.pObjectList[tID])) {
  return 0;
  }

  if (lingoBinary("gt", callNamed("getPos", _this.pPrepareList, _this.pObjectList[tID]), 0)) {
  return 0;
  }

  callMethod("add", _this.pPrepareList, _this.pObjectList[tID])
  if ((lingoTruthy(_this.pUpdatePause) ? 0 : 1)) {
  if (callNamed("voidp", _this.pTimeOut)) {
  setThePropOf(_this, "pTimeOut", callMethod("new", callNamed("timeout", lingoBinary("join", "objectmanager", theProperty("milliSeconds"))), lingoBinary("mul", lingoBinary("mul", 60, 1000), 60), symbol("null"), _this));
  return 1;
  }

  }

}

