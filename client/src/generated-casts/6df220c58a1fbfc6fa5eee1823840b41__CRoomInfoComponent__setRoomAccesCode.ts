// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoComponent / setRoomAccesCode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setRoomAccesCode(_me: LingoMe, a_iCode: LingoValue) {
  if (meProp(_me, "m_bControlRoom")) {
  setMeProp(_me, "m_bFriendsOnly", a_iCode);
  callMethod("setRoomEntryState", _me, a_iCode)
  }

}

