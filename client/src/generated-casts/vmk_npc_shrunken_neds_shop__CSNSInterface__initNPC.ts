// vmk_npc_shrunken_neds_shop.cct / CSNSInterface / initNPC

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
  var tNode = callMethod("Search", tRoomContext, "NAME", "neds_regpoint");
  var tSprite = callMethod("getSprite", callMethod("GetVisual", tNode));
  setMeProp(_me, "m_npcSprite", callNamed("sprite", tSprite));
  if (lingoBinary("neq", meProp(_me, "m_npcSprite").spriteNum, 0)) {
  callNamed("setEventBroker", meProp(_me, "m_npcSprite").spriteNum, "NPCNedsShop")
  callMethod("registerProcedure", meProp(_me, "m_npcSprite"), symbol("eventProcNPC"), callMethod("getID", _me), symbol("mouseUp"))
  setThePropOf(meProp(_me, "m_npcSprite"), "cursor", new LingoList([callNamed("getMember", "cursor.finger"), callNamed("getMember", "cursor.finger.mask")]));
  }

}

