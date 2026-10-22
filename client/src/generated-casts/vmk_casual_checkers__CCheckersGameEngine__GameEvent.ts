// vmk_casual_checkers.cct / CCheckersGameEngine / GameEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GameEvent(_me: LingoMe, _this: LingoValue, a_iEventType: LingoValue, a_rMsg: LingoValue) {
  switch (a_iEventType) {
case 0:
  callMethod("UpdatePoints", _this, callMethod("GetIntFrom", a_rMsg.connection), callMethod("GetIntFrom", a_rMsg.connection))
  break;
case 1:
  var t_bContinuedTurn = lingoBinary("eq", callMethod("GetIntFrom", a_rMsg.connection), 1);
  var t_iPieces = callMethod("GetIntFrom", a_rMsg.connection);
  var t_mp_iPiece_ar_iTiles = new LingoPropList([]);
  for (var i = 1; i <= t_iPieces; ++i) {
  var t_iPiece = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iMoves = callMethod("GetIntFrom", a_rMsg.connection);
  var t_ar_iTiles = new LingoList([]);
  callMethod("setaProp", t_mp_iPiece_ar_iTiles, t_iPiece, t_ar_iTiles)
  for (var j = 1; j <= t_iMoves; ++j) {
  callMethod("add", t_ar_iTiles, callMethod("GetIntFrom", a_rMsg.connection))
  }

  }

  callMethod("UpdateAllowedMoves", _this, t_mp_iPiece_ar_iTiles, 1, t_bContinuedTurn)
  break;
case 2:
  t_iPiece = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iState = callMethod("GetIntFrom", a_rMsg.connection);
  var t_rPiece = callMethod("getaProp", meProp(_me, "m_mp_iRef_rPiece"), t_iPiece);
  if (callNamed("objectp", t_rPiece)) {
  callMethod("SetPieceState", callMethod("GetFactor", t_rPiece), t_iState)
  } else {
  callNamed("error", _this, lingoBinary("joinPad", lingoBinary("joinPad", "Game piece", t_iPiece), "not found, can't set state!"), symbol("GameEvent"))
  }

  break;
case 3:
  var t_iAvatarRef = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iCapturedPieces = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iSecondsRemaining = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iMaxNumOfTricks = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iTricksUsed = callMethod("GetIntFrom", a_rMsg.connection);
  if (callNamed("objectp", meProp(_me, "m_rInterface"))) {
  callMethod("update", meProp(_me, "m_rInterface"), t_iAvatarRef, t_iCapturedPieces, t_iSecondsRemaining, t_iMaxNumOfTricks, t_iTricksUsed)
  }

  break;
case 4:
  t_bContinuedTurn = lingoBinary("eq", callMethod("GetIntFrom", a_rMsg.connection), 1);
  t_iPieces = callMethod("GetIntFrom", a_rMsg.connection);
  t_mp_iPiece_ar_iTiles = new LingoPropList([]);
  for (var i = 1; i <= t_iPieces; ++i) {
  t_iPiece = callMethod("GetIntFrom", a_rMsg.connection);
  t_iMoves = callMethod("GetIntFrom", a_rMsg.connection);
  t_ar_iTiles = new LingoList([]);
  callMethod("setaProp", t_mp_iPiece_ar_iTiles, t_iPiece, t_ar_iTiles)
  for (var j = 1; j <= t_iMoves; ++j) {
  callMethod("add", t_ar_iTiles, callMethod("GetIntFrom", a_rMsg.connection))
  }

  }

  callMethod("UpdateAllowedMoves", _this, t_mp_iPiece_ar_iTiles, 0, t_bContinuedTurn)
  break;
case 5:
  var t_iPlayer = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iTrickNum = callMethod("GetIntFrom", a_rMsg.connection);
  t_iPieces = callMethod("GetIntFrom", a_rMsg.connection);
  var t_ar_rPieces = new LingoList([]);
  for (var i = 1; i <= t_iPieces; ++i) {
  t_iPiece = callMethod("GetIntFrom", a_rMsg.connection);
  t_rPiece = callMethod("getaProp", meProp(_me, "m_mp_iRef_rPiece"), t_iPiece);
  if (callNamed("objectp", t_rPiece)) {
  callMethod("add", t_ar_rPieces, callMethod("GetFactor", t_rPiece))
  }

  }

  var t_iParams = callMethod("GetIntFrom", a_rMsg.connection);
  var t_ar_iParams = new LingoList([]);
  for (var i = 1; i <= t_iParams; ++i) {
  callMethod("add", t_ar_iParams, callMethod("GetIntFrom", a_rMsg.connection))
  }

  callNamed("call", symbol("PlayTrick"), t_ar_rPieces, t_iTrickNum, t_ar_iParams)
  var t_sAnim = callNamed("getVariable", "checkers.trick.anim.pin");
  if (lingoBinary("and", callNamed("stringp", t_sAnim), lingoBinary("neq", t_sAnim, ""))) {
  if (lingoBinary("eq", callMethod("GetPlayerIndexByAvatarRef", _this, t_iPlayer), 1)) {
  var t_rNode = callMethod("Search", meProp(_me, "m_rRoomContext"), "NAME", "blue_magic");
  } else {
  t_rNode = callMethod("Search", meProp(_me, "m_rRoomContext"), "NAME", "red_magic");
  }

  switch (t_iTrickNum) {
case 1:
  var t_sIcon = "item_2355";
  break;
case 2:
  t_sIcon = "item_2356";
  break;
case 3:
  t_sIcon = "item_2357";
  break;
case 4:
  t_sIcon = "item_2358";
  break;
case 5:
  t_sIcon = "item_2359";
  break;
  default:
  t_sIcon = "null";
  }

  var t_vPos = callMethod("GetScrPos", t_rNode);
  var t_rAnim = callNamed("createObject", callNamed("getUniqueID"), "CCheckersSpriteAnimPlayer");
  callMethod("LoadAnimData", t_rAnim, callNamed("value", callNamed("getMember", t_sAnim).text))
  callMethod("SetSprite", t_rAnim, callMethod("getSprite", callMethod("GetVisual", t_rNode)))
  callMethod("SetMemberList", t_rAnim, new LingoList([t_sIcon]))
  callMethod("SetSelfDestruct", t_rAnim, 1)
  callMethod("start", t_rAnim)
  }

  break;
case 6:
  setMeProp(_me, "m_iCurrentTrick", callMethod("GetIntFrom", a_rMsg.connection));
  var t_iNumPieces = callMethod("GetIntFrom", a_rMsg.connection);
  callNamed("registerMessage", "room_tile_selection", callMethod("getID", _this), symbol("_TileSelectedCbk"))
  if (callNamed("objectp", meProp(_me, "m_rInterface"))) {
  callMethod("showmessage", meProp(_me, "m_rInterface"), callNamed("getText", "checkers.trick.select.piece"))
  }

  break;
case 7:
  var t_iTrickType = callMethod("GetIntFrom", a_rMsg.connection);
  var t = callNamed("createDialogWindow", callMethod("getID", _this), callNamed("getUniqueID"), 1, 0);
  callMethod("setText", t, callNamed("getText", "checkers.trick.failed.title"), callNamed("getText", "checkers.trick.failed"), "Ok", "foo4")
  callMethod("show", t)
  break;
case 8:
  var t_iItemRef = callMethod("GetIntFrom", a_rMsg.connection);
  t_rPiece = callMethod("_AccessIndexed", meProp(_me, "m_rRoomContext"), t_iItemRef, "element");
  if (callMethod("GetParam", t_rPiece, "CHECKERS_GAME_PIECE")) {
  callMethod("setaProp", meProp(_me, "m_mp_iRef_rPiece"), t_iItemRef, t_rPiece)
  callMethod("SetGameEngine", callMethod("GetFactor", t_rPiece), _this)
  callMethod("SetAllowedTiles", callMethod("GetFactor", t_rPiece), new LingoList([]))
  } else {
  callNamed("error", _this, "Referred object is not a game piece!", symbol("GameEvent"))
  }

  break;
case 9:
  var t_iAvatar = callMethod("GetIntFrom", a_rMsg.connection);
  t_iPiece = callMethod("GetIntFrom", a_rMsg.connection);
  t_iTrickType = callMethod("GetIntFrom", a_rMsg.connection);
  t_rPiece = callMethod("_AccessIndexed", meProp(_me, "m_rRoomContext"), t_iPiece, "element");
  if (callNamed("objectp", t_rPiece)) {
  callMethod("TrickAssigned", callMethod("GetFactor", t_rPiece), t_iTrickType)
  }

  break;
case 10:
  t_iAvatar = callMethod("GetIntFrom", a_rMsg.connection);
  break;
case 11:
  t_iAvatar = callMethod("GetIntFrom", a_rMsg.connection);
  break;
case 12:
  var t_iMaxTricks = callMethod("GetIntFrom", a_rMsg.connection);
  if (callNamed("objectp", meProp(_me, "m_rInterface"))) {
  callMethod("MaxTricksUsedWarning", meProp(_me, "m_rInterface"), t_iMaxTricks)
  }

  break;
case 13:
  t_iAvatar = callMethod("GetIntFrom", a_rMsg.connection);
  if (callNamed("objectp", meProp(_me, "m_rInterface"))) {
  callMethod("IdleWarning", meProp(_me, "m_rInterface"))
  }

  break;
case 14:
  t_iAvatar = callMethod("GetIntFrom", a_rMsg.connection);
  if (callNamed("objectp", meProp(_me, "m_rInterface"))) {
  callMethod("IdleWarningCancel", meProp(_me, "m_rInterface"))
  }

  break;
case 15:
  t_iAvatar = callMethod("GetIntFrom", a_rMsg.connection);
  t_iPiece = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iMoveType = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iIndex = callMethod("GetPlayerIndexByAvatarRef", _this, t_iAvatar);
  if (lingoBinary("eq", t_iIndex, meProp(_me, "m_iOwnPlayer"))) {
  switch (t_iMoveType) {
case 1:
  callMethod("showmessage", meProp(_me, "m_rInterface"), callNamed("getText", "checkers.you.moved"))
  break;
case 2:
  callMethod("showmessage", meProp(_me, "m_rInterface"), callNamed("getText", "checkers.you.jumped"))
  break;
case 3:
  callMethod("showmessage", meProp(_me, "m_rInterface"), callNamed("getText", "checkers.you.jumped.again"))
  break;
case 4:
  callMethod("showmessage", meProp(_me, "m_rInterface"), callNamed("getText", "checkers.your.turn.again"))
  break;
  }

  } else {
  switch (t_iMoveType) {
case 1:
  callMethod("showmessage", meProp(_me, "m_rInterface"), callNamed("getText", "checkers.other.moved"))
  break;
case 2:
  callMethod("showmessage", meProp(_me, "m_rInterface"), callNamed("getText", "checkers.other.jumped"))
  break;
case 3:
  callMethod("showmessage", meProp(_me, "m_rInterface"), callNamed("getText", "checkers.other.jumped.again"))
  break;
case 4:
  callMethod("showmessage", meProp(_me, "m_rInterface"), callNamed("getText", "checkers.other.jumped.again"))
  break;
  }

  }

  break;
case 16:
  t_iAvatar = callMethod("GetIntFrom", a_rMsg.connection);
  if (callNamed("objectp", meProp(_me, "m_rInterface"))) {
  callMethod("IdleWarningCancel", meProp(_me, "m_rInterface"))
  }

  break;
case 17:
  t_iPiece = callMethod("GetIntFrom", a_rMsg.connection);
  t_iTrickType = callMethod("GetIntFrom", a_rMsg.connection);
  t_rPiece = callMethod("_AccessIndexed", meProp(_me, "m_rRoomContext"), t_iPiece, "element");
  if (callNamed("objectp", t_rPiece)) {
  callMethod("TrickConsumed", callMethod("GetFactor", t_rPiece), t_iTrickType)
  }

  break;
case 18:
  t_iPiece = callMethod("GetIntFrom", a_rMsg.connection);
  t_iTrickType = callMethod("GetIntFrom", a_rMsg.connection);
  if (callNamed("objectp", meProp(_me, "m_rInterface"))) {
  callMethod("showmessage", meProp(_me, "m_rInterface"), callNamed("getText", "checkers.trick.not.allowed"))
  }

  break;
  default:
  callNamed("error", _this, lingoBinary("joinPad", "Unknown game event", a_iEventType), symbol("GameEvent"))
  }

}

