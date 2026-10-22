// vmk_casual_checkers.cct / CCheckersGameEngine / PieceRemoved

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PieceRemoved(_me: LingoMe, _this: LingoValue, a_rPiece: LingoValue) {
  if (callNamed("objectp", a_rPiece)) {
  var t_iPiece = callNamed("integer", callMethod("GetParam", callMethod("getObject", a_rPiece), "REF"));
  callMethod("deleteProp", meProp(_me, "m_mp_iRef_rPiece"), t_iPiece)
  } else {
  callNamed("error", _this, "Given piece object is VOID!", symbol("PieceRemoved"))
  }

}

