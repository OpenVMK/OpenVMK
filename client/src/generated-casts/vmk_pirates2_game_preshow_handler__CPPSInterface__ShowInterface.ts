// vmk_pirates2_game_preshow_handler.cct / CPPSInterface / ShowInterface

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowInterface(_me: LingoMe) {
  if (callNamed("windowExists", meProp(_me, "m_sGamelistWndTitle"))) {
  callMethod("show", callNamed("getWindow", meProp(_me, "m_sGamelistWndTitle")))
  }

  if (callNamed("windowExists", meProp(_me, "m_sPeerlistWndTitle"))) {
  callMethod("hide", callNamed("getWindow", meProp(_me, "m_sPeerlistWndTitle")))
  }

  if (callNamed("windowExists", meProp(_me, "m_sStartGameDlgWndTitle"))) {
  callMethod("hide", callNamed("getWindow", meProp(_me, "m_sStartGameDlgWndTitle")))
  }

  if (callNamed("windowExists", meProp(_me, "m_sGamePrestartDlgWndTitle"))) {
  callMethod("hide", callNamed("getWindow", meProp(_me, "m_sGamePrestartDlgWndTitle")))
  }

  if (callNamed("windowExists", meProp(_me, "m_sHighScoreWndTitle"))) {
  callMethod("hide", callNamed("getWindow", meProp(_me, "m_sHighScoreWndTitle")))
  }

  setMeProp(_me, "m_gameOn", 0);
}

