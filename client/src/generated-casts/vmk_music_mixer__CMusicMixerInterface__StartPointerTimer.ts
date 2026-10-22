// vmk_music_mixer.cct / CMusicMixerInterface / StartPointerTimer

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StartPointerTimer(_me: LingoMe) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  if (callMethod("elementExists", tWndObj, "track.pointer")) {
  var t_rElement = callMethod("getElement", tWndObj, "track.pointer");
  callMethod("setProperty", t_rElement, symbol("locH"), 57)
  callNamed("receiveUpdate", callMethod("getID", _me))
  setMeProp(_me, "m_iListCount", 17);
  setMeProp(_me, "m_iPointerLoc", 57);
  callMethod("setProperty", t_rElement, symbol("visible"), 1)
  setMeProp(_me, "m_iMilliseconds", theProperty("milliSeconds"));
  }

}

