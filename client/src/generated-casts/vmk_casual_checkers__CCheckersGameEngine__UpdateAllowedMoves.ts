// vmk_casual_checkers.cct / CCheckersGameEngine / UpdateAllowedMoves

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateAllowedMoves(_me: LingoMe, _this: LingoValue, a_mp_iPiece_ar_iTiles: LingoValue, a_bClearPrevious: LingoValue, a_bContinuedTurn: LingoValue) {
  if (a_bClearPrevious) {
  callMethod("ClearAllowedMoves", _this)
  }

  var t_iCount = meProp(_me, "m_mp_iRef_rPiece").count;
  for (var i = 1; i <= t_iCount; ++i) {
  var t_rPiece = meProp(_me, "m_mp_iRef_rPiece")[i];
  var t_iRef = callNamed("integer", callMethod("GetParam", t_rPiece, "REF"));
  var t_ar_iTiles = callMethod("getaProp", a_mp_iPiece_ar_iTiles, t_iRef);
  if (callNamed("voidp", t_ar_iTiles)) {
  t_ar_iTiles = new LingoList([]);
  }

  callMethod("SetAllowedTiles", callMethod("GetFactor", t_rPiece), t_ar_iTiles)
  }

  if (callNamed("objectp", meProp(_me, "m_rInterface"))) {
  callMethod("UpdateAllowedMoves", meProp(_me, "m_rInterface"), a_mp_iPiece_ar_iTiles, a_bClearPrevious, a_bContinuedTurn)
  }

}

