// vmk_npc_shrunken_neds_shop.cct / CSNSInterface / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("unregisterMessage", symbol("room_ready"), callMethod("getID", _me), symbol("initNPC"))
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_npcSprite"))) ? 0 : 1)) {
  callNamed("removeEventBroker", meProp(_me, "m_npcSprite").spriteNum)
  }

  return 1;
}

