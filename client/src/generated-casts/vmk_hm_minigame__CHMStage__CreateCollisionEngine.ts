// vmk_hm_minigame.cct / CHMStage / CreateCollisionEngine

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateCollisionEngine(_me: LingoMe) {
  if (lingoBinary("neq", callNamed("getObject", "HMCollisionEngine"), 0)) {
  callNamed("removeObject", "HMCollisionEngine")
  }

  setMeProp(_me, "m_p_CollisionEngine", callNamed("createObject", "HMCollisionEngine", "CCollisionEngine"));
  callMethod("parseRoom", meProp(_me, "m_p_CollisionEngine"))
}

