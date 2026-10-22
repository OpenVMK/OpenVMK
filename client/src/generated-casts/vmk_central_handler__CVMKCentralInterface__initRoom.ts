// vmk_central_handler.cct / CVMKCentralInterface / initRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initRoom(_me: LingoMe) {
  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  var tNode = callMethod("Search", tRoomContext, "NAME", "central_1_cl");
  var tSprite = callMethod("getSprite", callMethod("GetVisual", tNode));
  setThePropOf(tSprite, "loc", tSprite.loc);
  var t_roomEventSprite = callNamed("sprite", tSprite);
  callNamed("setEventBroker", t_roomEventSprite.spriteNum, "central_1_cl")
  callMethod("registerProcedure", t_roomEventSprite, symbol("eventProcRoom"), callMethod("getID", _me), symbol("mouseDown"))
  setThePropOf(t_roomEventSprite, "cursor", new LingoList([callNamed("getMember", "cursor.finger"), callNamed("getMember", "cursor.finger.mask")]));
  callMethod("append", meProp(_me, "m_roomEventSprites"), t_roomEventSprite)
  tNode = callMethod("Search", tRoomContext, "NAME", "camera_click");
  tSprite = callMethod("getSprite", callMethod("GetVisual", tNode));
  setThePropOf(tSprite, "loc", tSprite.loc);
  t_roomEventSprite = callNamed("sprite", tSprite);
  callNamed("setEventBroker", t_roomEventSprite.spriteNum, "camera_click")
  callMethod("registerProcedure", t_roomEventSprite, symbol("eventProcRoom"), callMethod("getID", _me), symbol("mouseDown"))
  setThePropOf(t_roomEventSprite, "cursor", new LingoList([callNamed("getMember", "cursor.finger"), callNamed("getMember", "cursor.finger.mask")]));
  callMethod("append", meProp(_me, "m_roomEventSprites"), t_roomEventSprite)
  tNode = callMethod("Search", tRoomContext, "SPRITE", "vmk_quest_click");
  if (lingoBinary("neq", tNode, 0)) {
  tSprite = callMethod("getSprite", callMethod("GetVisual", tNode));
  if (lingoBinary("neq", tSprite, 0)) {
  setThePropOf(tSprite, "loc", tSprite.loc);
  t_roomEventSprite = callNamed("sprite", tSprite);
  callNamed("setEventBroker", t_roomEventSprite.spriteNum, "vmk_quest_click")
  callMethod("registerProcedure", t_roomEventSprite, symbol("eventProcRoom"), callMethod("getID", _me), symbol("mouseDown"))
  setThePropOf(t_roomEventSprite, "cursor", new LingoList([callNamed("getMember", "cursor.finger"), callNamed("getMember", "cursor.finger.mask")]));
  callMethod("append", meProp(_me, "m_roomEventSprites"), t_roomEventSprite)
  } else {
  callNamed("put", "Could not find the quest node sprite")
  }

  } else {
  callNamed("put", "Could not find the quest node")
  }

  tNode = callMethod("Search", tRoomContext, "SPRITE", "vmk_quest_click_b");
  if (lingoBinary("neq", tNode, 0)) {
  tSprite = callMethod("getSprite", callMethod("GetVisual", tNode));
  if (lingoBinary("neq", tSprite, 0)) {
  setThePropOf(tSprite, "loc", tSprite.loc);
  t_roomEventSprite = callNamed("sprite", tSprite);
  callNamed("setEventBroker", t_roomEventSprite.spriteNum, "vmk_quest_click_b")
  callMethod("registerProcedure", t_roomEventSprite, symbol("eventProcRoom"), callMethod("getID", _me), symbol("mouseDown"))
  setThePropOf(t_roomEventSprite, "cursor", new LingoList([callNamed("getMember", "cursor.finger"), callNamed("getMember", "cursor.finger.mask")]));
  callMethod("append", meProp(_me, "m_roomEventSprites"), t_roomEventSprite)
  } else {
  callNamed("put", "Could not find the quest node sprite")
  }

  } else {
  callNamed("put", "Could not find the quest node")
  }

}

