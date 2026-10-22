// vmk_junglecruise_minigame.cct / CJungleCruiseFactorAnimal / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  var tBoat = callMethod("GetParam", callMethod("getObject", _me), "Boat");
  if ((lingoTruthy(callNamed("voidp", callMethod("GetFactor", tBoat))) ? 0 : 1)) {
  callMethod("SetBlocked", callMethod("GetFactor", tBoat), 0, meProp(_me, "m_randomID"))
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_p_BoundingCircle"))) ? 0 : 1)) {
  var tID = callMethod("getID", meProp(_me, "m_p_BoundingCircle"));
  if (lingoBinary("neq", callNamed("getObject", tID), 0)) {
  callNamed("removeObject", tID)
  }

  }

  return 1;
}

