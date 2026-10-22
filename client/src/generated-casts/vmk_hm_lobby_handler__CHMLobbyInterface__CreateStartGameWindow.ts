// vmk_hm_lobby_handler.cct / CHMLobbyInterface / CreateStartGameWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateStartGameWindow(_me: LingoMe) {
  callNamed("createWindow", meProp(_me, "m_sStartGameDlgWndTitle"), "vmk_hm_simple.window")
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sStartGameDlgWndTitle"));
  if (lingoBinary("neq", tWndObj, 0)) {
  if ((lingoTruthy(callMethod("merge", tWndObj, "vmk_hm_start_players.window")) ? 0 : 1)) {
  return callNamed("error", _me, "Unable to merge start game dialog", symbol("construct"));
  }

  } else {
  return callNamed("error", _me, "Unable to create start game dialog", symbol("construct"));
  }

  callMethod("setText", callMethod("getElement", tWndObj, "hm.dialog.hd"), callNamed("getText", "HMPS_create_new_game"))
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("StartGameDlgEventProc"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("center", tWndObj)
  callMethod("show", tWndObj)
}

