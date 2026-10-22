// vmk_hm_lobby_handler.cct / CHMLobbyInterface / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("unregisterMessage", symbol("ShowHMPSInterface"), callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("HideHMPSInterface"), callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("MinigameState"), callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("room_ready"), callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("room_leave"), callMethod("getID", _me))
  if (callNamed("objectp", meProp(_me, "m_rLobby"))) {
  callMethod("CloseService", meProp(_me, "m_rLobby"))
  }

  if (callNamed("objectp", meProp(_me, "m_rRoomInstanceList"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rRoomInstanceList")))
  }

  if (callNamed("windowExists", meProp(_me, "m_sGamelistWndTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sGamelistWndTitle"))
  }

  if (callNamed("windowExists", meProp(_me, "m_sInstructionsWndTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sInstructionsWndTitle"))
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

  if (callNamed("windowExists", "HMPSHighScore")) {
  callNamed("removeWindow", "HMPSHighScore")
  }

  if (callNamed("windowExists", "RoomInstanceListView")) {
  callNamed("removeObject", "RoomInstanceListView")
  }

  callNamed("removeUpdate", callMethod("getID", _me))
  return 1;
}

