// minigame_lobby.cct / CListView / clear

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function clear(_me: LingoMe) {
  for (var tItem of meProp(_me, "m_ar_pItems").toArray()) {
  callNamed("removeObject", callMethod("getID", tItem))
  }

  setMeProp(_me, "m_ar_pItems", new LingoList([]));
}

