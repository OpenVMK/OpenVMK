// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoComponent / setGuestInfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setGuestInfo(_me: LingoMe, t_info: LingoValue) {
  setMeProp(_me, "m_sRoomName", callMethod("getaProp", t_info, symbol("roomName")));
  setMeProp(_me, "m_sRoomDesc", callMethod("getaProp", t_info, symbol("roomDescription")));
  setMeProp(_me, "m_sRoomOwner", callMethod("getaProp", t_info, symbol("roomOwner")));
  setMeProp(_me, "m_bControlRoom", callMethod("getaProp", t_info, symbol("controlRoom")));
  setMeProp(_me, "m_bFriendsOnly", callMethod("getaProp", t_info, symbol("friendsOnly")));
  setMeProp(_me, "m_iRoomTag", -float(1));
  callMethod("setRoomEntryState", _me, meProp(_me, "m_bFriendsOnly"))
}

