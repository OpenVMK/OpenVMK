// c7d81c175a2637e0193f0cf7bfd014ba.cct / CItemAniStructureManager / create

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function create(_me: LingoMe, tID: LingoValue, tClass: LingoValue) {
  var tObjMgr = callNamed("getObjectManager");
  if (callMethod("exists", tObjMgr, tID)) {
  return callNamed("error", _me, lingoBinary("joinPad", "Object already exists:", tID), symbol("create"));
  }

  if (callNamed("objectp", callMethod("create", tObjMgr, tID, tClass))) {
  callMethod("add", meProp(_me, "pItemList"), tID)
  return 1;
  } else {
  return 0;
  }

}

