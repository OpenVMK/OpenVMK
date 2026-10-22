// vmk_hm_lobby_handler.cct / CHMLobbyInterface / CreateGamePrestartWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateGamePrestartWindow(_me: LingoMe, a_sTitleText: LingoValue) {
  callNamed("createWindow", meProp(_me, "m_sGamePrestartDlgWndTitle"), "vmk_hm_simple.window")
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sGamePrestartDlgWndTitle"));
  if (lingoBinary("neq", tWndObj, 0)) {
  if ((lingoTruthy(callMethod("merge", tWndObj, "vmk_hm_start_players.window")) ? 0 : 1)) {
  return callNamed("error", _me, "Unable to merge game prestart dialog", symbol("construct"));
  }

  } else {
  return callNamed("error", _me, "Unable to create game prestart dialog", symbol("construct"));
  }

  callMethod("fixAntialisingTextElement", _me, meProp(_me, "m_sGamePrestartDlgWndTitle"), "hm.dialog.hd", 1, a_sTitleText)
  callMethod("hide", callMethod("getElement", tWndObj, "button.hmkick.red1"))
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("PrestartDlgEventProc"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("center", tWndObj)
  callMethod("show", tWndObj)
}

