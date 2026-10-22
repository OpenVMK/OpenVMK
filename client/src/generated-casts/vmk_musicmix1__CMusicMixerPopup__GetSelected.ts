// vmk_musicmix1.cct / CMusicMixerPopup / GetSelected

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetSelected(_me: LingoMe) {
  if (lingoBinary("neq", meProp(_me, "m_pSongList"), 0)) {
  return callMethod("GetSelected", meProp(_me, "m_pSongList"));
  }

  return 0;
}

