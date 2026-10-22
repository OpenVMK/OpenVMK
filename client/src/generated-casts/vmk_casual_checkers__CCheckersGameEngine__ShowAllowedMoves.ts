// vmk_casual_checkers.cct / CCheckersGameEngine / ShowAllowedMoves

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowAllowedMoves(_me: LingoMe, _this: LingoValue, a_rPiece: LingoValue) {
  callMethod("HideAllowedMoves", _this)
  var t_rContext = callMethod("_AccessRoom", callNamed("getThread", symbol("room")).component);
  var t_ar_iTiles = callMethod("GetAllowedTiles", a_rPiece);
  var t_iCount = t_ar_iTiles.count;
  for (var i = 1; i <= t_iCount; ++i) {
  var t_rTile = callMethod("_AccessIndexed", t_rContext, t_ar_iTiles[i], "tile");
  if (callNamed("voidp", t_rTile)) {
  callNamed("error", _this, lingoBinary("joinPad", "Tile not found:", t_ar_iTiles[i]), symbol("ShowAllowedMoves"))
  continue;
  }

  if (meProp(_me, "m_ar_rTileIndicatorPool").count) {
  var t_rObj = meProp(_me, "m_ar_rTileIndicatorPool")[1];
  callMethod("deleteAt", meProp(_me, "m_ar_rTileIndicatorPool"), 1)
  } else {
  t_rObj = callNamed("createObject", callNamed("getUniqueID"), "CCheckersGameAllowedTileIndicator");
  callMethod("SetGameEngine", t_rObj, _this)
  }

  callMethod("add", meProp(_me, "m_ar_rTileIndicators"), t_rObj)
  callMethod("ShowPosition", t_rObj, t_rTile, a_rPiece)
  }

  if (t_iCount) {
  callMethod("showmessage", meProp(_me, "m_rInterface"), callNamed("getText", "checkers.piece.selected"))
  }

}

