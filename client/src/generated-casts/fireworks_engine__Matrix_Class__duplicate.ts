// fireworks_engine.cct / Matrix Class / duplicate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function duplicate(_me: LingoMe) {
  return callMethod("new", meProp(_me, "m_rMtxSrc"), meProp(_me, "iRows"), meProp(_me, "iCols"), meProp(_me, "vData"));
}

