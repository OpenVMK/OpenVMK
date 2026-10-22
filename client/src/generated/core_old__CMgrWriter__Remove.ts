// core.old.cct / CMgrWriter / Remove

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Remove(_me: LingoMe, _this: LingoValue, a_sID: LingoValue) {
  var tObj = meProp(_me, "pItemList")[a_sID];
  if (callNamed("voidp", tObj)) {
  return callNamed("error", _this, lingoBinary("joinPad", "Writer not found:", a_sID), symbol("Remove"));
  }

  callMethod("deconstruct", tObj)
  return callMethod("deleteProp", meProp(_me, "pItemList"), a_sID);
}

