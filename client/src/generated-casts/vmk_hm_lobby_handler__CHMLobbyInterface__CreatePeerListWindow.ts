// vmk_hm_lobby_handler.cct / CHMLobbyInterface / CreatePeerListWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreatePeerListWindow(_me: LingoMe) {
  callNamed("createWindow", meProp(_me, "m_sPeerlistWndTitle"), "vmk_hm_simple.window")
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sPeerlistWndTitle"));
  if (lingoBinary("neq", tWndObj, 0)) {
  if ((lingoTruthy(callMethod("merge", tWndObj, "vmk_hm_moregames.window")) ? 0 : 1)) {
  return callNamed("error", _me, "Unable to merge peer list window", symbol("construct"));
  }

  } else {
  return callNamed("error", _me, "Unable to create peer list window", symbol("construct"));
  }

  callMethod("setText", callMethod("getElement", tWndObj, "hm.dialog.hd"), callNamed("getText", "HMPS_more_game_rooms"))
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("PeerListEventProc"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("show", tWndObj)
  setMeProp(_me, "m_rRoomInstanceList", callNamed("getObject", "RoomInstanceListView"));
  callMethod("SetWidth", meProp(_me, "m_rRoomInstanceList"), callMethod("getProperty", callMethod("getElement", tWndObj, "hm.selectroom.list"), symbol("width")))
}

