// vmk_music_mixer.cct / CMusicMixerInterface / setSongList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setSongList(_me: LingoMe, i_ar_list: LingoValue, i_bOpenManager: LingoValue) {
  if (lingoBinary("neq", meProp(_me, "m_pPopup"), 0)) {
  callMethod("setSongList", meProp(_me, "m_pPopup"), i_ar_list)
  if (i_bOpenManager) {
  if ((lingoTruthy(callMethod("getVisible", meProp(_me, "m_pPopup"))) ? 0 : 1)) {
  callMethod("show", meProp(_me, "m_pPopup"))
  }

  }

  }

}

