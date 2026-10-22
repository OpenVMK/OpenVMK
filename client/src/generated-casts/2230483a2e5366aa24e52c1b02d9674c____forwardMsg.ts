// 2230483a2e5366aa24e52c1b02d9674c.cct /  / forwardMsg

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function forwardMsg(_me: LingoMe, tSubject: LingoValue, tParams: LingoValue) {
  /* global */ var pChars = globalVar("pChars");
  /* global */ var pCharsI = globalVar("pCharsI");
  /* global */ var pFirst = globalVar("pFirst");
  if (lingoBinary("gt", _me.pLogMode, 0)) {
  callNamed("log", _me, lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", "/", tSubject), "\r"), tParams))
  }

  callMethod("set", callNamed("getObject", symbol("session")), "con_lastreceived", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", 8, tSubject), "-"), tParams))
  tParams = callMethod("convertSpecialChars", callNamed("getStringServices"), tParams);
  var tCallbackList = callMethod("getaProp", callMethod("getaProp", _me.pListenersPntr, symbol("value")), tSubject);
  if (lingoBinary("neq", callNamed("ilk", tCallbackList), symbol("list"))) {
  return callNamed("error", _me, lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "[Connection", tSubject), "] :"), callNamed("getID", _me)), symbol("forwardMsg"));
  }

  var tObjMgr = callNamed("getObjectManager");
  for (var i = 1; i <= callNamed("count", tCallbackList); ++i) {
  var tCallback = tCallbackList[i];
  var tObject = callMethod("GET", tObjMgr, tCallback[1]);
  if (lingoBinary("neq", tObject, 0)) {
  callMethod("setaProp", _me.pMsgStruct, symbol("subject"), tSubject)
  callMethod("setaProp", _me.pMsgStruct, symbol("content"), tParams)
  callNamed("call", tCallback[2], tObject, _me.pMsgStruct)
  continue;
  }

  callNamed("error", _me, lingoBinary("joinPad", "Listening obj not found, removed:", tCallback[1]), symbol("forwardMsg"))
  callNamed("deleteAt", tCallbackList, 1)
  i = lingoBinary("sub", i, 1);
  }

}

