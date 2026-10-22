// vmk_3.dcr /  / unregisterObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function unregisterObject(_me: LingoMe, _this: LingoValue, tID: LingoValue) {
  if (callNamed("voidp", _this.pObjectList[tID])) {
  return callNamed("error", _this, lingoBinary("join", "Referred object not found:", tID), symbol("unregister"));
  }

  var tObj = _this.pObjectList[tID];
  callNamed("deleteProp", _this.pObjectList, tID)
  callNamed("deleteOne", _this.pUpdateList, tObj)
  callNamed("deleteOne", _this.pPrepareList, tObj)
  callNamed("deleteOne", _this.pInstanceList, tID)
  tObj = undefined;
  return 1;
}

