// vmk_npc_treehouse.cct / CTreehouseInterface / createProcedure

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createProcedure(_me: LingoMe, t_NodeName: LingoValue, t_eventProc: LingoValue) {
  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  var tNode = callMethod("Search", tRoomContext, "NAME", t_NodeName);
  if (lingoBinary("neq", tNode, 0)) {
  var tSprite = callMethod("getSprite", callMethod("GetVisual", tNode));
  callMethod("append", meProp(_me, "m_mouseBlockerSprites"), tSprite)
  var t_MouseBlockersprite = callNamed("sprite", tSprite);
  callNamed("setEventBroker", t_MouseBlockersprite.spriteNum, t_NodeName)
  callMethod("registerProcedure", t_MouseBlockersprite, t_eventProc, callMethod("getID", _me), symbol("mouseUp"))
  setThePropOf(t_MouseBlockersprite, "cursor", -float(1));
  }

}

