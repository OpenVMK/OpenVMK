// vmk_mystics.cct /  / SetRenderer

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetRenderer(_me: LingoMe, _this: LingoValue, a_rRenderer: LingoValue) {
  setMeProp(_me, "m_rRenderer", a_rRenderer);
  setMeProp(_me, "m_iTileSize", callNamed("integer", callMethod("GetParam", callMethod("GetContext", _this.m_rObject), "TILESIZE")));
  if (callNamed("voidp", _this.m_rMember)) {
  var t_sMemName = lingoBinary("joinPad", callMethod("GetKey", callMethod("getObject", _this)), "Canvas");
  if (callNamed("createMember", t_sMemName, symbol("bitmap"))) {
  setMeProp(_me, "m_rMember", callNamed("getMember", t_sMemName));
  var t_iHeight = callNamed("getVariable", "avatarHeight", 160);
  var t_iWidth = callNamed("getVariable", "avatarWidth", 80);
  setThePropOf(_this.m_rMember, "image", callNamed("image", t_iWidth, t_iHeight, 32));
  } else {
  return callNamed("error", _this, "Failed to create canvas resource!", symbol("SetRenderer"));
  }

  }

  if (callNamed("objectExists", "RoomEventProcessor")) {
  var t_rSprMgr = callNamed("getObject", "RoomEventProcessor");
  } else {
  t_rSprMgr = callNamed("createObject", "RoomEventProcessor", "CRoomMouseEventProcessor");
  }

  var t_veScr = callMethod("GetScrPos", callMethod("getObject", _this));
  if (callNamed("voidp", _this.m_rShadowSpr)) {
  setMeProp(_me, "m_rShadowSpr", callMethod("CreateSprite", t_rSprMgr, callMethod("GetKey", callMethod("getObject", _this)), 0));
  setThePropOf(_this.m_rShadowSpr, "member", callNamed("getMember", "room_avatar_shadow"));
  setThePropOf(_this.m_rShadowSpr, "width", _this.m_rShadowSpr.member.width);
  setThePropOf(_this.m_rShadowSpr, "height", _this.m_rShadowSpr.member.height);
  setThePropOf(_this.m_rShadowSpr, "ink", 39);
  setThePropOf(_this.m_rShadowSpr, "blend", 50);
  setThePropOf(_this.m_rShadowSpr, "locH", t_veScr.x);
  setThePropOf(_this.m_rShadowSpr, "locV", t_veScr.y);
  setThePropOf(_this.m_rShadowSpr, "locZ", t_veScr.z);
  }

  if (callNamed("voidp", _this.m_rCanvasSpr)) {
  setMeProp(_me, "m_rCanvasSpr", callMethod("CreateSprite", t_rSprMgr, callMethod("GetKey", callMethod("getObject", _this)), 1));
  setThePropOf(_this.m_rCanvasSpr, "member", _this.m_rMember);
  setThePropOf(_this.m_rCanvasSpr, "width", _this.m_rCanvasSpr.member.width);
  setThePropOf(_this.m_rCanvasSpr, "height", _this.m_rCanvasSpr.member.height);
  setThePropOf(_this.m_rCanvasSpr, "ink", 8);
  setThePropOf(_this.m_rCanvasSpr, "locH", t_veScr.x);
  setThePropOf(_this.m_rCanvasSpr, "locV", t_veScr.y);
  setThePropOf(_this.m_rCanvasSpr, "locZ", lingoBinary("add", t_veScr.z, 1));
  }

  callMethod("SetSpriteLoc", a_rRenderer, t_veScr)
}

