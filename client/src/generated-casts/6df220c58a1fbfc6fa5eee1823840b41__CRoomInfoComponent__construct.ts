// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoComponent / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  callNamed("registerMessage", symbol("room_ready"), callMethod("getID", _me), symbol("Activate"))
  callNamed("registerMessage", symbol("room_leave"), callMethod("getID", _me), symbol("inActivate"))
  setMeProp(_me, "m_sRoomName", "");
  setMeProp(_me, "m_sRoomDesc", "");
  setMeProp(_me, "m_sRoomInstance", "");
  setMeProp(_me, "m_sRoomOwner", "");
  setMeProp(_me, "m_iRoomTag", -float(1));
  setMeProp(_me, "m_bControlRoom", 0);
  setMeProp(_me, "m_roomMode", "public");
  setMeProp(_me, "m_active", 0);
  setMeProp(_me, "m_visible", 0);
  callNamed("registerMessage", symbol("ui_roominfo"), callMethod("getID", _me), symbol("showHide"))
  callNamed("registerMessage", symbol("hide_roominfo"), callMethod("getID", _me), symbol("hideRoomInfo"))
  callNamed("registerMessage", "room_tile_selection", callMethod("getID", _me), symbol("hideRoomInfo"))
  callNamed("registerMessage", symbol("avatarsex"), callMethod("getID", _me), symbol("getAvatarSex"))
  callNamed("registerMessage", symbol("roomOwner"), callMethod("getID", _me), symbol("GetRoomOwner"))
  callNamed("registerMessage", symbol("Initialize"), callMethod("getID", _me), symbol("InitializeObject"))
  setMeProp(_me, "m_pRoomInfo", undefined);
  setMeProp(_me, "m_pulser", undefined);
  setMeProp(_me, "m_arRoomInstanceTitles", new LingoList(["North", "East", "South", "West"]));
  return 1;
}

