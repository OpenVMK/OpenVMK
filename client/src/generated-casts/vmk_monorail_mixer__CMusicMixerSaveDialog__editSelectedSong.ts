// vmk_monorail_mixer.cct / CMusicMixerSaveDialog / editSelectedSong

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function editSelectedSong(_me: LingoMe, i_index: LingoValue) {
  setMeProp(_me, "m_iSongIndex", i_index);
  setMeProp(_me, "m_iEditMode", symbol("rename"));
  if (lingoBinary("neq", meProp(_me, "m_iSongIndex"), 0)) {
  var tSongData = callMethod("getSongData", callMethod("getComponent", callNamed("getThread", "MusicMixer")), meProp(_me, "m_iSongIndex"));
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  var tElem = callMethod("getElement", tWndObj, "music.mixer.entername");
  if (lingoBinary("neq", tElem, 0)) {
  callMethod("setText", tElem, tSongData.name)
  }

  }

}

