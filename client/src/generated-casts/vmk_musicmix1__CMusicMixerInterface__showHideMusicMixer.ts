// vmk_musicmix1.cct / CMusicMixerInterface / showHideMusicMixer

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showHideMusicMixer(_me: LingoMe) {
  if (callNamed("windowExists", meProp(_me, "m_sWindowID"))) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  if (callMethod("getProperty", tWndObj, symbol("visible"))) {
  callMethod("StopEverything", _me)
  callNamed("removeWindow", meProp(_me, "m_sWindowID"))
  } else {
  callMethod("StopEverything", _me)
  callNamed("removeWindow", meProp(_me, "m_sWindowID"))
  }

  } else {
  callNamed("createWindow", meProp(_me, "m_sWindowID"), "vmk_music_mixer.window")
  tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("moveTo", tWndObj, 0, 0)
  callMethod("registerProcedure", tWndObj, symbol("eventProcMusicMixer"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("registerProcedure", tWndObj, symbol("eventProcMusicMixer"), callMethod("getID", _me), symbol("mouseDown"))
  callMethod("registerProcedure", tWndObj, symbol("eventProcMusicMixer"), callMethod("getID", _me), symbol("keyDown"))
  callMethod("registerProcedure", tWndObj, symbol("eventProcMusicMixer"), callMethod("getID", _me), symbol("keyUp"))
  callMethod("registerProcedure", tWndObj, symbol("eventProcMusicMixer"), callMethod("getID", _me), symbol("mouseEnter"))
  callMethod("registerProcedure", tWndObj, symbol("eventProcMusicMixer"), callMethod("getID", _me), symbol("mouseLeave"))
  setMeProp(_me, "m_arMuteStates", new LingoList([0, 0, 0, 0]));
  for (var i = 1; i <= 4; ++i) {
  callMethod("HandleMuteButtons", _me, i)
  }

  callMethod("ResetSelected", _me)
  callMethod("ClearAll", callMethod("getComponent", _me))
  callMethod("StopPointerTimer", _me)
  callMethod("SelectInstrument", _me, "drm", "1")
  callMethod("SelectedSample", callMethod("getComponent", _me), "drm", "1")
  }

  setMeProp(_me, "m_pPopup", callMethod("createPopup", _me));
  callMethod("GetSongs", callMethod("getHandler", _me))
}

