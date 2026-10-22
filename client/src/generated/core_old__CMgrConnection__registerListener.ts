// core.old.cct / CMgrConnection / registerListener

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function registerListener(_me: LingoMe, tID: LingoValue, tObjID: LingoValue, tMsgList: LingoValue) {
  if (lingoBinary("and", lingoBinary("neq", callNamed("ilk", tID), symbol("symbol")), lingoBinary("neq", callNamed("ilk", tID), symbol("string")))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Invalid message header ID:", tID), symbol("registerListener"));
  }

  var tObject = callNamed("getObject", tObjID);
  if (lingoBinary("eq", tObject, 0)) {
  return callNamed("error", _me, lingoBinary("joinPad", "Object not found:", tObjID), symbol("registerListener"));
  }

  if (callNamed("voidp", meProp(_me, "pListenerList")[tID])) {
  var tPtr = callNamed("getStructVariable", "struct.pointer");
  callMethod("setaProp", tPtr, symbol("value"), new LingoPropList([]))
  meProp(_me, "pListenerList")[tID] = tPtr;
  } else {
  tPtr = meProp(_me, "pListenerList")[tID];
  }

  for (var i = 1; i <= tMsgList.count; ++i) {
  var tMsg = callMethod("getPropAt", tMsgList, i);
  var tMethod = tMsgList[i];
  if (!lingoTruthy(callMethod("handler", tObject, tMethod))) {
  return callNamed("error", _me, lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", "Method not found:", tMethod), "/"), tObjID), symbol("registerListener"));
  }

  if (callNamed("voidp", callMethod("getaProp", callMethod("getaProp", tPtr, symbol("value")), tMsg))) {
  callMethod("setaProp", callMethod("getaProp", tPtr, symbol("value")), tMsg, new LingoList([]))
  }

  callMethod("add", callMethod("getaProp", callMethod("getaProp", tPtr, symbol("value")), tMsg), new LingoList([tObjID, tMethod]))
  }

  return 1;
}

