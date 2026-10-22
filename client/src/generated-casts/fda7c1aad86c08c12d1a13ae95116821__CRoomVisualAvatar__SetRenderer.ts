// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualAvatar / SetRenderer

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
  if (callNamed("voidp", meProp(_me, "m_rMember"))) {
  var t_sMemName = lingoBinary("joinPad", callMethod("GetKey", callMethod("getObject", _this)), "Canvas");
  if (callNamed("createMember", t_sMemName, symbol("bitmap"))) {
  setMeProp(_me, "m_rMember", callNamed("getMember", t_sMemName));
  var t_iHeight = callNamed("getVariable", "avatarHeight", 160);
  var t_iWidth = callNamed("getVariable", "avatarWidth", 80);
  setThePropOf(meProp(_me, "m_rMember"), "image", callNamed("image", t_iWidth, t_iHeight, 32));
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
  if (callNamed("voidp", meProp(_me, "m_rShadowSpr"))) {
  setMeProp(_me, "m_rShadowSpr", callMethod("CreateSprite", t_rSprMgr, callMethod("GetKey", callMethod("getObject", _this)), 0));
  setThePropOf(meProp(_me, "m_rShadowSpr"), "member", callNamed("getMember", "room_avatar_shadow"));
  setThePropOf(meProp(_me, "m_rShadowSpr"), "width", meProp(_me, "m_rShadowSpr").member.width);
  setThePropOf(meProp(_me, "m_rShadowSpr"), "height", meProp(_me, "m_rShadowSpr").member.height);
  setThePropOf(meProp(_me, "m_rShadowSpr"), "ink", 39);
  setThePropOf(meProp(_me, "m_rShadowSpr"), "blend", 50);
  setThePropOf(meProp(_me, "m_rShadowSpr"), "locH", t_veScr.x);
  setThePropOf(meProp(_me, "m_rShadowSpr"), "locV", t_veScr.y);
  setThePropOf(meProp(_me, "m_rShadowSpr"), "locZ", t_veScr.z);
  }

  if (callNamed("voidp", meProp(_me, "m_rCanvasSpr"))) {
  setMeProp(_me, "m_rCanvasSpr", callMethod("CreateSprite", t_rSprMgr, callMethod("GetKey", callMethod("getObject", _this)), 1));
  setThePropOf(meProp(_me, "m_rCanvasSpr"), "member", meProp(_me, "m_rMember"));
  setThePropOf(meProp(_me, "m_rCanvasSpr"), "width", meProp(_me, "m_rCanvasSpr").member.width);
  setThePropOf(meProp(_me, "m_rCanvasSpr"), "height", meProp(_me, "m_rCanvasSpr").member.height);
  setThePropOf(meProp(_me, "m_rCanvasSpr"), "ink", 8);
  setThePropOf(meProp(_me, "m_rCanvasSpr"), "locH", t_veScr.x);
  setThePropOf(meProp(_me, "m_rCanvasSpr"), "locV", t_veScr.y);
  setThePropOf(meProp(_me, "m_rCanvasSpr"), "locZ", lingoBinary("add", t_veScr.z, 1));
  }

  callMethod("SetSpriteLoc", a_rRenderer, t_veScr)
}

