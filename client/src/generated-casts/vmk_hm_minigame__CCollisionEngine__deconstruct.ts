// vmk_hm_minigame.cct / CCollisionEngine / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("removeTimeout", "HMGCollisionEngineUpdate")
  callNamed("unregisterMessage", symbol("AddTileCollisionObject"), callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("RemoveTileCollisionObject"), callMethod("getID", _me))
  setMeProp(_me, "m_ar_tiles2D", new LingoList([]));
  setMeProp(_me, "detectedCollisions", new LingoList([]));
  setMeProp(_me, "m_ar_collisionObjects", new LingoList([]));
  return 1;
}

