// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoComponent / getRoomDesc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getRoomDesc(_me: LingoMe) {
  return new LingoPropList([symbol("name"), meProp(_me, "m_sRoomName"), symbol("desc"), meProp(_me, "m_sRoomDesc"), symbol("owner"), meProp(_me, "m_sRoomOwner"), symbol("control"), meProp(_me, "m_bControlRoom"), symbol("instance"), meProp(_me, "m_sRoomInstance")]);
}

