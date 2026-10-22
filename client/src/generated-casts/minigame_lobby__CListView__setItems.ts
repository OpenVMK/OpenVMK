// minigame_lobby.cct / CListView / setItems

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setItems(_me: LingoMe, i_ar_pItems: LingoValue) {
  setMeProp(_me, "m_ar_pItems", i_ar_pItems);
}

