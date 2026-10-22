// vmk_monorail_musicmix_handler.cct / CMusicPlayerPopup / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_currentView", "vmk_musicmix_play.window");
  setMeProp(_me, "m_sWindowTitle", "Music Player Popup Window");
  setMeProp(_me, "m_iClientID", 0);
  setMeProp(_me, "m_pSongList", 0);
  setMeProp(_me, "m_bVisible", 0);
  callNamed("registerMessage", symbol("songListReady"), callMethod("getID", _me), symbol("setSongList"))
  return 1;
}

