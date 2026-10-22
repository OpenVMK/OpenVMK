// vmk_monorail_mixer.cct / CMusicMixerInterface / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  if (callNamed("windowExists", meProp(_me, "m_sWindowID"))) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  callMethod("close", tWndObj)
  }

  if (lingoBinary("neq", callNamed("getObject", "Music Mixer Popup"), 0)) {
  if (lingoBinary("neq", meProp(_me, "m_pPopup"), 0)) {
  callMethod("deconstruct", meProp(_me, "m_pPopup"))
  }

  callNamed("removeObject", "Music Mixer Popup")
  }

  callNamed("unregisterMessage", "ui_MusicMixer", callMethod("getID", _me))
  callNamed("executeMessage", "SetButtonStates", new LingoPropList([symbol("all"), 1]))
  callNamed("executeMessage", symbol("MinigameState"), symbol("idle"))
  return 1;
}

