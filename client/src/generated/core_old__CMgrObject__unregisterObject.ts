// core.old.cct / CMgrObject / unregisterObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function unregisterObject(_me: LingoMe, _this: LingoValue, tID: LingoValue) {
  if (callNamed("voidp", meProp(_me, "pObjectList")[tID])) {
  return callNamed("error", _this, lingoBinary("joinPad", "Referred object not found:", tID), symbol("unregister"));
  }

  var tObj = meProp(_me, "pObjectList")[tID];
  callMethod("deleteProp", meProp(_me, "pObjectList"), tID)
  callMethod("deleteOne", meProp(_me, "pUpdateList"), tObj)
  callMethod("deleteOne", meProp(_me, "pPrepareList"), tObj)
  callMethod("deleteOne", meProp(_me, "pInstanceList"), tID)
  tObj = undefined;
  return 1;
}

