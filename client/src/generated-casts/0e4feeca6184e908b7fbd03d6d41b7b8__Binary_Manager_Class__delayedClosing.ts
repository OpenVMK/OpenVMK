// 0e4feeca6184e908b7fbd03d6d41b7b8.cct / Binary Manager Class / delayedClosing

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function delayedClosing(_me: LingoMe) {
  if (lingoBinary("and", callNamed("multiuserExists", meProp(_me, "pConnectionId")), lingoBinary("eq", callNamed("count", meProp(_me, "pQueue")), 0))) {
  callNamed("removeMultiuser", meProp(_me, "pConnectionId"))
  }

}

