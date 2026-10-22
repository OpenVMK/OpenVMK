// vmk_tutorial.cct / CJungleCruiseFactorBoat / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_baseSteer", callNamed("getVariableValue", "river.forces.baseSteer"));
  setMeProp(_me, "m_speed", meProp(_me, "m_baseSpeed"));
  setMeProp(_me, "m_lastTime", theProperty("milliSeconds"));
  setMeProp(_me, "m_mp_blockers", new LingoPropList([]));
  setMeProp(_me, "m_collisionDisabled", 0);
  setMeProp(_me, "m_collMinDT", float(1));
  setMeProp(_me, "m_lastCollision", theProperty("milliSeconds"));
  setMeProp(_me, "m_baseSpeed", callNamed("getVariableValue", "boat.basespeed"));
  setMeProp(_me, "m_fSteerLimit", callNamed("getVariableValue", "boat.steerlimit"));
  setMeProp(_me, "m_fSteerAmount", callNamed("getVariableValue", "boat.steeramount"));
  setMeProp(_me, "m_fAccelLimit", callNamed("getVariableValue", "boat.accellimit"));
  setMeProp(_me, "m_fAccelAmount", callNamed("getVariableValue", "boat.accelamount"));
  setMeProp(_me, "m_fBrakeLimit", callNamed("getVariableValue", "boat.brakelimit"));
  setMeProp(_me, "m_fBrakeAmount", callNamed("getVariableValue", "boat.brakeamount"));
  setMeProp(_me, "m_i_throttle", callNamed("getVariableValue", "boat.forces.throttle"));
  setMeProp(_me, "m_i_velocity", callNamed("getVariableValue", "boat.forces.velocity"));
  setMeProp(_me, "m_i_steer", callNamed("getVariableValue", "boat.forces.steer"));
  setMeProp(_me, "m_i_collisionBounce", callNamed("getVariableValue", "boat.forces.collisionBounce"));
  setMeProp(_me, "m_i_collisionFriction", callNamed("getVariableValue", "boat.forces.collisionFriction"));
  setMeProp(_me, "m_p_BoundingCircles", new LingoList([]));
  var tCircle = callNamed("createObject", lingoBinary("join", "BoatBoundingCircle", callNamed("getUniqueID")), "CBoundingCircle");
  callMethod("append", meProp(_me, "m_p_BoundingCircles"), tCircle)
  tCircle = callNamed("createObject", lingoBinary("join", "BoatBoundingCircle", callNamed("getUniqueID")), "CBoundingCircle");
  callMethod("append", meProp(_me, "m_p_BoundingCircles"), tCircle)
  setMeProp(_me, "m_b_collisionInited", 0);
  setMeProp(_me, "m_p_BindDisplacement", callNamed("vector", 0, 0, 0));
  return 1;
}

