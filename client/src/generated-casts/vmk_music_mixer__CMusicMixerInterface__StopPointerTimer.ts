// vmk_music_mixer.cct / CMusicMixerInterface / StopPointerTimer

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StopPointerTimer(_me: LingoMe) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  if (callMethod("elementExists", tWndObj, "track.pointer")) {
  var t_rElement = callMethod("getElement", tWndObj, "track.pointer");
  callMethod("setProperty", t_rElement, symbol("visible"), 0)
  }

  callNamed("removeUpdate", callMethod("getID", _me))
  setMeProp(_me, "m_iListCount", 17);
  setMeProp(_me, "m_iPointerLoc", 57);
}

