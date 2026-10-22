// vmk_music_mixer.cct / CMusicMixerComponent / DeleteSong

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DeleteSong(_me: LingoMe, songIndex: LingoValue) {
  if (lingoBinary("gt", meProp(_me, "m_iActiveSongID"), 0)) {
  if (lingoBinary("eq", meProp(_me, "m_pSongList")[songIndex], meProp(_me, "m_pSongList")[meProp(_me, "m_iActiveSongID")])) {
  callMethod("setEditingMode", _me, symbol("none"))
  }

  }

  if (lingoBinary("lte", songIndex, meProp(_me, "m_pSongList").count)) {
  callMethod("DeleteSong", callMethod("getHandler", _me), meProp(_me, "m_pSongList")[songIndex].id)
  }

}

