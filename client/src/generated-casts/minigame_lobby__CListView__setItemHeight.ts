// minigame_lobby.cct / CListView / SetItemHeight

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetItemHeight(_me: LingoMe, i_iHeight: LingoValue) {
  setMeProp(_me, "m_iItemHeight", i_iHeight);
}

