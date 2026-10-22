// vmk_junglecruise_minigame.cct / CJungleCruiseFactorBoat / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  for (var tCollisionBoudary of meProp(_me, "m_p_BoundingCircles").toArray()) {
  if (lingoBinary("neq", callNamed("getObject", callMethod("getID", tCollisionBoudary)), 0)) {
  callNamed("removeObject", callMethod("getID", tCollisionBoudary))
  }

  }

  return 1;
}

