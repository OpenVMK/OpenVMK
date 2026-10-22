// vmk_pirates2_game_preshow_handler.cct / CPPSInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  callNamed("registerMessage", symbol("SetHighScores"), callMethod("getID", _me), symbol("highScoreWasSet"))
  callNamed("registerMessage", symbol("room_ready"), callMethod("getID", _me), symbol("initRoom"))
  callNamed("registerMessage", symbol("Kicked_From_Game"), callMethod("getID", _me), symbol("kickedfromgame"))
  setMeProp(_me, "m_gameOn", 0);
  setMeProp(_me, "m_bCheckEqualPlayers", 1);
  setMeProp(_me, "m_iMyTeam", 0);
  setMeProp(_me, "m_iGameMode", 0);
  setMeProp(_me, "m_iShipType", 0);
  setMeProp(_me, "m_sGamelistWndTitle", "PPSGameList");
  setMeProp(_me, "m_sPeerlistWndTitle", "PPSPeerlistWindow");
  setMeProp(_me, "m_sStartGameDlgWndTitle", "PPSStartGameDialog");
  setMeProp(_me, "m_sGamePrestartDlgWndTitle", "PPSGamePrestartDialog");
  setMeProp(_me, "m_sInstructionsWndTitle", "PPSInstructions");
  setMeProp(_me, "m_sHighScoreWndTitle", "PPSHighScorePlaque");
  setMeProp(_me, "m_sSelectShipWndTitle", "PPSSelectShipDialog");
  setMeProp(_me, "m_iMyGameLevel", 0);
  return 1;
}

