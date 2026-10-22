// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomObjectIterator / getToken

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getToken(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("lt", meProp(_me, "m_mp_iRef_sKey").count, meProp(_me, "m_iIndex"))) {
  return undefined;
  } else {
  return callMethod("GetObjByKey", meProp(_me, "m_rContainer"), meProp(_me, "m_mp_iRef_sKey")[meProp(_me, "m_iIndex")]);
  }

}

