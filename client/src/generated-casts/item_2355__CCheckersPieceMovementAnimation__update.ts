// item_2355.cct / CCheckersPieceMovementAnimation / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue) {
  if (meProp(_me, "m_bMoving")) {
  var t_veScrPos = lingoBinary("add", callNamed("AbsToScr", callMethod("GetPointAt", meProp(_me, "m_rCurve"), meProp(_me, "m_fMoveTime"))), callMethod("GetScrPos", callMethod("GetRoomContext", meProp(_me, "m_rGameEngine"))));
  var t_ar_rBlocks = callMethod("GetBlocks", meProp(_me, "m_rPiece"));
  for (var t_rBlock of t_ar_rBlocks.toArray()) {
  var t_ar_rSprites = callMethod("GetSprites", callMethod("GetVisual", t_rBlock));
  for (var t_rSprite of t_ar_rSprites.toArray()) {
  setThePropOf(t_rSprite, "locH", t_veScrPos.x);
  setThePropOf(t_rSprite, "locV", t_veScrPos.y);
  setThePropOf(t_rSprite, "locZ", t_veScrPos.z);
  }

  }

  if (lingoBinary("gte", meProp(_me, "m_fMoveTime"), float(1))) {
  setMeProp(_me, "m_bMoving", 0);
  }

  setMeProp(_me, "m_fMoveTime", lingoBinary("add", meProp(_me, "m_fMoveTime"), 0.2));
  }

}

