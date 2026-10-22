// vmk_3.dcr / CMgrObject222 / removePrepare

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function removePrepare(_me: LingoMe, _this: LingoValue, tID: LingoValue) {
  if (callNamed("voidp", _this.pObjectList[tID])) {
  return 0;
  }

  if (lingoBinary("lt", callNamed("getOne", _this.pPrepareList, _this.pObjectList[tID]), 1)) {
  return 0;
  }

  callNamed("deleteOne", _this.pPrepareList, _this.pObjectList[tID])
  if (lingoBinary("and", lingoBinary("eq", _this.pUpdateList.count, 0), lingoBinary("eq", _this.pPrepareList.count, 0))) {
  if (callNamed("objectp", _this.pTimeOut)) {
  callNamed("forget", _this.pTimeOut)
  setThePropOf(_this, "pTimeOut", undefined);
  return 1;
  }

  }

}

