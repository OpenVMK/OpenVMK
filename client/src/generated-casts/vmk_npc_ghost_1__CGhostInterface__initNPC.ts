// vmk_npc_ghost_1.cct / CGhostInterface / initNPC

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initNPC(_me: LingoMe) {
  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  var tNode = callMethod("Search", tRoomContext, "NAME", "ghost_1");
  if (lingoBinary("eq", tNode, undefined)) {
  callNamed("put", "Ghost sprite not found")
  }

  if (lingoBinary("neq", tNode, undefined)) {
  var tSprite = callMethod("getSprite", callMethod("GetVisual", tNode));
  callNamed("put", lingoBinary("joinPad", "Ghost init", tSprite))
  if (lingoBinary("neq", tSprite, 0)) {
  if (lingoBinary("neq", tSprite.spriteNum, 0)) {
  setMeProp(_me, "m_npcSprite", callNamed("sprite", tSprite));
  callNamed("setEventBroker", meProp(_me, "m_npcSprite").spriteNum, "NPCGhost")
  callMethod("registerProcedure", meProp(_me, "m_npcSprite"), symbol("eventProcNPC"), callMethod("getID", _me), symbol("mouseUp"))
  setThePropOf(meProp(_me, "m_npcSprite"), "cursor", new LingoList([callNamed("getMember", "cursor.finger"), callNamed("getMember", "cursor.finger.mask")]));
  setMeProp(_me, "m_npcMoveStartPos", callNamed("vector", meProp(_me, "m_npcSprite").loc.locH, meProp(_me, "m_npcSprite").loc.locV, meProp(_me, "m_npcSprite").locZ));
  }

  }

  }

}

