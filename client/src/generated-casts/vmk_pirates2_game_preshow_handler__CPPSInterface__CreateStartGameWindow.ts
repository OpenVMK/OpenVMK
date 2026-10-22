// vmk_pirates2_game_preshow_handler.cct / CPPSInterface / CreateStartGameWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateStartGameWindow(_me: LingoMe) {
  callNamed("createWindow", meProp(_me, "m_sStartGameDlgWndTitle"), "vmk_pirates_window.window")
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sStartGameDlgWndTitle"));
  if ((lingoTruthy(callNamed("voidp", tWndObj)) ? 0 : 1)) {
  if ((lingoTruthy(callMethod("merge", tWndObj, "vmk_pirates_create_game.window")) ? 0 : 1)) {
  return callNamed("error", _me, "Unable to merge start game dialog", symbol("construct"));
  }

  } else {
  return callNamed("error", _me, "Unable to create start game dialog", symbol("construct"));
  }

  callMethod("setText", callMethod("getElement", tWndObj, "pirates.dialog.hd"), callNamed("getText", "pps_create_new_game"))
  callMethod("hide", callMethod("getElement", tWndObj, "pirates.levelselector1"))
  callMethod("hide", callMethod("getElement", tWndObj, "pirates.levelselector2"))
  callMethod("hide", callMethod("getElement", tWndObj, "pirates.levelselector3"))
  callMethod("hide", callMethod("getElement", tWndObj, "pirates.modeselector1"))
  callMethod("hide", callMethod("getElement", tWndObj, "pirates.modeselector2"))
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("StartGameDlgEventProc"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("center", tWndObj)
  callMethod("show", tWndObj)
}

