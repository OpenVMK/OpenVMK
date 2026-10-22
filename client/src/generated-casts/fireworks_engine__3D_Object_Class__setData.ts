// fireworks_engine.cct / 3D Object Class / setData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setData(_me: LingoMe, p_pDataSet: LingoValue) {
  if ((lingoTruthy(callNamed("ilk", p_pDataSet, symbol("linearList"))) ? 0 : 1)) {
  callNamed("put", "3D Object Class : setData() : incorrect data type")
  return 0;
  }

  setMeProp(_me, "m_pDataSet", p_pDataSet);
  return 1;
}

