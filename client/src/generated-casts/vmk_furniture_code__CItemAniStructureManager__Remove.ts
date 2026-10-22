// vmk_furniture_code.cct / CItemAniStructureManager / Remove

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Remove(_me: LingoMe, tID: LingoValue) {
  if (callMethod("exists", _me, tID)) {
  callMethod("deleteOne", meProp(_me, "pItemList"), tID)
  return callMethod("Remove", callNamed("getObjectManager"), tID);
  } else {
  return 0;
  }

}

