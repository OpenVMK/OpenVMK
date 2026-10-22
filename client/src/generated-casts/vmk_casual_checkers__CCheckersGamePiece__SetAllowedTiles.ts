// vmk_casual_checkers.cct / CCheckersGamePiece / SetAllowedTiles

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetAllowedTiles(_me: LingoMe, _this: LingoValue, a_ar_iTileRefs: LingoValue) {
  setMeProp(_me, "m_ar_iAllowedTiles", a_ar_iTileRefs);
}

