// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoComponent / setPublic

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setPublic(_me: LingoMe) {
  setMeProp(_me, "m_roomMode", "public");
  setThePropOf(callMethod("getInterface", _me), "m_currentView", "vmk_popup_roominfop.window");
  if (meProp(_me, "m_visible")) {
  callMethod("UpdateView", callMethod("getInterface", _me))
  }

}

