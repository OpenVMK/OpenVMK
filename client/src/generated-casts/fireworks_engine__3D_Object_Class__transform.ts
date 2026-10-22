// fireworks_engine.cct / 3D Object Class / transform

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function transform(_me: LingoMe, p_matrix: LingoValue, p_ar_Output: LingoValue) {
  for (var i = 1; i <= callMethod("count", meProp(_me, "m_pDataSet")); ++i) {
  callMethod("append", p_ar_Output, callMethod("transform", p_matrix, meProp(_me, "m_pDataSet")[i]))
  }

}

