// 0e4feeca6184e908b7fbd03d6d41b7b8.cct / Multiuser Instance Class / disconnect

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function disconnect(_me: LingoMe, tControlled: LingoValue) {
  if (lingoBinary("neq", tControlled, 1)) {
  callMethod("forwardMsg", _me, "DISCONNECT")
  } else {
  setMeProp(_me, "pConnectionOk", 0);
  }

  setMeProp(_me, "pConnectionShouldBeKilled", 1);
  if (callNamed("objectp", meProp(_me, "pXtra"))) {
  callMethod("sendNetMessage", meProp(_me, "pXtra"), 0, 0, callNamed("numToChar", 0))
  callMethod("setNetMessageHandler", meProp(_me, "pXtra"), undefined, undefined)
  }

  if ((lingoTruthy(tControlled) ? 0 : 1)) {
  callNamed("error", _me, lingoBinary("joinPad", "Connection disconnected:", callMethod("getID", _me)), symbol("disconnect"))
  }

  return 1;
}

