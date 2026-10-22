// 2230483a2e5366aa24e52c1b02d9674c.cct / CConnection / disconnect

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function disconnect(_me: LingoMe, tControlled: LingoValue) {
  /* global */ var pChars = globalVar("pChars");
  /* global */ var pCharsI = globalVar("pCharsI");
  /* global */ var pFirst = globalVar("pFirst");
  if (lingoBinary("neq", tControlled, 1)) {
  callNamed("forwardMsg", _me, -float(1))
  }

  setThePropOf(_me, "pConnectionShouldBeKilled", 1);
  if (callNamed("objectp", _me.pXtra)) {
  callNamed("sendNetMessage", _me.pXtra, 0, 0, callNamed("numToChar", 0))
  callNamed("setNetMessageHandler", _me.pXtra, undefined, undefined)
  }

  setThePropOf(_me, "pXtra", undefined);
  if ((lingoTruthy(tControlled) ? 0 : 1)) {
  callNamed("error", _me, lingoBinary("joinPad", "Connection disconnected:", callNamed("getID", _me)), symbol("disconnect"))
  }

  return 1;
}

