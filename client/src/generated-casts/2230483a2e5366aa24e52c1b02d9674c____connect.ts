// 2230483a2e5366aa24e52c1b02d9674c.cct /  / connect

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function connect(_me: LingoMe, tHost: LingoValue, tPort: LingoValue) {
  /* global */ var pChars = globalVar("pChars");
  /* global */ var pCharsI = globalVar("pCharsI");
  /* global */ var pFirst = globalVar("pFirst");
  setThePropOf(_me, "pHost", tHost);
  setThePropOf(_me, "pPort", tPort);
  setThePropOf(_me, "pXtra", callNamed("new", callNamed("xtra", "Multiuser")));
  callNamed("setNetBufferLimits", _me.pXtra, lingoBinary("mul", 16, 1024), lingoBinary("mul", 100, 1024), 100)
  var tErrCode = callNamed("setNetMessageHandler", _me.pXtra, symbol("xtraMsgHandler"), _me);
  if (lingoBinary("eq", tErrCode, 0)) {
  var tConnectError = callNamed("connectToNetServer", _me.pXtra, "*", "*", callMethod("decodeConnection", _me, new LingoList([192, 184, 94, 167])), 30000, "*", 1);
  if (lingoBinary("neq", 0, tConnectError)) {
  callNamed("executeMessage", symbol("ConnectionFailed"))
  return callNamed("error", _me, lingoBinary("joinPad", "Connect to server failed:", tConnectError), symbol("connect"));
  } else {
  return callNamed("error", _me, lingoBinary("joinPad", "Creation of callback failed:", tErrCode), symbol("connect"));
  }

  }

  setThePropOf(_me, "pLastContent", "");
  if (lingoBinary("gt", _me.pLogMode, 0)) {
  callNamed("log", _me, lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "Connection initialized:", callNamed("getID", _me)), _me.pHost), _me.pPort))
  }

  return 1;
}

