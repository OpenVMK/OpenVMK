// vmk_npc_ghost_3.cct / CGhostInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  callNamed("registerMessage", symbol("room_ready"), callMethod("getID", _me), symbol("initNPC"))
  callNamed("registerMessage", symbol("ghost_3_update"), callMethod("getID", _me), symbol("foo"))
  setMeProp(_me, "m_npcSprite", undefined);
  setMeProp(_me, "m_npcMoveMode", symbol("stay"));
  var m_npcMoveDeltaDistance = callNamed("vector", 0, 0, 0);
  setMeProp(_me, "m_npcMoveStartTime", theProperty("milliSeconds"));
  setMeProp(_me, "m_npcMoveStartPos", callNamed("vector", 0, 0, 0));
  return 1;
}

