// vmk_3.dcr / CMgrObject222 / Remove

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Remove(_me: LingoMe, _this: LingoValue, tID: LingoValue) {
  var tObj = _this.pObjectList[tID];
  if (_this.m_bLogger) {
  var t_sDelim = theProperty("itemDelimiter");
  var t_sCls = callNamed("string", tObj);
  if (callNamed("voidp", tObj)) {
  return 0;
  }

  if (callNamed("ilk", tObj, symbol("instance"))) {
  if ((lingoTruthy(tObj.valid) ? 0 : 1)) {
  return 0;
  var i = 1;
  while (lingoBinary("lte", i, tObj.delays.count)) {
  var tDelayID = callNamed("getPropAt", tObj.delays, i);
  callNamed("cancel", tObj, tDelayID)
  i = lingoBinary("add", i, 1);
  }

  callMethod("deconstruct", tObj)
  setThePropOf(_this, "valid", 0);
  callNamed("deleteOne", _this.pUpdateList, tObj)
  callNamed("deleteOne", _this.pPrepareList, tObj)
  tObj = undefined;
  if ((lingoTruthy(_this.pEraseLock) ? 0 : 1)) {
  callNamed("deleteProp", _this.pObjectList, tID)
  callNamed("deleteOne", _this.pInstanceList, tID)
  callNamed("deleteOne", _this.pManagerList, tID)
  return 1;
  }

  }

  }

  }

}

