// minigame_lobby.cct / CListView / createItem

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createItem(_me: LingoMe, i_sText: LingoValue) {
  var tNewItem = callNamed("createObject", symbol("random"), "CListItem");
  if ((lingoTruthy(callNamed("voidp", tNewItem)) ? 0 : 1)) {
  callMethod("setText", tNewItem, i_sText)
  callMethod("append", meProp(_me, "m_ar_pItems"), tNewItem)
  } else {
  callNamed("error", "Failed to create List Item", symbol("createItem"))
  }

}

