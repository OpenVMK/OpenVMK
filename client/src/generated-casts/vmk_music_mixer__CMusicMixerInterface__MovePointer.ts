// vmk_music_mixer.cct / CMusicMixerInterface / MovePointer

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function MovePointer(_me: LingoMe) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  if (callMethod("elementExists", tWndObj, "track.pointer")) {
  var t_rElement = callMethod("getElement", tWndObj, "track.pointer");
  var t_LocH = callMethod("getProperty", t_rElement, symbol("locH"));
  if (lingoBinary("gt", t_LocH, 736)) {
  callMethod("StopPointerTimer", _me)
  } else {
  callMethod("setProperty", t_rElement, symbol("locH"), lingoBinary("add", t_LocH, 10))
  }

  }

}

