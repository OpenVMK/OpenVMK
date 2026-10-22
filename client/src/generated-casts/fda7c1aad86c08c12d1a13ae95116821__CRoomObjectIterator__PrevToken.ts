// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomObjectIterator / PrevToken

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PrevToken(_me: LingoMe, _this: LingoValue) {
  if (callNamed("integerp", meProp(_me, "m_iIndex"))) {
  if (lingoBinary("or", lingoBinary("eq", meProp(_me, "m_iIndex"), 1), lingoBinary("gt", lingoBinary("sub", meProp(_me, "m_iIndex"), 1), meProp(_me, "m_mp_iRef_sKey").count))) {
  return 0;
  } else {
  setMeProp(_me, "m_iIndex", lingoBinary("sub", meProp(_me, "m_iIndex"), 1));
  return 1;
  }

  } else {
  return callNamed("error", _this, "Uninitialized iterator!", symbol("PrevToken"));
  }

}

