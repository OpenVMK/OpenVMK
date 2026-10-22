// vmk_hm_lobby_handler.cct / CHMLobbyInterface / CreateHighscorePlaque

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateHighscorePlaque(_me: LingoMe) {
  callNamed("createWindow", meProp(_me, "m_sHighScoreWndTitle"), "vmk_hm_highscores_button.window")
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sHighScoreWndTitle"));
  if (lingoBinary("neq", tWndObj, 0)) {
  callMethod("moveTo", tWndObj, 360, 210)
  } else {
  return callNamed("error", _me, "Unable to create high score button window", symbol("construct"));
  }

  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("HighScoreEventProc"), callMethod("getID", _me), symbol("mouseUp"))
}

