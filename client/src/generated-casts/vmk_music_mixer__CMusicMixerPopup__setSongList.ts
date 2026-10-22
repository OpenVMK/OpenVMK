// vmk_music_mixer.cct / CMusicMixerPopup / setSongList

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
  callMethod("evaluateActiveButtons", _me)
  }

}

