// core.old.cct / CMgrTimeout / Remove

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Remove(_me: LingoMe, tID: LingoValue) {
  if (!lingoTruthy(callMethod("exists", _me, tID))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Item not found:", tID), symbol("Remove"));
  }

  var tObjMgr = callNamed("getObjectManager");
  var tObject = callMethod("get", tObjMgr, _me.pItemList[tID][symbol("uniqueid")]);
  if (lingoBinary("neq", tObject, 0)) {
  setThePropOf(tObject, "target", undefined);
  callMethod("forget", tObject)
  tObject = undefined;
  callMethod("Remove", tObjMgr, _me.pItemList[tID][symbol("uniqueid")])
  }

  return callMethod("deleteProp", _me.pItemList, tID);
}

