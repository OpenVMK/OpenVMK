// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoInterface / CreateRoomNameWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateRoomNameWindow(_me: LingoMe, _this: LingoValue) {
  var t_sWndName = "RoomNameWnd";
  if ((lingoTruthy(callNamed("createWindow", t_sWndName, "vmk_modal.window", 0, 0, symbol("modal"))) ? 0 : 1)) {
  return callNamed("error", _this, "Failed to create room name window!!!", symbol("CreateRoomNameWindow"));
  } else {
  var t_rWindow = callNamed("getWindow", t_sWndName);
  callMethod("merge", t_rWindow, "vmk_edit_roominfo.window")
  callMethod("registerClient", t_rWindow, callMethod("getID", _this))
  callMethod("registerProcedure", t_rWindow, symbol("_EventProc"), callMethod("getID", _this), symbol("mouseDown"))
  callMethod("registerProcedure", t_rWindow, symbol("_EventProc"), callMethod("getID", _this), symbol("keyDown"))
  callMethod("registerProcedure", t_rWindow, symbol("_EventProc"), callMethod("getID", _this), symbol("keyUp"))
  var t_nameField = callMethod("getElement", t_rWindow, "reg.roomname.input");
  callMethod("setText", t_nameField, meProp(_me, "m_sRoomName"))
  var t_DescField = callMethod("getElement", t_rWindow, "reg.roomdescription.input");
  callMethod("setText", t_DescField, meProp(_me, "m_sRoomDesc"))
  var t_Elem = callMethod("getElement", t_rWindow, "basic.window.title");
  if (lingoBinary("neq", t_Elem, 0)) {
  callMethod("setText", t_Elem, callNamed("getText", "edit.rooms.title"))
  }

  }

  setMeProp(_me, "m_rRoomNameField", callNamed("CreateCannedField", t_sWndName, "reg.roomname.input"));
  setMeProp(_me, "m_rRoomDescField", callNamed("CreateCannedField", t_sWndName, "reg.roomdescription.input"));
  callMethod("setAllowEmpty", meProp(_me, "m_rRoomDescField"), 1)
  callMethod("setAllowFreeWords", meProp(_me, "m_rRoomNameField"), 0)
  callMethod("setAllowFreeWords", meProp(_me, "m_rRoomDescField"), 0)
  callMethod("setAllowFriendNames", meProp(_me, "m_rRoomNameField"), 0)
  callMethod("setAllowFriendNames", meProp(_me, "m_rRoomDescField"), 0)
  callMethod("setAllowOwnName", meProp(_me, "m_rRoomNameField"), 1)
  callMethod("setAllowOwnName", meProp(_me, "m_rRoomDescField"), 1)
}

