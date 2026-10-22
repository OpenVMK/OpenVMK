// vmk_monorail_musicmix_handler.cct / CMusicPlayerPopup / setSongList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setSongList(_me: LingoMe, i_ar_list: LingoValue) {
  if (lingoBinary("neq", meProp(_me, "m_pSongList"), 0)) {
  callMethod("setSongList", meProp(_me, "m_pSongList"), i_ar_list)
  callMethod("render", meProp(_me, "m_pSongList"))
  if (lingoBinary("gte", meProp(_me, "m_pSongList").m_pSongs.count, 4)) {
  callMethod("setButtonState", _me, "musicmix.createsong.button", 0)
  } else {
  callMethod("setButtonState", _me, "musicmix.createsong.button", 1)
  }

  }

}

