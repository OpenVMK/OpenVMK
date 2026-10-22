// vmk_npc_ghost_2.cct / CGhostInterface / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, tNPC: LingoValue) {
  var tTime = theProperty("milliSeconds");
  if ((lingoTruthy(callNamed("voidp", tNPC)) ? 0 : 1)) {
  var tMyPos = callNamed("vector", meProp(_me, "m_npcSprite").loc.locH, meProp(_me, "m_npcSprite").loc.locV, meProp(_me, "m_npcSprite").locZ);
  var tNpcPos = callMethod("GetScrPos", tNPC);
  if (lingoBinary("eq", meProp(_me, "m_npcMoveMode"), symbol("stay"))) {
  if (lingoBinary("neq", tMyPos, tNpcPos)) {
  setMeProp(_me, "m_npcMoveMode", symbol("move"));
  setMeProp(_me, "m_npcDeltaDistance", lingoBinary("sub", tNpcPos, tMyPos));
  setMeProp(_me, "m_npcMoveStartPos", tMyPos);
  setMeProp(_me, "m_npcMoveStartTime", tTime);
  }

  } else {
  if (lingoBinary("eq", meProp(_me, "m_npcMoveMode"), symbol("move"))) {
  var tFactor = lingoBinary("div", lingoBinary("sub", tTime, meProp(_me, "m_npcMoveStartTime")), float(500));
  if (lingoBinary("gt", lingoBinary("sub", tTime, meProp(_me, "m_npcMoveStartTime")), 500)) {
  tFactor = float(1);
  }

  var tPos = lingoBinary("add", meProp(_me, "m_npcMoveStartPos"), lingoBinary("mul", tFactor, meProp(_me, "m_npcDeltaDistance")));
  setThePropOf(meProp(_me, "m_npcSprite"), "loc", callNamed("point", tPos.x, tPos.y));
  setThePropOf(meProp(_me, "m_npcSprite"), "locZ", tPos.z);
  if (lingoBinary("eq", tPos, tNpcPos)) {
  setThePropOf(meProp(_me, "m_npcSprite"), "loc", callNamed("point", tNpcPos.x, tNpcPos.y));
  setThePropOf(meProp(_me, "m_npcSprite"), "locZ", tNpcPos.z);
  setMeProp(_me, "m_npcMoveMode", symbol("stay"));
  } else {
  setMeProp(_me, "m_npcMoveMode", symbol("move"));
  setMeProp(_me, "m_npcDeltaDistance", lingoBinary("sub", tNpcPos, tPos));
  setMeProp(_me, "m_npcMoveStartPos", tPos);
  setMeProp(_me, "m_npcMoveStartTime", tTime);
  }

  } else {
  if (lingoBinary("eq", meProp(_me, "m_npcMoveMode"), symbol("warp"))) {
  setThePropOf(meProp(_me, "m_npcSprite"), "loc", callNamed("point", tNpcPos.x, tNpcPos.y));
  setThePropOf(meProp(_me, "m_npcSprite"), "locZ", tNpcPos.z);
  setMeProp(_me, "m_npcDeltaDistance", callNamed("vector", 0, 0, 0));
  setMeProp(_me, "m_npcMoveStartPos", tNpcPos);
  setMeProp(_me, "m_npcMoveStartTime", lingoBinary("sub", tTime, 500));
  setMeProp(_me, "m_npcMoveMode", symbol("stay"));
  }

  }

  }

  }

}

