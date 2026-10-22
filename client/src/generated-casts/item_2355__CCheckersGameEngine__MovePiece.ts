// item_2355.cct / CCheckersGameEngine / MovePiece

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function MovePiece(_me: LingoMe, _this: LingoValue, a_rPiece: LingoValue, a_rTile: LingoValue) {
  if (callNamed("objectp", a_rPiece)) {
  var t_iPiece = callNamed("integer", callMethod("GetParam", callMethod("getObject", a_rPiece), "REF"));
  var t_iTile = callNamed("integer", callMethod("GetParam", callMethod("getObject", a_rTile), "REF"));
  callMethod("send", callNamed("getConnection", "VMK"), 950, new LingoPropList([symbol("integer"), meProp(_me, "m_iGameID"), symbol("integer"), 0, symbol("integer"), 2, symbol("integer"), t_iPiece, symbol("integer"), t_iTile]))
  } else {
  callNamed("error", _this, "Given piece object is VOID!", symbol("MovePiece"))
  }

}

