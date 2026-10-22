// minigame_lobby.cct / CListView / getItemClickedOn

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getItemClickedOn(_me: LingoMe, i_clickPos: LingoValue) {
  var tLine = lingoBinary("add", lingoBinary("div", i_clickPos.locV, meProp(_me, "m_iItemHeight")), 1);
  return meProp(_me, "m_ar_pItems")[tLine];
}

