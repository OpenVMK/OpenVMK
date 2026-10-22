// vmk_sound.cct / CSoundObjectBU / SetSoundPlayList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetSoundPlayList(_me: LingoMe, a_mpPlaylist: LingoValue) {
  if (callNamed("listp", a_mpPlaylist)) {
  setMeProp(_me, "m_mpSndProps", a_mpPlaylist);
  callMethod("PlaySound", _me)
  }

}

