// vmk_pirates_game_preshow_handler.cct / CPPSInterface / CreatePeerListWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreatePeerListWindow(_me: LingoMe) {
  callNamed("createWindow", meProp(_me, "m_sPeerlistWndTitle"), "vmk_pirates_window.window")
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sPeerlistWndTitle"));
  if ((lingoTruthy(callNamed("voidp", tWndObj)) ? 0 : 1)) {
  if ((lingoTruthy(callMethod("merge", tWndObj, "vmk_pirates_moregames.window")) ? 0 : 1)) {
  return callNamed("error", _me, "Unable to merge peer list window", symbol("construct"));
  }

  } else {
  return callNamed("error", _me, "Unable to create peer list window", symbol("construct"));
  }

  callMethod("setText", callMethod("getElement", tWndObj, "pirates.dialog.hd"), callNamed("getText", "pps_more_game_rooms"))
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("PeerListEventProc"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("show", tWndObj)
  setMeProp(_me, "m_rRoomInstanceList", callNamed("getObject", "RoomInstanceListView"));
  callMethod("SetWidth", meProp(_me, "m_rRoomInstanceList"), callMethod("getProperty", callMethod("getElement", tWndObj, "pirates.selectroom.list"), symbol("width")))
}

