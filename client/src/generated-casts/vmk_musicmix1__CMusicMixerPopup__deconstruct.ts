// vmk_musicmix1.cct / CMusicMixerPopup / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  if (lingoBinary("neq", callNamed("getObject", "Music Mixer Song List"), 0)) {
  callMethod("deconstruct", meProp(_me, "m_pSongList"))
  callNamed("removeObject", "Music Mixer Song List")
  }

}

