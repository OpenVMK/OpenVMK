// vmk_npc_treehouse.cct / CTreehouseInterface / initNPC

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initNPC(_me: LingoMe) {
  callMethod("initMouseBlockers", _me)
  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  var tNode = callMethod("Search", tRoomContext, "NAME", "pirate");
  var tSprite = callMethod("getSprite", callMethod("GetVisual", tNode));
  setMeProp(_me, "m_npcSprite", callNamed("sprite", tSprite));
  if (lingoBinary("neq", meProp(_me, "m_npcSprite").spriteNum, 0)) {
  callNamed("setEventBroker", meProp(_me, "m_npcSprite").spriteNum, "NPCPirate")
  callMethod("registerProcedure", meProp(_me, "m_npcSprite"), symbol("eventProcNPC"), callMethod("getID", _me), symbol("mouseUp"))
  setThePropOf(meProp(_me, "m_npcSprite"), "cursor", new LingoList([callNamed("getMember", "cursor.finger"), callNamed("getMember", "cursor.finger.mask")]));
  }

}

