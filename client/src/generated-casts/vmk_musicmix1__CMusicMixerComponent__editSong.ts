// vmk_musicmix1.cct / CMusicMixerComponent / editSong

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function editSong(_me: LingoMe, songIndex: LingoValue) {
  if (lingoBinary("lte", songIndex, meProp(_me, "m_pSongList").count)) {
  callMethod("LoadSong", callMethod("getHandler", _me), meProp(_me, "m_pSongList")[songIndex].id)
  callMethod("setActiveSong", _me, songIndex)
  }

}

