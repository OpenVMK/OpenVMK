// vmk_casual_checkers.cct / CCheckersGameSelectedPieceIndicator / _TileSelectedCbk

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _TileSelectedCbk(_me: LingoMe, _this: LingoValue, a_rTile: LingoValue) {
  if (callMethod("IsMyTurn", meProp(_me, "m_rGameEngine"))) {
  if (callNamed("objectp", a_rTile)) {
  if (callMethod("GetCount", a_rTile)) {
  var t_rChild = a_rTile[1];
  if (callNamed("objectp", t_rChild)) {
  var t_rPiece = callMethod("GetPieceByRef", meProp(_me, "m_rGameEngine"), callNamed("integer", callMethod("GetParam", t_rChild, "REF")));
  if (callNamed("objectp", t_rPiece)) {
  if (callMethod("GetParam", t_rPiece, "CHECKERS_GAME_PIECE")) {
  callMethod("ShowPosition", _this, a_rTile, t_rPiece)
  return;
  }

  }

  }

  }

  }

  }

  callMethod("ShowPosition", _this, undefined, undefined)
}

