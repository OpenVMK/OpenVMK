// vmk_junglecruise_minigame.cct / CJungleCruiseFactorBoat / force

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function force(_me: LingoMe, a_fSteer: LingoValue, a_fThrottle: LingoValue, a_direction: LingoValue) {
  switch (a_direction) {
case "up":
  var tBaseVector = callNamed("vector", 0, -float(0.3), 0);
  var tSteerVector = callNamed("vector", 0.2, 0, 0);
  break;
case "down":
  tBaseVector = callNamed("vector", 0.3, 0, 0);
  tSteerVector = callNamed("vector", 0, 0.2, 0);
  break;
  }

  return lingoBinary("add", lingoBinary("mul", tBaseVector, lingoBinary("add", a_fThrottle, meProp(_me, "m_baseSpeed"))), lingoBinary("mul", lingoBinary("mul", tSteerVector, a_fSteer), meProp(_me, "m_baseSteer")));
}

