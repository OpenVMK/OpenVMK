// vmk_monorail_mixer.cct / CMusicMixerPopup / CreateSongList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateSongList(_me: LingoMe) {
  var t_pSongList = callNamed("createObject", "Music Mixer Song List", "CMusicMixerSongList");
  if (lingoBinary("neq", t_pSongList, 0)) {
  callMethod("Init", t_pSongList, callMethod("getID", _me), meProp(_me, "m_sWindowTitle"), "musicmix.editsongs.list")
  return t_pSongList;
  }

  return 0;
}

