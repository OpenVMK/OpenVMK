// vmk_casual_checkers.cct / CCheckersGamePiece / select

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function select(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rGameEngine"))) {
  callMethod("ShowAllowedMoves", meProp(_me, "m_rGameEngine"), _this)
  }

  var t_rBlock = callMethod("GetBlocks", _this)[1];
  var t_ar_rSprites = callMethod("GetSprites", callMethod("GetVisual", t_rBlock));
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "#", t_ar_rSprites[1].locZ), t_ar_rSprites[2].locZ))
}

