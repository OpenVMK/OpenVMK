// minigame_lobby.cct / CListView / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_pImage", undefined);
  setMeProp(_me, "m_ar_pItems", new LingoList([]));
  setMeProp(_me, "m_iWidth", 0);
  setMeProp(_me, "m_iItemHeight", 0);
  setMeProp(_me, "m_fillColor", callNamed("rgb", "#EEEEEE"));
}

