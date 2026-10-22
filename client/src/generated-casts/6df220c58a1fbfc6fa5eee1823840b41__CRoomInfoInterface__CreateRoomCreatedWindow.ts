// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoInterface / CreateRoomCreatedWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateRoomCreatedWindow(_me: LingoMe, _this: LingoValue, a_mp_RoomData: LingoValue) {
  var m_iMyRoomID = a_mp_RoomData.id;
  var t_sWndName = "RoomNameWnd";
  if ((lingoTruthy(callNamed("createWindow", t_sWndName, "vmk_modal.window", 0, 0, symbol("modal"))) ? 0 : 1)) {
  return callNamed("error", _this, "Failed to create room name window!!!", symbol("CreateRoomCreatedWindow"));
  } else {
  var t_rWindow = callNamed("getWindow", t_sWndName);
  callMethod("merge", t_rWindow, "vmk_cat_rooms_step2.window")
  callMethod("registerClient", t_rWindow, callMethod("getID", _this))
  callMethod("registerProcedure", t_rWindow, symbol("_EventProc"), callMethod("getID", _this), symbol("mouseDown"))
  }

}

