// vmk_pirates_game_preshow_handler.cct / CPPSInterface / CreateGamePrestartWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateGamePrestartWindow(_me: LingoMe, a_sTitleText: LingoValue) {
  callNamed("createWindow", meProp(_me, "m_sGamePrestartDlgWndTitle"), "vmk_pirates_window.window")
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sGamePrestartDlgWndTitle"));
  if ((lingoTruthy(callNamed("voidp", tWndObj)) ? 0 : 1)) {
  if ((lingoTruthy(callMethod("merge", tWndObj, "vmk_pirates_start_players.window")) ? 0 : 1)) {
  callNamed("error", _me, "Unable to merge game prestart dialog", symbol("construct"))
  }

  } else {
  return callNamed("error", _me, "Unable to create game prestart dialog", symbol("construct"));
  }

  callMethod("setText", callMethod("getElement", tWndObj, "pirates.dialog.hd"), a_sTitleText)
  callMethod("hide", callMethod("getElement", tWndObj, "button.pirateskick.red1"))
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("PrestartDlgEventProc"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("center", tWndObj)
  callMethod("show", tWndObj)
}

