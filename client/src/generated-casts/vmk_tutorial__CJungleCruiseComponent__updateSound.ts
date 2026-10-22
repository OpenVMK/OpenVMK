// vmk_tutorial.cct / CJungleCruiseComponent / updateSound

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateSound(_me: LingoMe) {
  if (lingoBinary("neq", meProp(_me, "m_boat"), 0)) {
  var tSpeed = callMethod("getSpeed", callMethod("GetFactor", meProp(_me, "m_boat")));
  var t_bOn = callMethod("get", callNamed("getObject", symbol("session")), "fx");
  if (t_bOn) {
  callMethod("PitchSound", meProp(_me, "m_rMotorSound"), lingoBinary("add", lingoBinary("mul", tSpeed, float(3)), float(1)))
  }

  }

}

