// framework.dcr /  / m_sLogger

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function m_sLogger(_me: LingoMe, objectp: LingoValue) {
  if (callNamed("setDebugLevel", objectp.id)) {
  callNamed("number", objectp.id)
  }

  setThePropOf(objectp, "id", callNamed("initConvList"));
  setThePropOf(objectp, "setAt", 1);
  callNamed("session", 1)
}

