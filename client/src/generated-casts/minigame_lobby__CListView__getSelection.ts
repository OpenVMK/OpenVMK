// minigame_lobby.cct / CListView / getSelection

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getSelection(_me: LingoMe) {
  var tOut = new LingoList([]);
  for (var i = 1; i <= meProp(_me, "m_ar_pItems").count; ++i) {
  if (callMethod("GetSelected", meProp(_me, "m_ar_pItems"))) {
  callMethod("append", tOut, i)
  }

  }

  return tOut;
}

