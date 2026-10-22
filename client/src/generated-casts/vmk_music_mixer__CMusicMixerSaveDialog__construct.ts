// vmk_music_mixer.cct / CMusicMixerSaveDialog / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_currentView", "vmk_musicmix_editname.window");
  setMeProp(_me, "m_sWindowTitle", "Music Mixer Save Dialog Window");
  setMeProp(_me, "m_iClientID", 0);
  setMeProp(_me, "m_bVisible", 0);
  setMeProp(_me, "m_pSongNameField", undefined);
  setMeProp(_me, "m_iEditMode", symbol("new"));
  setMeProp(_me, "m_iSongIndex", 0);
  return 1;
}

