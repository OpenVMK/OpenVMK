// vmk_jungle_cruise.cct / CJungleCruiseFactorBoat / GoLeft

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GoLeft(_me: LingoMe) {
  var tStage = callMethod("GetParam", callMethod("getObject", _me), "Stage");
  if ((lingoTruthy(callNamed("voidp", tStage)) ? 0 : 1)) {
  var tSteer = callMethod("GetParam", callMethod("getObject", _me), "Steer");
  tSteer = lingoBinary("sub", tSteer, meProp(_me, "m_fSteerAmount"));
  if (lingoBinary("lt", tSteer, -float(meProp(_me, "m_fSteerLimit")))) {
  tSteer = -float(meProp(_me, "m_fSteerLimit"));
  }

  if (lingoBinary("gt", tSteer, meProp(_me, "m_fSteerLimit"))) {
  tSteer = meProp(_me, "m_fSteerLimit");
  }

  callMethod("SetParam", callMethod("getObject", _me), "Steer", tSteer)
  }

}

