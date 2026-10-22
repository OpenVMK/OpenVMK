// vmk_monorail_musicmix_handler.cct / CMusicPlayerPopup / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("unregisterMessage", symbol("songListReady"))
  if (lingoBinary("neq", callNamed("getObject", "Music Player Song List"), 0)) {
  callMethod("deconstruct", meProp(_me, "m_pSongList"))
  callNamed("removeObject", "Music Player Song List")
  }

}

