// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_windowTitle", "Room Info Window");
  setMeProp(_me, "m_currentView", "vmk_popup_roominfop.window");
  setMeProp(_me, "m_sWhoEntersWindow", "WhoEntersWindow");
  setMeProp(_me, "m_dialogName", "");
  callMethod("set", callNamed("getObject", symbol("session")), "room_furnish_mode", 1)
  setMeProp(_me, "m_rRoomNameField", 0);
  setMeProp(_me, "m_rRoomDescField", 0);
  setMeProp(_me, "m_sRoomNameOld", "");
  setMeProp(_me, "m_sRoomDescOld", "");
  setMeProp(_me, "m_iTempEntryState", undefined);
  setMeProp(_me, "m_obj_TicketWindow", undefined);
  callNamed("registerMessage", "room_leave", callMethod("getID", _me), symbol("RemoveRoomInfo"))
  return 1;
}

