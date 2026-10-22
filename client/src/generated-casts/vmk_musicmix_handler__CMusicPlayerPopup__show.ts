// vmk_musicmix_handler.cct / CMusicPlayerPopup / show

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function show(_me: LingoMe) {
  callMethod("changeView", _me, meProp(_me, "m_currentView"))
  if (lingoBinary("neq", meProp(_me, "m_pSongList"), 0)) {
  callMethod("Init", meProp(_me, "m_pSongList"), callMethod("getID", _me), meProp(_me, "m_sWindowTitle"), "musicmix.playsongs.list")
  callNamed("executeMessage", symbol("RequestSongs"))
  }

  setMeProp(_me, "m_bVisible", 1);
}

