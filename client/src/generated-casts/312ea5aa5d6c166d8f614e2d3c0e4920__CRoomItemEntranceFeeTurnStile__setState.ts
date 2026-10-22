// 312ea5aa5d6c166d8f614e2d3c0e4920.cct / CRoomItemEntranceFeeTurnStile / setState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setState(_me: LingoMe, _this: LingoValue, a_iState: LingoValue) {
  if (lingoBinary("eq", a_iState, 2)) {
  callNamed("executeMessage", "PlayFxSound", "VMK-entrance-1")
  }

  var t_rObj = callMethod("getObject", _this);
  callMethod("SetParam", t_rObj, "STATE", callNamed("string", a_iState))
  if (meProp(_me, "m_bReady")) {
  var t_fFloorSize = callNamed("float", callMethod("GetParam", callMethod("_AccessRoom", callNamed("getThread", symbol("room")).component), "TILESIZE"));
  var t_fItemSize = callNamed("float", callMethod("GetParam", t_rObj, "STRUCT")[symbol("param")]["TILESIZE"]);
  if (callNamed("voidp", t_fItemSize)) {
  t_fItemSize = float(32);
  }

  var t_fScaling = 1;
  if (lingoBinary("neq", t_fItemSize, t_fFloorSize)) {
  t_fScaling = lingoBinary("div", t_fFloorSize, t_fItemSize);
  }

  var t_iDir = callMethod("GetParam", callMethod("getObject", _this), "DIR").integer;
  var t_rBlock = callMethod("GetObjByKey", callMethod("GetContext", t_rObj), _this.m_ar_sKey[1]);
  var t_rSprite = callMethod("GetSprites", callMethod("GetVisual", t_rBlock))[1];
  var t_sMember = t_rSprite.member.name;
  t_sMember = deleteStringChunk(t_sMember, "char", -30000, 0);
  var t_rMember = callNamed("getMember", lingoBinary("join", t_sMember, a_iState));
  if (lingoBinary("gt", t_rMember._number, 0)) {
  setThePropOf(t_rSprite, "member", t_rMember);
  setThePropOf(t_rSprite, "width", lingoBinary("mul", t_rSprite.member.width, t_fScaling));
  setThePropOf(t_rSprite, "height", lingoBinary("mul", t_rSprite.member.height, t_fScaling));
  } else {
  }

  t_rSprite = callMethod("getLast", callMethod("GetSprites", callMethod("GetVisual", t_rBlock)));
  t_sMember = t_rSprite.member.name;
  t_sMember = deleteStringChunk(t_sMember, "char", -30000, 0);
  t_rMember = callNamed("getMember", lingoBinary("join", t_sMember, a_iState));
  if (lingoBinary("gt", t_rMember._number, 0)) {
  setThePropOf(t_rSprite, "member", t_rMember);
  setThePropOf(t_rSprite, "width", lingoBinary("mul", t_rSprite.member.width, t_fScaling));
  setThePropOf(t_rSprite, "height", lingoBinary("mul", t_rSprite.member.height, t_fScaling));
  } else {
  }

  t_rBlock = callMethod("GetObjByKey", callMethod("GetContext", t_rObj), _this.m_ar_sKey[2]);
  t_rSprite = callMethod("GetSprites", callMethod("GetVisual", t_rBlock))[1];
  t_sMember = t_rSprite.member.name;
  t_sMember = deleteStringChunk(t_sMember, "char", -30000, 0);
  t_rMember = callNamed("getMember", lingoBinary("join", t_sMember, a_iState));
  if (lingoBinary("gt", t_rMember._number, 0)) {
  setThePropOf(t_rSprite, "member", t_rMember);
  setThePropOf(t_rSprite, "width", lingoBinary("mul", t_rSprite.member.width, t_fScaling));
  setThePropOf(t_rSprite, "height", lingoBinary("mul", t_rSprite.member.height, t_fScaling));
  } else {
  }

  t_rSprite = callMethod("getLast", callMethod("GetSprites", callMethod("GetVisual", t_rBlock)));
  t_sMember = t_rSprite.member.name;
  t_sMember = deleteStringChunk(t_sMember, "char", -30000, 0);
  t_rMember = callNamed("getMember", lingoBinary("join", t_sMember, a_iState));
  if (lingoBinary("gt", t_rMember._number, 0)) {
  setThePropOf(t_rSprite, "member", t_rMember);
  setThePropOf(t_rSprite, "width", lingoBinary("mul", t_rSprite.member.width, t_fScaling));
  setThePropOf(t_rSprite, "height", lingoBinary("mul", t_rSprite.member.height, t_fScaling));
  } else {
  }

  } else {
  callNamed("put", lingoBinary("joinPad", "Turnstile not ready!", callMethod("GetParam", t_rObj, "TYPE")))
  }

}

