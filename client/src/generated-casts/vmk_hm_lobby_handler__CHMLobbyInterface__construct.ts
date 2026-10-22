// vmk_hm_lobby_handler.cct / CHMLobbyInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  callNamed("registerMessage", symbol("MinigameState"), callMethod("getID", _me), symbol("MinigameMessage"))
  callNamed("registerMessage", symbol("room_ready"), callMethod("getID", _me), symbol("initRoom"))
  callNamed("registerMessage", symbol("Kicked_From_Game"), callMethod("getID", _me), symbol("kickedfromgame"))
  setMeProp(_me, "m_gameOn", 0);
  setMeProp(_me, "m_iMyTeam", 0);
  setMeProp(_me, "m_signUpBoard", undefined);
  setMeProp(_me, "m_sGamelistWndTitle", "HMPSGameList");
  setMeProp(_me, "m_sPeerlistWndTitle", "HMPSPeerlistWindow");
  setMeProp(_me, "m_sStartGameDlgWndTitle", "HMPSStartGameDialog");
  setMeProp(_me, "m_sGamePrestartDlgWndTitle", "HMPSGamePrestartDialog");
  setMeProp(_me, "m_sInstructionsWndTitle", "HMPSInstructions");
  setMeProp(_me, "m_sHighScoreWndTitle", "HMPSHighScorePlaque");
  return 1;
}

