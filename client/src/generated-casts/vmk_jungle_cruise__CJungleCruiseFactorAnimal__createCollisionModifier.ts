// vmk_jungle_cruise.cct / CJungleCruiseFactorAnimal / createCollisionModifier

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createCollisionModifier(_me: LingoMe) {
  setMeProp(_me, "m_p_BoundingCircle", callNamed("createObject", symbol("random"), "CBoundingCircle"));
  var tWorldPos = callMethod("GetParam", callMethod("getObject", _me), "WorldPosition");
  var tCollRadius = callMethod("GetParam", callMethod("getObject", _me), "BoundingCircleRadius");
  callMethod("Init", meProp(_me, "m_p_BoundingCircle"), tWorldPos.x, tWorldPos.y, tCollRadius)
  callMethod("setClient", meProp(_me, "m_p_BoundingCircle"), _me)
  callMethod("SetType", meProp(_me, "m_p_BoundingCircle"), symbol("static"))
}

