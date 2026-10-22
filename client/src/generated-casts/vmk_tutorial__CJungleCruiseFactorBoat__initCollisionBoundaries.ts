// vmk_tutorial.cct / CJungleCruiseFactorBoat / initCollisionBoundaries

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initCollisionBoundaries(_me: LingoMe) {
  var tWorldPos = callMethod("GetParam", callMethod("getObject", _me), "WorldPosition");
  var tCollRadius = callMethod("GetParam", callMethod("getObject", _me), "BoundingCircleRadius");
  var tDirection = callMethod("GetParam", callMethod("getObject", _me), "Direction");
  switch (tDirection) {
case "up":
  setMeProp(_me, "m_p_BindDisplacement", callNamed("vector", 0, 50, 0));
  break;
case "down":
  setMeProp(_me, "m_p_BindDisplacement", callNamed("vector", -float(50), 0, 0));
  break;
  }

  callMethod("Init", meProp(_me, "m_p_BoundingCircles")[1], tWorldPos.x, tWorldPos.y, tCollRadius)
  callMethod("setClient", meProp(_me, "m_p_BoundingCircles")[1], _me)
  callMethod("setDrag", meProp(_me, "m_p_BoundingCircles")[1], meProp(_me, "m_i_velocity"))
  callMethod("SetType", meProp(_me, "m_p_BoundingCircles")[1], symbol("moving"))
  callMethod("addCollisionModifier", meProp(_me, "m_p_BoundingCircles")[1], symbol("circle"))
  callMethod("Init", meProp(_me, "m_p_BoundingCircles")[2], lingoBinary("add", tWorldPos.x, meProp(_me, "m_p_BindDisplacement").x), lingoBinary("add", tWorldPos.y, meProp(_me, "m_p_BindDisplacement").y), tCollRadius)
  callMethod("setClient", meProp(_me, "m_p_BoundingCircles")[2], _me)
  callMethod("setDrag", meProp(_me, "m_p_BoundingCircles")[2], meProp(_me, "m_i_velocity"))
  callMethod("SetType", meProp(_me, "m_p_BoundingCircles")[2], symbol("moving"))
  callMethod("addCollisionModifier", meProp(_me, "m_p_BoundingCircles")[2], symbol("circle"))
  callMethod("setBind", meProp(_me, "m_p_BoundingCircles")[1], meProp(_me, "m_p_BoundingCircles")[2])
  callMethod("setBind", meProp(_me, "m_p_BoundingCircles")[2], meProp(_me, "m_p_BoundingCircles")[1])
  setMeProp(_me, "m_b_collisionInited", 1);
}

