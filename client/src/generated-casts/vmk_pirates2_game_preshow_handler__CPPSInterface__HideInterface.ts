// vmk_pirates2_game_preshow_handler.cct / CPPSInterface / HideInterface

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HideInterface(_me: LingoMe) {
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

  var t_rPirates = callNamed("getThread", "piratesminigame");
  if (callNamed("objectp", t_rPirates)) {
  callNamed("put", lingoBinary("joinPad", "m_iMyGameLevel", meProp(_me, "m_iMyGameLevel")))
  if (lingoBinary("gt", meProp(_me, "m_iMyGameLevel"), 0)) {
  var t_sStage = lingoBinary("join", "level", meProp(_me, "m_iMyGameLevel"));
  callNamed("put", lingoBinary("joinPad", "t_sStage", t_sStage))
  callMethod("ShowPreGame", callMethod("getInterface", t_rPirates))
  callMethod("showStoryLine", callMethod("getInterface", t_rPirates), t_sStage)
  }

  }

  setMeProp(_me, "m_gameOn", 1);
  callNamed("removeUpdate", callMethod("getID", _me))
  callNamed("updateStage")
}

