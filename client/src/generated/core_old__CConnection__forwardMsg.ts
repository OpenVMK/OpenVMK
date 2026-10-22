// core.old.cct / CConnection / forwardMsg

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function forwardMsg(_me: LingoMe, tSubject: LingoValue, tParams: LingoValue) {
  if (lingoBinary("gt", meProp(_me, "pLogMode"), 0)) {
  callMethod("log", _me, lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", "-->", tSubject), "\r"), tParams))
  }

  callMethod("set", callNamed("getObject", symbol("session")), "con_lastreceived", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", theProperty("long time"), tSubject), "-"), tParams))
  tParams = callMethod("convertSpecialChars", callNamed("getStringServices"), tParams);
  var tCallbackList = callMethod("getaProp", callMethod("getaProp", meProp(_me, "pListenersPntr"), symbol("value")), tSubject);
  if (lingoBinary("neq", callNamed("ilk", tCallbackList), symbol("list"))) {
  return callNamed("error", _me, lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "Listener not found:", tSubject), "/"), callMethod("getID", _me)), symbol("forwardMsg"));
  }

  var tObjMgr = callNamed("getObjectManager");
  for (var i = 1; i <= callNamed("count", tCallbackList); ++i) {
  var tCallback = tCallbackList[i];
  var tObject = callMethod("get", tObjMgr, tCallback[1]);
  if (lingoBinary("neq", tObject, 0)) {
  callMethod("setaProp", meProp(_me, "pMsgStruct"), symbol("subject"), tSubject)
  callMethod("setaProp", meProp(_me, "pMsgStruct"), symbol("content"), tParams)
  callNamed("call", tCallback[2], tObject, meProp(_me, "pMsgStruct"))
  continue;
  }

  callNamed("error", _me, lingoBinary("joinPad", "Listening obj not found, removed:", tCallback[1]), symbol("forwardMsg"))
  callMethod("deleteAt", tCallbackList, 1)
  i = lingoBinary("sub", i, 1);
  }

}

