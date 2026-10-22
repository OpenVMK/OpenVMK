// vmk_jungle_cruise.cct / CBoundingCircle / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "circleIntersection", callNamed("vector", 0, 0, 0));
  setMeProp(_me, "collisionModifiers", new LingoList([]));
  setMeProp(_me, "origin", callNamed("vector", 0, 0, 0));
  setMeProp(_me, "radius", 0);
  setMeProp(_me, "IVEBEENHIT", 0);
  setMeProp(_me, "velocity", callNamed("vector", float(0), float(0), 0));
  setMeProp(_me, "normal", callNamed("vector", float(0), float(0), 0));
  setMeProp(_me, "m_pForce", callNamed("vector", 0, 0, 0));
  setMeProp(_me, "m_pVelocityModifier", float(1));
  setMeProp(_me, "circleType", symbol("moving"));
  setMeProp(_me, "animating", 0);
  setMeProp(_me, "mass", float(1));
  setMeProp(_me, "minSpeed", 0);
  setMeProp(_me, "maxSpeed", float(2));
  setMeProp(_me, "bind", undefined);
  setMeProp(_me, "follower", 0);
  setMeProp(_me, "m_s_BoundaryName", "");
  setMeProp(_me, "m_iClientID", undefined);
  setMeProp(_me, "bindDistance", callNamed("vector", 0, 0, 0));
  callMethod("setColor", _me, callNamed("rgb", "#FFFFFF"))
  callMethod("reset", _me)
  setMeProp(_me, "m_bVisualizeBoundary", callNamed("getVariableValue", "junglecruise.collisionboundaries.visible"));
  callNamed("executeMessage", symbol("addCollisionObject"), _me)
  return 1;
}

