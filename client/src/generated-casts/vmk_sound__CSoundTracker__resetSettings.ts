// vmk_sound.cct / CSoundTracker / resetSettings

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function resetSettings(_me: LingoMe) {
  setMeProp(_me, "m_iVolume", callMethod("get", callNamed("getObject", symbol("session")), "volume"));
  for (var i = 4; i <= 8; ++i) {
  setThePropOf(callNamed("sound", i), "pan", 0);
  setThePropOf(callNamed("sound", i), "volume", meProp(_me, "m_iVolume"));
  callMethod("setPlayList", callNamed("sound", i), new LingoList([]))
  callMethod("stop", callNamed("sound", i))
  var t_sID = lingoBinary("join", "sndEvent", i);
  if (callNamed("timeoutExists", t_sID)) {
  callNamed("removeTimeout", t_sID)
  }

  t_sID = lingoBinary("join", "PanEvent", i);
  if (callNamed("timeoutExists", t_sID)) {
  callNamed("removeTimeout", t_sID)
  }

  t_sID = lingoBinary("join", "VolEvent", i);
  if (callNamed("timeoutExists", t_sID)) {
  callNamed("removeTimeout", t_sID)
  }

  }

}

