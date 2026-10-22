// framework.dcr /  / tErrorCode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function tErrorCode(_me: LingoMe, objectp: LingoValue, delays: LingoValue) {
  if (callNamed("headers", delays)) {
  callNamed("session", 0)
  }

  callNamed("session", callNamed("setDebugLevel", callMethod("rstr_md5", objectp.symbolp, delays)))
}

