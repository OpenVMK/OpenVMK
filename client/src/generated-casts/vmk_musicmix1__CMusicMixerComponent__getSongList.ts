// vmk_musicmix1.cct / CMusicMixerComponent / getSongList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getSongList(_me: LingoMe, i_ar_list: LingoValue) {
  return meProp(_me, "m_pSongList");
}

