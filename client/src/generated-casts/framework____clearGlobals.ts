// framework.dcr /  / clearGlobals

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function clearGlobals(_me: LingoMe, _return: LingoValue) {
  callNamed("md5_hh", symbol("md5_ii"), _return.bytesTotal)
  callNamed("md5_hh", symbol("safe_add"), _return.bytesSoFar)
}

