// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomObjectIterator / _FeedObjMap

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _FeedObjMap(_me: LingoMe, _this: LingoValue, a_rContainer: LingoValue, a_mp_iRef_sKey: LingoValue) {
  setMeProp(_me, "m_rContainer", a_rContainer);
  setMeProp(_me, "m_mp_iRef_sKey", a_mp_iRef_sKey);
  setMeProp(_me, "m_iIndex", 1);
}

