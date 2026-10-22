// core.old.cct / CConnectionDebug / xtraMsgHandler

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
  var tSubject = callMethod("getaProp", tNewMsg, symbol("subject"));
  if (lingoBinary("and", lingoBinary("eq", tSubject, "connectToNetServer"), lingoBinary("neq", tErrCode, 0))) {
  callNamed("executeMessage", symbol("ConnectionFailed"))
  return callNamed("error", _me, lingoBinary("joinPad", "Connect to server failed:", tErrCode), symbol("xtraMsgHandler"));
  }

  if (lingoBinary("neq", tErrCode, 0)) {
  if (lingoBinary("gt", meProp(_me, "pLogMode"), 0)) {
  callMethod("log", _me, lingoBinary("joinPad", lingoBinary("joinPad", "Connection", callMethod("getID", _me)), "was disconnected"))
  callMethod("log", _me, lingoBinary("join", lingoBinary("joinPad", lingoBinary("join", "host = ", meProp(_me, "pHost")), ", port = "), meProp(_me, "pPort")))
  callMethod("log", _me, tNewMsg)
  }

  if (callNamed("threadExists", "DialogWindow")) {
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "ErrorInConnection", 1, 1);
  callMethod("show", t)
  var t_sText = lingoBinary("join", lingoBinary("join", lingoBinary("join", "\r", callMethod("getNetErrorString", meProp(_me, "pXtra"), tErrCode)), "\r"), "Connection was disconnected.");
  callMethod("setText", t, t_sText, "Connection Error Message", "OK")
  }

  callMethod("disconnect", _me)
  return 0;
  }

  callMethod("msghandler", _me, tContent)
}

