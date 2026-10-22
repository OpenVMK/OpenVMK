// vmk_npc_matterhorn.cct / CMatterhornInterface / initNPC

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initNPC(_me: LingoMe) {
  var tNode = callMethod("findNode", _me, "yeti");
  if (callNamed("objectp", tNode)) {
  var tSprite = callMethod("getSprite", callMethod("GetVisual", tNode));
  if (lingoBinary("neq", tSprite, 0)) {
  if (lingoBinary("neq", tSprite.spriteNum, 0)) {
  setMeProp(_me, "m_npcSprite", callNamed("sprite", tSprite));
  callNamed("setEventBroker", meProp(_me, "m_npcSprite").spriteNum, "NPCMatterhorn")
  callMethod("registerProcedure", meProp(_me, "m_npcSprite"), symbol("eventProcNPC"), callMethod("getID", _me), symbol("mouseUp"))
  setThePropOf(meProp(_me, "m_npcSprite"), "cursor", new LingoList([callNamed("getMember", "cursor.finger"), callNamed("getMember", "cursor.finger.mask")]));
  }

  }

  }

}

