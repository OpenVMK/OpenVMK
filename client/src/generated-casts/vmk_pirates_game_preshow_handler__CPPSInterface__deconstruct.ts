// vmk_pirates_game_preshow_handler.cct / CPPSInterface / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("unregisterMessage", symbol("ShowPPSInterface"), callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("HidePPSInterface"), callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("room_ready"), callMethod("getID", _me), symbol("initRoom"))
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rLobby"))) ? 0 : 1)) {
  callMethod("CloseService", meProp(_me, "m_rLobby"))
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rRoomInstanceList"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rRoomInstanceList")))
  }

  if (callNamed("windowExists", meProp(_me, "m_sGamelistWndTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sGamelistWndTitle"))
  }

  if (callNamed("windowExists", meProp(_me, "m_sPeerlistWndTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sPeerlistWndTitle"))
  }

  if (callNamed("windowExists", meProp(_me, "m_sStartGameDlgWndTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sStartGameDlgWndTitle"))
  }

  if (callNamed("windowExists", meProp(_me, "m_sGamePrestartDlgWndTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sGamePrestartDlgWndTitle"))
  }

  if (callNamed("windowExists", meProp(_me, "m_sHighScoreWndTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sHighScoreWndTitle"))
  }

  if (callNamed("windowExists", "PPSHighScore")) {
  callNamed("removeWindow", "PPSHighScore")
  }

  if (callNamed("windowExists", "RoomInstanceListView")) {
  callNamed("removeObject", "RoomInstanceListView")
  }

  callNamed("removeUpdate", callMethod("getID", _me))
  return 1;
}

