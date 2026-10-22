// vmk_hm_minigame.cct / CHMGameComponent / createTileMover

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createTileMover(_me: LingoMe, t_iAvatarRef: LingoValue) {
  setMeProp(_me, "m_rMyAvatarMover", callNamed("createObject", "HMCollider", "CCollisionEngineControlledTile"));
  callMethod("Init", meProp(_me, "m_rMyAvatarMover"), t_iAvatarRef)
}

