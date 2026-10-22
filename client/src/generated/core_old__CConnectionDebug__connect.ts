// core.old.cct / CConnectionDebug / connect

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function connect(_me: LingoMe, tHost: LingoValue, tPort: LingoValue) {
  setMeProp(_me, "pHost", tHost);
  setMeProp(_me, "pPort", tPort);
  setMeProp(_me, "pXtra", callNamed("new", callNamed("xtra", "Multiuser")));
  callMethod("setNetBufferLimits", meProp(_me, "pXtra"), lingoBinary("mul", 16, 1024), lingoBinary("mul", 100, 1024), 100)
  var tErrCode = callMethod("setNetMessageHandler", meProp(_me, "pXtra"), symbol("xtraMsgHandler"), _me);
  if (lingoBinary("eq", tErrCode, 0)) {
  var tConnectError = callMethod("connectToNetServer", meProp(_me, "pXtra"), "*", "*", meProp(_me, "pHost"), meProp(_me, "pPort"), "*", 1);
  if (lingoBinary("neq", 0, tConnectError)) {
  callNamed("executeMessage", symbol("ConnectionFailed"))
  return callNamed("error", _me, lingoBinary("joinPad", "Connect to server failed:", tConnectError), symbol("connect"));
  }

  } else {
  return callNamed("error", _me, lingoBinary("joinPad", "Creation of callback failed:", tErrCode), symbol("connect"));
  }

  setMeProp(_me, "pLastContent", "");
  if (lingoBinary("gt", meProp(_me, "pLogMode"), 0)) {
  callMethod("log", _me, lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "Connection initialized:", callMethod("getID", _me)), meProp(_me, "pHost")), meProp(_me, "pPort")))
  }

  return 1;
}

