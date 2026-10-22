// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoComponent / showHide

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showHide(_me: LingoMe) {
  if (meProp(_me, "m_active")) {
  if (meProp(_me, "m_visible")) {
  callMethod("hide", callMethod("getInterface", _me))
  } else {
  callMethod("show", callMethod("getInterface", _me))
  callNamed("executeMessage", "close_Emoticons")
  callNamed("executeMessage", "close_Magic")
  callNamed("executeMessage", symbol("hide_camera"))
  }

  setMeProp(_me, "m_visible", (lingoTruthy(meProp(_me, "m_visible")) ? 0 : 1));
  }

}

