// vmk_monorail_mixer.cct / CMusicMixerPopup / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_currentView", "vmk_musicmix_start.window");
  setMeProp(_me, "m_sWindowTitle", "Music Mixer Popup Window");
  setMeProp(_me, "m_iClientID", 0);
  setMeProp(_me, "m_pSongList", 0);
  setMeProp(_me, "m_bVisible", 0);
  return 1;
}

