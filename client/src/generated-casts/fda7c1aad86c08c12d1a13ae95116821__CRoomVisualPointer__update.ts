// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualPointer / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue) {
  if ((lingoTruthy(meProp(_me, "m_bReady")) ? 0 : 1)) {
  if (callNamed("objectExists", "RoomEventProcessor")) {
  var t_rSprMgr = callNamed("getObject", "RoomEventProcessor");
  } else {
  t_rSprMgr = callNamed("createObject", "RoomEventProcessor", "CRoomMouseEventProcessor");
  }

  setMeProp(_me, "m_rSprite", callMethod("CreateSprite", t_rSprMgr, callMethod("GetKey", callMethod("getObject", _this)), 1));
  var t_sMember = lingoBinary("join", "room_hiliter_", callMethod("GetParam", callMethod("GetContext", callMethod("getObject", _this)), "TILESIZE"));
  if (callNamed("memberExists", t_sMember)) {
  setMeProp(_me, "m_rMember", callNamed("getMember", t_sMember));
  setThePropOf(meProp(_me, "m_rSprite"), "member", meProp(_me, "m_rMember"));
  setThePropOf(meProp(_me, "m_rSprite"), "width", meProp(_me, "m_rSprite").member.width);
  setThePropOf(meProp(_me, "m_rSprite"), "height", meProp(_me, "m_rSprite").member.height);
  } else {
  callNamed("error", _this, "Mouse pointer graphics not found!", symbol("construct"))
  setMeProp(_me, "m_rMember", callNamed("member", 0));
  }

  setMeProp(_me, "m_bReady", 1);
  }

  var t_rObj = callMethod("getObject", _this);
  var t_sPointed = callMethod("GetParam", t_rObj, "POINTED");
  var t_veAbs = callMethod("GetAbsPos", t_rObj);
  setThePropOf(meProp(_me, "m_rSprite"), "locH", t_veAbs.x);
  setThePropOf(meProp(_me, "m_rSprite"), "locV", t_veAbs.y);
  setThePropOf(meProp(_me, "m_rSprite"), "locZ", t_veAbs.z);
  var t_rContext = callMethod("GetContext", t_rObj);
  var t_bVisible = 1;
  switch (t_sPointed) {
case "tile":
  setThePropOf(meProp(_me, "m_rSprite"), "member", callNamed("getMember", lingoBinary("join", "room_hiliter_", callMethod("GetParam", t_rContext, "TILESIZE"))));
  break;
case "exit":
  setThePropOf(meProp(_me, "m_rSprite"), "member", callNamed("getMember", lingoBinary("join", "exit_hiliter_", callMethod("GetParam", t_rContext, "TILESIZE"))));
  break;
case "teleport":
  setThePropOf(meProp(_me, "m_rSprite"), "member", callNamed("getMember", lingoBinary("join", "teleport_hiliter_", callMethod("GetParam", t_rContext, "TILESIZE"))));
  break;
case "queue":
  setThePropOf(meProp(_me, "m_rSprite"), "member", callNamed("getMember", lingoBinary("join", "queue_hiliter_", callMethod("GetParam", t_rContext, "TILESIZE"))));
  break;
case "sit":
  setThePropOf(meProp(_me, "m_rSprite"), "member", callNamed("getMember", lingoBinary("join", "sit_hiliter_", callMethod("GetParam", t_rContext, "TILESIZE"))));
  break;
case "hide":
  t_bVisible = 0;
  break;
  }

  setThePropOf(meProp(_me, "m_rSprite"), "width", meProp(_me, "m_rSprite").member.width);
  setThePropOf(meProp(_me, "m_rSprite"), "height", meProp(_me, "m_rSprite").member.height);
  setThePropOf(meProp(_me, "m_rSprite"), "visible", t_bVisible);
}

