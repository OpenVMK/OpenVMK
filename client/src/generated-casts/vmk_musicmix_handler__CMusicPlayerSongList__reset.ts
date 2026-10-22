// vmk_musicmix_handler.cct / CMusicPlayerSongList / reset

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function reset(_me: LingoMe) {
  setMeProp(_me, "m_iActive", 0);
  for (var song of meProp(_me, "m_pSongs").toArray()) {
  callMethod("reset", song)
  }

  callMethod("fill", meProp(_me, "m_pImage"), meProp(_me, "m_pImage").rect, new LingoPropList([symbol("color"), meProp(_me, "m_fillColor")]))
}

