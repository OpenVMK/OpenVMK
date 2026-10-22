// vmk_jungle_cruise.cct / CStage / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  if (lingoBinary("neq", meProp(_me, "m_splines")[1], 0)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_splines")[1]))
  }

  if (lingoBinary("neq", meProp(_me, "m_splines")[2], 0)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_splines")[2]))
  }

  if (lingoBinary("neq", meProp(_me, "m_splines")[3], 0)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_splines")[3]))
  }

  if (meProp(_me, "m_bVisualizeBoundaries")) {
  callNamed("releaseSprite", meProp(_me, "m_p_CollisionMapSprite").spriteNum)
  }

  if (lingoBinary("neq", callNamed("getObject", "JungleCruiseCollisionEngine"), 0)) {
  callNamed("removeObject", "JungleCruiseCollisionEngine")
  }

  if (lingoBinary("neq", callNamed("getmemnum", "CollisionBoundaries"), 0)) {
  callNamed("removeMember", "CollisionBoundaries")
  }

  return 1;
}

