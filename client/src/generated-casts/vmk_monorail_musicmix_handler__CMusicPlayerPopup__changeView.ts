// vmk_monorail_musicmix_handler.cct / CMusicPlayerPopup / changeView

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function changeView(_me: LingoMe, tView: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  var tLastView = meProp(_me, "m_currentView");
  if (lingoBinary("eq", tWndObj, 0)) {
  var t_window = callNamed("createWindow", meProp(_me, "m_sWindowTitle"), "vmk_musicmix.window", 0, 0, symbol("modal"));
  if ((lingoTruthy(t_window) ? 0 : 1)) {
  return callNamed("error", _me, lingoBinary("join", lingoBinary("joinPad", "Failed to open Popup Window", meProp(_me, "m_sWindowTitle")), "!!!"), symbol("changeView"));
  } else {
  tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("eventProcPopup"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("merge", tWndObj, meProp(_me, "m_currentView"))
  }

  }

  if (lingoBinary("neq", tLastView, tView)) {
  callMethod("unmerge", tWndObj)
  callMethod("merge", tWndObj, tView)
  setMeProp(_me, "m_currentView", tView);
  }

  switch (meProp(_me, "m_currentView")) {
case "vmk_musicmix_play.window":
  var t_Elem = callMethod("getElement", tWndObj, "musicmix.dialog.hd");
  if (lingoBinary("neq", t_Elem, 0)) {
  callMethod("setText", t_Elem, callNamed("getText", "musicmix.dialog.playsong.title"))
  }

  if (lingoBinary("eq", meProp(_me, "m_pSongList"), 0)) {
  setMeProp(_me, "m_pSongList", callMethod("CreateSongList", _me));
  }

  callMethod("setButtonState", _me, "musicmix.playsong.button", 0)
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "[MusicMixPlayer start] #changeView, unknown view", meProp(_me, "m_currentView")))
  }

}

