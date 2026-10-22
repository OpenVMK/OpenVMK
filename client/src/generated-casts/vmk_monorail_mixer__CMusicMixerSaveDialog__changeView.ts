// vmk_monorail_mixer.cct / CMusicMixerSaveDialog / changeView

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
  return callNamed("error", _me, lingoBinary("join", lingoBinary("joinPad", "Failed to open Save Dialog Window", meProp(_me, "m_sWindowTitle")), "!!!"), symbol("changeView"));
  } else {
  tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("EventProc"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("registerProcedure", tWndObj, symbol("EventProc"), callMethod("getID", _me), symbol("keyDown"))
  callMethod("registerProcedure", tWndObj, symbol("EventProc"), callMethod("getID", _me), symbol("keyUp"))
  callMethod("merge", tWndObj, meProp(_me, "m_currentView"))
  setMeProp(_me, "m_pSongNameField", callNamed("CreateCannedField", meProp(_me, "m_sWindowTitle"), "music.mixer.entername"));
  }

  }

  if (lingoBinary("neq", tLastView, tView)) {
  callMethod("unmerge", tWndObj)
  callMethod("merge", tWndObj, tView)
  setMeProp(_me, "m_currentView", tView);
  }

  switch (meProp(_me, "m_currentView")) {
case "vmk_musicmix_editname.window":
  var t_Elem = callMethod("getElement", tWndObj, "musicmix.dialog.hd");
  if (lingoBinary("neq", t_Elem, 0)) {
  callMethod("setText", t_Elem, callNamed("getText", "musicmix.entername.hd"))
  }

  break;
  default:
  callNamed("put", lingoBinary("joinPad", "[MusicMix save] #changeView, unknown view", meProp(_me, "m_currentView")))
  }

}

