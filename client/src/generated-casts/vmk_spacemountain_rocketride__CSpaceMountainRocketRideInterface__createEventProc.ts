// vmk_spacemountain_rocketride.cct / CSpaceMountainRocketRideInterface / createEventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createEventProc(_me: LingoMe, t_NodeName: LingoValue, t_eventProc: LingoValue) {
  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  var tNode = callMethod("Search", tRoomContext, "NAME", t_NodeName);
  if (lingoBinary("neq", tNode, 0)) {
  var tSprite = callMethod("getSprite", callMethod("GetVisual", tNode));
  callMethod("append", meProp(_me, "m_ar_eventSprites"), tSprite)
  var t_rRoomSprite = callNamed("sprite", tSprite);
  callNamed("setEventBroker", t_rRoomSprite.spriteNum, t_NodeName)
  callMethod("registerProcedure", t_rRoomSprite, t_eventProc, callMethod("getID", _me), symbol("mouseUp"))
  setThePropOf(t_rRoomSprite, "cursor", new LingoList([callNamed("getMember", "cursor.finger"), callNamed("getMember", "cursor.finger.mask")]));
  }

}

