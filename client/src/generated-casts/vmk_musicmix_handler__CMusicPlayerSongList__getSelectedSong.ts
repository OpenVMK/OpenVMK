// vmk_musicmix_handler.cct / CMusicPlayerSongList / getSelectedSong

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getSelectedSong(_me: LingoMe) {
  if (lingoBinary("neq", meProp(_me, "m_iActive"), 0)) {
  return meProp(_me, "m_pSongs")[meProp(_me, "m_iActive")];
  } else {
  return 0;
  }

}

