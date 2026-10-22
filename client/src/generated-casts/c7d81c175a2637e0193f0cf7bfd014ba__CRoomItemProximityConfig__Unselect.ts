// c7d81c175a2637e0193f0cf7bfd014ba.cct / CRoomItemProximityConfig / Unselect

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Unselect(_me: LingoMe) {
  setMeProp(_me, "m_bShowTiles", 0);
  callMethod("hideTiles", _me)
  return callNamed("callAncestor", symbol("Unselect"), _me);
}

