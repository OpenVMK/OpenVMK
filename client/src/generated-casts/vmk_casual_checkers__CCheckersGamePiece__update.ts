// vmk_casual_checkers.cct / CCheckersGamePiece / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue) {
  if (meProp(_me, "m_bInitialized")) {
  var t_rBlock = callMethod("GetBlocks", _this)[1];
  var t_ar_rSprites = callMethod("GetSprites", callMethod("GetVisual", t_rBlock));
  if (lingoBinary("gt", t_ar_rSprites.count, 1)) {
  if (meProp(_me, "m_ar_iTricks").count) {
  var t_rSprite = t_ar_rSprites[2];
  if (lingoBinary("and", callMethod("getPos", meProp(_me, "m_ar_iTricks"), 3), callMethod("getPos", meProp(_me, "m_ar_iTricks"), 5))) {
  setThePropOf(t_rSprite, "member", callNamed("getMember", "checkers.magic.hilite.3.5"));
  setThePropOf(t_rSprite, "blend", 100);
  } else {
  if (callMethod("getPos", meProp(_me, "m_ar_iTricks"), 3)) {
  setThePropOf(t_rSprite, "member", callNamed("getMember", "checkers.magic.hilite.3"));
  setThePropOf(t_rSprite, "blend", 100);
  } else {
  if (callMethod("getPos", meProp(_me, "m_ar_iTricks"), 5)) {
  setThePropOf(t_rSprite, "member", callNamed("getMember", "checkers.magic.hilite.5"));
  setThePropOf(t_rSprite, "blend", 100);
  } else {
  setThePropOf(t_rSprite, "member", callNamed("getMember", "null"));
  setThePropOf(t_rSprite, "blend", 0);
  }

  }

  }

  setThePropOf(t_rSprite, "width", t_rSprite.member.width);
  setThePropOf(t_rSprite, "height", t_rSprite.member.height);
  } else {
  setThePropOf(t_ar_rSprites[2], "blend", 0);
  setThePropOf(t_ar_rSprites[2], "member", callNamed("getMember", "null"));
  }

  }

  if (meProp(_me, "m_bMoving")) {
  var t_veScrPos = lingoBinary("add", callNamed("AbsToScr", callMethod("GetPointAt", meProp(_me, "m_rCurve"), meProp(_me, "m_fMoveTime"))), callMethod("GetScrPos", callMethod("GetRoomContext", meProp(_me, "m_rGameEngine"))));
  var i = 1;
  for (var t_rSprite of t_ar_rSprites.toArray()) {
  setThePropOf(t_rSprite, "locH", t_veScrPos.x);
  setThePropOf(t_rSprite, "locV", t_veScrPos.y);
  setThePropOf(t_rSprite, "locZ", lingoBinary("add", t_veScrPos.z, i));
  i = lingoBinary("add", i, 1);
  }

  if (lingoBinary("gte", meProp(_me, "m_fMoveTime"), float(1))) {
  setMeProp(_me, "m_bMoving", 0);
  }

  setMeProp(_me, "m_fMoveTime", lingoBinary("add", meProp(_me, "m_fMoveTime"), 0.2));
  }

  }

  callNamed("callAncestor", symbol("update"), _this)
}

