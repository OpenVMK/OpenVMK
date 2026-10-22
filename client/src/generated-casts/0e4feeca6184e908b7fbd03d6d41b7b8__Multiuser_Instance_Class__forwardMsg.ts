// 0e4feeca6184e908b7fbd03d6d41b7b8.cct / Multiuser Instance Class / forwardMsg

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function forwardMsg(_me: LingoMe, tMessage: LingoValue) {
  if (lingoBinary("eq", meProp(_me, "pConnectionShouldBeKilled"), 1)) {
  return 0;
  }

  tMessage = callMethod("convertSpecialChars", callNamed("getStringServices"), tMessage);
  var tSubject = tMessage.word[1];
  var tCallbackList = callMethod("getaProp", callMethod("getaProp", meProp(_me, "pListenersPntr"), symbol("value")), tSubject);
  if (lingoBinary("neq", callNamed("ilk", meProp(_me, "pMsgStruct")), symbol("struct"))) {
  setMeProp(_me, "pMsgStruct", callNamed("getStructVariable", "struct.message"));
  callMethod("setaProp", meProp(_me, "pMsgStruct"), symbol("connection"), _me)
  callNamed("error", _me, "Multiuser instance had problems...", symbol("forwardMsg"))
  }

  if (callNamed("listp", tCallbackList)) {
  var tObjMngr = callNamed("getObjectManager");
  for (var i = 1; i <= callNamed("count", tCallbackList); ++i) {
  var tCallback = tCallbackList[i];
  var tObject = callMethod("get", tObjMngr, tCallback[1]);
  if (lingoBinary("neq", tObject, 0)) {
  callMethod("setaProp", meProp(_me, "pMsgStruct"), symbol("message"), tMessage)
  callMethod("setaProp", meProp(_me, "pMsgStruct"), symbol("subject"), tSubject)
  callMethod("setaProp", meProp(_me, "pMsgStruct"), symbol("content"), tMessage.word.range(2, tMessage.word.count))
  callNamed("call", tCallback[2], tObject, meProp(_me, "pMsgStruct"))
  continue;
  }

  callNamed("error", _me, lingoBinary("joinPad", "Listening obj not found, removed:", tCallback[1]), symbol("forwardMsg"))
  callMethod("deleteAt", tCallbackList, 1)
  i = lingoBinary("sub", i, 1);
  }

  } else {
  callNamed("error", _me, lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "Listener not found:", tSubject), "/"), callMethod("getID", _me)), symbol("forwardMsg"))
  }

}

