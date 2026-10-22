// 0e4feeca6184e908b7fbd03d6d41b7b8.cct / Multiuser Instance Class / xtraMsgHandler

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function xtraMsgHandler(_me: LingoMe) {
  if (lingoBinary("neq", meProp(_me, "pConnectionShouldBeKilled"), 0)) {
  return 0;
  }

  setMeProp(_me, "pConnectionOk", 1);
  var tNewMsg = callMethod("getNetMessage", meProp(_me, "pXtra"));
  var tErrCode = callMethod("getaProp", tNewMsg, symbol("errorCode"));
  var tContent = callMethod("getaProp", tNewMsg, symbol("content"));
  callMethod("log", _me, lingoBinary("joinPad", "Binary Transfer:", tNewMsg))
  if (lingoBinary("neq", tErrCode, 0)) {
  callMethod("disconnect", _me)
  callMethod("delay", _me, 5000, symbol("recycle"))
  return 0;
  }

  var tCallbackList = callMethod("getaProp", callMethod("getaProp", meProp(_me, "pListenersPntr"), symbol("value")), tNewMsg.subject);
  if (lingoBinary("gt", meProp(_me, "pLogMode"), 0)) {
  callMethod("log", _me, lingoBinary("joinPad", lingoBinary("join", lingoBinary("joinPad", "-->", tNewMsg.subject), "\r"), tContent))
  }

  switch (callNamed("ilk", tContent)) {
case symbol("string"):
  callMethod("forwardMsg", _me, lingoBinary("join", lingoBinary("join", tNewMsg.subject, "\r"), tContent))
  break;
case symbol("void"):
  callNamed("error", _me, "Message content is VOID!!!", symbol("xtraMsgHandler"))
  break;
  default:
  callNamed("call", tCallbackList[1][2], callNamed("getObject", tCallbackList[1][1]), tContent)
  }

}

