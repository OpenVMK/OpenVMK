// core.old.cct / CConnectionDebug / connectionReady

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function connectionReady(_me: LingoMe) {
  return lingoBinary("and", meProp(_me, "pConnectionOk"), meProp(_me, "pConnectionSecured"));
}

