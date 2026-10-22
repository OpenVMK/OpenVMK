// vmk_musicmix1.cct / CMusicMixerSaveDialog / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_pSongNameField"))) ? 0 : 1)) {
  callNamed("removeCannedField", meProp(_me, "m_sWindowTitle"), "music.mixer.entername")
  }

}

