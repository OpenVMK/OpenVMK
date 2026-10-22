// core.old.cct / Client Initialization Script / stopClient

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function stopClient(_me: LingoMe) {
  if (callNamed("voidp", g_rCore)) {
  return 0;
  }

  callNamed("RemoveTimeoutManager")
  callNamed("RemoveObjectManager")
  callNamed("RemoveErrorManager")
  return 0;
}

