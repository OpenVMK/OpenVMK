// vmk_tutorial.cct / CJungleCruiseFactorPowerup / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if ((lingoTruthy(meProp(_me, "m_b_collisionInited")) ? 0 : 1)) {
  callMethod("createCollisionModifier", _me)
  setMeProp(_me, "m_b_collisionInited", 1);
  callMethod("SetAbsPos", callMethod("getObject", _me), callMethod("GetParam", callMethod("getObject", _me), "WorldPosition"))
  }

}

