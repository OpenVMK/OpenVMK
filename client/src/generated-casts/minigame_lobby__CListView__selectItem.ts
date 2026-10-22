// minigame_lobby.cct / CListView / selectItem

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function selectItem(_me: LingoMe, i_iIndex: LingoValue, i_bVal: LingoValue) {
  if (lingoBinary("and", lingoBinary("gt", i_iIndex, 0), lingoBinary("lte", i_iIndex, meProp(_me, "m_ar_pItems").count))) {
  callMethod("select", meProp(_me, "m_ar_pItems")[i_iIndex], i_bVal)
  }

}

