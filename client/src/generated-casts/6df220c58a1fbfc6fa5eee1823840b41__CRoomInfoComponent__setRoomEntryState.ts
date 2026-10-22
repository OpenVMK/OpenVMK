// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoComponent / setRoomEntryState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setRoomEntryState(_me: LingoMe, a_bState: LingoValue) {
  setMeProp(_me, "m_bFriendsOnly", a_bState);
  callMethod("UpdateChoises", _me._interface, a_bState)
}

