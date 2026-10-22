// vmk_mystics.cct / CRoomVisualAvatar / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", _this.m_rRenderer)) {
  callMethod("deconstruct", _this.m_rRenderer)
  setMeProp(_me, "m_rRenderer", undefined);
  }

  if (lingoBinary("eq", callNamed("ilk", _this.m_rMember), symbol("member"))) {
  callNamed("removeMember", _this.m_rMember.name)
  setMeProp(_me, "m_rMember", undefined);
  }

  if (callNamed("objectExists", "RoomEventProcessor")) {
  var t_rSprMgr = callNamed("getObject", "RoomEventProcessor");
  } else {
  t_rSprMgr = callNamed("createObject", "RoomEventProcessor", "CRoomMouseEventProcessor");
  }

  if (lingoBinary("eq", callNamed("ilk", _this.m_rCanvasSpr), symbol("sprite"))) {
  callMethod("RemoveSprite", t_rSprMgr, _this.m_rCanvasSpr)
  setMeProp(_me, "m_rCanvasSpr", undefined);
  }

  if (lingoBinary("eq", callNamed("ilk", _this.m_rShadowSpr), symbol("sprite"))) {
  callMethod("RemoveSprite", t_rSprMgr, _this.m_rShadowSpr)
  setMeProp(_me, "m_rShadowSpr", undefined);
  }

  if (lingoBinary("and", (lingoTruthy(callNamed("voidp", _this.m_rCustomSpr)) ? 0 : 1), lingoBinary("eq", callNamed("ilk", _this.m_rCustomSpr), symbol("sprite")))) {
  callMethod("RemoveSprite", t_rSprMgr, _this.m_rCustomSpr)
  setThePropOf(_this, "m_rCustomSpr", undefined);
  }

  return 1;
}

