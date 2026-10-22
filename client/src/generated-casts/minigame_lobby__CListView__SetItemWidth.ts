// minigame_lobby.cct / CListView / SetItemWidth

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetItemWidth(_me: LingoMe, i_iWidth: LingoValue) {
  setMeProp(_me, "m_iWidth", i_iWidth);
}

