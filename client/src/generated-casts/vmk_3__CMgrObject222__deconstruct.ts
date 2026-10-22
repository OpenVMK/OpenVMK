// vmk_3.dcr / CMgrObject222 / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  setThePropOf(_this, "pEraseLock", 1);
  if (callNamed("objectp", _this.pTimeOut)) {
  callNamed("forget", _this.pTimeOut)
  setThePropOf(_this, "pTimeOut", undefined);
  var i = _this.pInstanceList.count;
  while (lingoBinary("gte", i, 1)) {
  callMethod("Remove", _this, _this.pInstanceList[i])
  i = lingoBinary("add", i, 255);
  }

  i = _this.pManagerList.count;
  while (lingoBinary("gte", i, 1)) {
  callMethod("Remove", _this, _this.pManagerList[i])
  i = lingoBinary("add", i, 255);
  }

  setThePropOf(_this, "pObjectList", callNamed("propList"));
  setThePropOf(_this, "pUpdateList", new LingoList([]));
  setThePropOf(_this, "pPrepareList", new LingoList([]));
  }

}

