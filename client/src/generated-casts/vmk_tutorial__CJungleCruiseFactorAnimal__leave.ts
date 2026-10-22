// vmk_tutorial.cct / CJungleCruiseFactorAnimal / leave

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function leave(_me: LingoMe) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_p_BoundingCircle"))) ? 0 : 1)) {
  var tID = callMethod("getID", meProp(_me, "m_p_BoundingCircle"));
  if (lingoBinary("neq", callNamed("getObject", tID), 0)) {
  callNamed("removeObject", tID)
  }

  }

  callMethod("SetParam", callMethod("getObject", _me), "State", symbol("leave"))
  callMethod("SetParam", callMethod("getObject", _me), "FrameNum", 1)
  callMethod("SetParam", callMethod("getObject", _me), "Time", lingoBinary("div", callNamed("float", callMethod("GetParam", callMethod("getObject", _me), "Leave").count), float(30)))
}

