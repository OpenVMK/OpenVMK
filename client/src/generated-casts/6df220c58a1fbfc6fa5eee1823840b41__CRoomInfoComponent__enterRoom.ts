// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoComponent / enterRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function enterRoom(_me: LingoMe) {
  if ((lingoTruthy(meProp(_me, "m_visible")) ? 0 : 1)) {
  callMethod("setIconPulse", _me, 1)
  callNamed("createTimeout", symbol("hideRoomInfo"), 4000, symbol("enterRoomHideInfo"), callMethod("getID", _me), undefined, 0)
  }

}

