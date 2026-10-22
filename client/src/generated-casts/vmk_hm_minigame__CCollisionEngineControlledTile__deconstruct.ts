// vmk_hm_minigame.cct / CCollisionEngineControlledTile / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("removeUpdate", callMethod("getID", _me))
  for (var tCollisionBoudary of meProp(_me, "m_ar_BoundingObjects").toArray()) {
  if (callNamed("objectp", tCollisionBoudary)) {
  callNamed("removeObject", callMethod("getID", tCollisionBoudary))
  }

  }

  return 1;
}

