// vmk_monorail_mixer.cct / CMusicMixerInterface / createPopup

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createPopup(_me: LingoMe) {
  var t_pPopup = callNamed("createObject", "Music Mixer Popup", "CMusicMixerPopup");
  if (lingoBinary("neq", t_pPopup, 0)) {
  callMethod("Init", t_pPopup, callMethod("getID", _me))
  return t_pPopup;
  }

  return 0;
}

