// vmk_hm_lobby_handler.cct / CHMLobbyInterface / CloseWindows

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CloseWindows(_me: LingoMe) {
  if (callNamed("windowExists", "HMPSHighScore")) {
  callNamed("removeWindow", "HMPSHighScore")
  }

  if (callNamed("windowExists", meProp(_me, "m_sInstructionsWndTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sInstructionsWndTitle"))
  }

  if (callNamed("windowExists", meProp(_me, "m_sPeerlistWndTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sPeerlistWndTitle"))
  }

  if (callNamed("objectExists", "RoomInstanceListView")) {
  callNamed("removeObject", "RoomInstanceListView")
  }

}

