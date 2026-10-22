// core.old.cct / CMgrWriter / create

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function create(_me: LingoMe, _this: LingoValue, a_sID: LingoValue, tMetrics: LingoValue) {
  if (!lingoTruthy(callNamed("voidp", meProp(_me, "pItemList")[a_sID]))) {
  return callNamed("error", _this, lingoBinary("joinPad", "Writer already exists:", a_sID), symbol("create"));
  }

  var tObj = callMethod("create", callNamed("getObjectManager"), symbol("temp"), meProp(_me, "pWriterClass"));
  if (!lingoTruthy(tObj)) {
  return 0;
  }

  switch (callNamed("ilk", tMetrics)) {
case symbol("struct"):
  callMethod("setFont", tObj, tMetrics)
  break;
  default:
  callMethod("setFont", tObj, meProp(_me, "pPlainStruct"))
  callMethod("Define", tObj, tMetrics)
  }

  meProp(_me, "pItemList")[a_sID] = tObj;
  callMethod("setID", tObj, a_sID)
  return 1;
}

