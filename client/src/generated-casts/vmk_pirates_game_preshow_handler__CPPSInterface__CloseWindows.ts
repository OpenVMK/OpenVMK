// vmk_pirates_game_preshow_handler.cct / CPPSInterface / CloseWindows

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CloseWindows(_me: LingoMe) {
  if (callNamed("windowExists", "PPSHighScore")) {
  callNamed("removeWindow", "PPSHighScore")
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

