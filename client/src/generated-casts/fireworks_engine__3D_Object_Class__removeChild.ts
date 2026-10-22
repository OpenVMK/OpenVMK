// fireworks_engine.cct / 3D Object Class / removeChild

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function removeChild(_me: LingoMe, p_pObject: LingoValue) {
  if ((lingoTruthy(p_pObject) ? 0 : 1)) {
  callNamed("put", " 3D Object Class : removeChild() : invalid input")
  return 0;
  }

  callMethod("deleteOne", meProp(_me, "m_ar_Children"), p_pObject)
}

