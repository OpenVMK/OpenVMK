// vmk_junglecruise_minigame.cct / CJungleCruiseFactorBoat / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  var tStage = callMethod("GetParam", callMethod("getObject", _me), "Stage");
  var tDirection = callMethod("GetParam", callMethod("getObject", _me), "Direction");
  var tThrottle = callMethod("GetParam", callMethod("getObject", _me), "Throttle");
  var tSteer = callMethod("GetParam", callMethod("getObject", _me), "Steer");
  var tVelocity = callMethod("GetParam", callMethod("getObject", _me), "Velocity");
  if ((lingoTruthy(callNamed("voidp", tStage)) ? 0 : 1)) {
  if ((lingoTruthy(meProp(_me, "m_b_collisionInited")) ? 0 : 1)) {
  callMethod("initCollisionBoundaries", _me)
  }

  var tForce = callMethod("force", _me, tSteer, tThrottle, tDirection);
  callMethod("setForce", meProp(_me, "m_p_BoundingCircles")[1], tForce)
  callMethod("setForce", meProp(_me, "m_p_BoundingCircles")[2], tForce)
  tSteer = lingoBinary("mul", tSteer, meProp(_me, "m_i_steer"));
  tThrottle = lingoBinary("mul", tThrottle, meProp(_me, "m_i_throttle"));
  callMethod("SetParam", callMethod("getObject", _me), "Steer", tSteer)
  callMethod("SetParam", callMethod("getObject", _me), "Throttle", tThrottle)
  callMethod("SetParam", callMethod("getObject", _me), "Velocity", meProp(_me, "m_p_BoundingCircles")[1].velocity)
  callMethod("SetParam", callMethod("getObject", _me), "WorldPosition", meProp(_me, "m_p_BoundingCircles")[1].origin)
  var tPos = callMethod("GetParam", callMethod("getObject", _me), "WorldPosition");
  callMethod("SetAbsPos", callMethod("getObject", _me), tPos)
  }

}

