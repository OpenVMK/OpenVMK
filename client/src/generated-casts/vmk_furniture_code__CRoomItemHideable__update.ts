// vmk_furniture_code.cct / CRoomItemHideable / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if ((lingoTruthy(meProp(_me, "m_bReady")) ? 0 : 1)) {
  callMethod("Init", _me)
  }

  return callNamed("callAncestor", symbol("update"), _me);
}

