// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualDefault / _Open

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _Open(_me: LingoMe, _this: LingoValue, a_rNode: LingoValue) {
  if (lingoBinary("gt", meProp(_me, "m_rSprite").spriteNum, 0)) {
  callMethod("_Close", _this)
  }

  var t_vePos = callMethod("GetScrPos", callMethod("getObject", _this));
  var t_sMember = a_rNode.param["MEMBER"];
  if (callNamed("memberExists", t_sMember)) {
  if (callNamed("objectExists", "RoomEventProcessor")) {
  var t_rSprMgr = callNamed("getObject", "RoomEventProcessor");
  } else {
  t_rSprMgr = callNamed("createObject", "RoomEventProcessor", "CRoomMouseEventProcessor");
  }

  setMeProp(_me, "m_rSprite", callMethod("CreateSprite", t_rSprMgr, callMethod("GetKey", callMethod("getObject", _this)), 0));
  setThePropOf(meProp(_me, "m_rSprite"), "member", callNamed("getMember", t_sMember));
  setThePropOf(meProp(_me, "m_rSprite"), "locH", t_vePos.x);
  setThePropOf(meProp(_me, "m_rSprite"), "locV", t_vePos.y);
  setThePropOf(meProp(_me, "m_rSprite"), "locZ", t_vePos.z);
  setThePropOf(meProp(_me, "m_rSprite"), "width", callNamed("integer", a_rNode.param["W"]));
  setThePropOf(meProp(_me, "m_rSprite"), "height", callNamed("integer", a_rNode.param["H"]));
  setThePropOf(meProp(_me, "m_rSprite"), "blend", callNamed("integer", a_rNode.param["BLEND"]));
  setThePropOf(meProp(_me, "m_rSprite"), "ink", callNamed("integer", a_rNode.param["INK"]));
  setThePropOf(meProp(_me, "m_rSprite"), "flipH", callNamed("integer", a_rNode.param["FLIPH"]));
  setThePropOf(meProp(_me, "m_rSprite"), "flipV", callNamed("integer", a_rNode.param["FLIPV"]));
  setThePropOf(meProp(_me, "m_rSprite"), "color", callNamed("rgb", a_rNode.param["COLOR"]));
  setThePropOf(meProp(_me, "m_rSprite"), "bgColor", callNamed("rgb", a_rNode.param["BGCOLOR"]));
  setThePropOf(meProp(_me, "m_rSprite"), "skew", callNamed("float", a_rNode.param["SKEW"]));
  setThePropOf(meProp(_me, "m_rSprite"), "rotation", callNamed("integer", a_rNode.param["ROTATION"]));
  } else {
  callNamed("error", _this, lingoBinary("joinPad", "Graphics not found:", t_sMember), symbol("_Open"))
  }

  return 1;
}

