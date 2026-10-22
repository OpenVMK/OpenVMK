// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoComponent / inActivate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function inActivate(_me: LingoMe) {
  setMeProp(_me, "m_sRoomName", "");
  setMeProp(_me, "m_sRoomDesc", "");
  setMeProp(_me, "m_sRoomInstance", "");
  if (meProp(_me, "m_visible")) {
  callMethod("showHide", _me)
  }

  setMeProp(_me, "m_active", 0);
}

