// vmk_pirates2_minigame.cct / CWhirlpoolFactor / SetConstants

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetConstants(_me: LingoMe) {
  callMethod("SetParam", callMethod("getObject", _me), "BoundsType", symbol("circle"))
  callMethod("SetParam", callMethod("getObject", _me), "BoundingCirleRadius", 5000)
  callMethod("SetParam", callMethod("getObject", _me), "WindAffects", 0)
  callMethod("SetParam", callMethod("getObject", _me), "State", 0)
  callMethod("SetParam", callMethod("getObject", _me), "NextDeviationChange", 0)
  callMethod("SetParam", callMethod("getObject", _me), "CurDeviation", 1)
  var tStage = callMethod("GetStage", callMethod("getComponent", callNamed("getThread", "piratesminigame")));
  if ((lingoTruthy(callNamed("voidp", tStage)) ? 0 : 1)) {
  setMeProp(_me, "m_speed", callMethod("getaProp", callMethod("GetWhirlPoolSettings", tStage), "MoveSpeed"));
  setMeProp(_me, "m_pullradius", callMethod("getaProp", callMethod("GetWhirlPoolSettings", tStage), "PullRadius"));
  setMeProp(_me, "m_pullamount", callMethod("getaProp", callMethod("GetWhirlPoolSettings", tStage), "PullAmount"));
  setMeProp(_me, "m_spinspeed", callMethod("getaProp", callMethod("GetWhirlPoolSettings", tStage), "SpinSpeed"));
  setMeProp(_me, "m_releaseradius", callMethod("getaProp", callMethod("GetWhirlPoolSettings", tStage), "ReleaseRadius"));
  }

}

