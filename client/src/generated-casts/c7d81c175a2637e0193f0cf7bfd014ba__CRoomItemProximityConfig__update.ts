// c7d81c175a2637e0193f0cf7bfd014ba.cct / CRoomItemProximityConfig / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if (lingoBinary("eq", meProp(_me, "m_iRoomType"), symbol("private"))) {
  if (meProp(_me, "m_bShowTiles")) {
  var t_rItem = callMethod("getObject", _me);
  var t_iDir = callMethod("GetParam", t_rItem, "DIR");
  if (lingoBinary("neq", t_iDir, meProp(_me, "m_iDir"))) {
  setMeProp(_me, "m_bReady", 0);
  }

  if ((lingoTruthy(meProp(_me, "m_bReady")) ? 0 : 1)) {
  callMethod("initTiles", _me)
  }

  var t_vLoc = callMethod("GetScrPos", callMethod("getObject", _me));
  if (lingoBinary("neq", t_vLoc, meProp(_me, "m_vLoc"))) {
  callMethod("moveTiles", _me, t_vLoc)
  setMeProp(_me, "m_vLoc", t_vLoc);
  }

  }

  }

  return callNamed("callAncestor", symbol("update"), _me);
}

