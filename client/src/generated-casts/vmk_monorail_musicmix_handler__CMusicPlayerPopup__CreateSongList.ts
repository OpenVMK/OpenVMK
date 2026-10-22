// vmk_monorail_musicmix_handler.cct / CMusicPlayerPopup / CreateSongList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateSongList(_me: LingoMe) {
  var t_pSongList = callNamed("createObject", "Music Player Song List", "CMusicPlayerSongList");
  if (lingoBinary("neq", t_pSongList, 0)) {
  callMethod("Init", t_pSongList, callMethod("getID", _me), meProp(_me, "m_sWindowTitle"), "musicmix.playsongs.list")
  return t_pSongList;
  }

  return 0;
}

