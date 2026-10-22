// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoComponent / setPublicInfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setPublicInfo(_me: LingoMe, t_room: LingoValue) {
  if (callMethod("IsReady", meProp(_me, "m_pRoomInfo"))) {
  var t_desc = callMethod("getRoomByTag", meProp(_me, "m_pRoomInfo"), t_room.roomTag);
  setMeProp(_me, "m_sRoomName", callMethod("getaProp", t_desc, symbol("name")));
  setMeProp(_me, "m_sRoomDesc", callMethod("getaProp", t_desc, symbol("description")));
  if (lingoBinary("lte", t_room.instanceID, meProp(_me, "m_arRoomInstanceTitles").count)) {
  setMeProp(_me, "m_sRoomInstance", meProp(_me, "m_arRoomInstanceTitles")[t_room.instanceID]);
  }

  setMeProp(_me, "m_iRoomTag", t_room.roomTag);
  } else {
  setMeProp(_me, "m_sRoomName", "Unknown");
  setMeProp(_me, "m_sRoomDesc", "-");
  setMeProp(_me, "m_iRoomTag", -float(1));
  }

}

