// core.old.cct / CMgrConnection / unregisterListener

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function unregisterListener(_me: LingoMe, tID: LingoValue, tObjID: LingoValue, tMsgList: LingoValue) {
  if (lingoBinary("and", lingoBinary("neq", callNamed("ilk", tID), symbol("symbol")), lingoBinary("neq", callNamed("ilk", tID), symbol("string")))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Invalid message header ID:", tID), symbol("registerListener"));
  }

  var tPtr = meProp(_me, "pListenerList")[tID];
  if (callNamed("voidp", tPtr)) {
  return 0;
  }

  var tList = callMethod("getaProp", tPtr, symbol("value"));
  for (var i = 1; i <= tMsgList.count; ++i) {
  var tMsg = callMethod("getPropAt", tMsgList, i);
  var tMethod = tMsgList[i];
  if (callNamed("voidp", callMethod("getaProp", tList, tMsg))) {
  return callNamed("error", _me, lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "No listeners for message:", tMsg), "/"), tID), symbol("unregisterListener"));
  }

  for (var j = 1; j <= callMethod("getaProp", tList, tMsg).count; ++j) {
  var tCallback = callMethod("getaProp", tList, tMsg)[j];
  if (lingoBinary("and", lingoBinary("eq", tCallback[1], tObjID), lingoBinary("eq", tCallback[2], tMethod))) {
  callMethod("deleteAt", callMethod("getaProp", tList, tMsg), j)
  break;
  }

  }

  }

  return 1;
}

