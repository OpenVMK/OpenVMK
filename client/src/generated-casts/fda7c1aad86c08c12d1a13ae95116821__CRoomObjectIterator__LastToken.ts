// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomObjectIterator / LastToken

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LastToken(_me: LingoMe, _this: LingoValue) {
  if (callNamed("integerp", meProp(_me, "m_iIndex"))) {
  setMeProp(_me, "m_iIndex", meProp(_me, "m_mp_iRef_sKey").count);
  return lingoBinary("gt", meProp(_me, "m_iIndex"), 0);
  } else {
  return callNamed("error", _this, "Uninitialized iterator!", symbol("LastToken"));
  }

}

