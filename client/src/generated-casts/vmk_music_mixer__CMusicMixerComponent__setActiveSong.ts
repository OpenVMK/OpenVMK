// vmk_music_mixer.cct / CMusicMixerComponent / setActiveSong

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setActiveSong(_me: LingoMe, i_index: LingoValue) {
  setMeProp(_me, "m_iActiveSongID", i_index);
}

