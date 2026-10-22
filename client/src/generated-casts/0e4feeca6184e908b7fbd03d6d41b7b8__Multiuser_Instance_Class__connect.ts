// 0e4feeca6184e908b7fbd03d6d41b7b8.cct / Multiuser Instance Class / connect

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
  if ((lingoTruthy(callNamed("objectp", meProp(_me, "pXtra"))) ? 0 : 1)) {
  setMeProp(_me, "pXtra", callNamed("new", callNamed("xtra", "Multiuser")));
  }

  callMethod("setNetBufferLimits", meProp(_me, "pXtra"), lingoBinary("mul", 16, 1024), lingoBinary("mul", 100, 1024), 100)
  var tErrCode = callMethod("setNetMessageHandler", meProp(_me, "pXtra"), symbol("xtraMsgHandler"), _me);
  if (lingoBinary("eq", tErrCode, 0)) {
  callMethod("connectToNetServer", meProp(_me, "pXtra"), "*", "*", meProp(_me, "pHost"), meProp(_me, "pPort"), "*", 0)
  } else {
  return callNamed("error", _me, lingoBinary("joinPad", "Creation of callback failed:", tErrCode), symbol("connect"));
  }

  return 1;
}

