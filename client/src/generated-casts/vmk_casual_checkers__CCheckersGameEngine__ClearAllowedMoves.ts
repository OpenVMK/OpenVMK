// vmk_casual_checkers.cct / CCheckersGameEngine / ClearAllowedMoves

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ClearAllowedMoves(_me: LingoMe, _this: LingoValue) {
  callMethod("HideAllowedMoves", _this)
  var t_iCount = meProp(_me, "m_mp_iRef_rPiece").count;
  for (var t_rPiece of meProp(_me, "m_mp_iRef_rPiece").toArray()) {
  callMethod("SetAllowedTiles", callMethod("GetFactor", t_rPiece), new LingoList([]))
  }

}

