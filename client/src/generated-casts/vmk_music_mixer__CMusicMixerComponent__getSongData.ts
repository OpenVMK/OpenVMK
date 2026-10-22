// vmk_music_mixer.cct / CMusicMixerComponent / getSongData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getSongData(_me: LingoMe, songIndex: LingoValue) {
  if (lingoBinary("lte", songIndex, meProp(_me, "m_pSongList").count)) {
  return meProp(_me, "m_pSongList")[songIndex];
  }

  return new LingoList([]);
}

