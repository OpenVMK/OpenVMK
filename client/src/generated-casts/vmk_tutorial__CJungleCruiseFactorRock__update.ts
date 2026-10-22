// vmk_tutorial.cct / CJungleCruiseFactorRock / update

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
  callMethod("SetAbsPos", callMethod("getObject", _me), callMethod("GetParam", callMethod("getObject", _me), "WorldPosition"))
  setMeProp(_me, "m_b_collisionInited", 1);
  }

  var tFrame = lingoBinary("add", callMethod("GetParam", callMethod("getObject", _me), "FrameNum"), 1);
  callMethod("SetParam", callMethod("getObject", _me), "FrameNum", tFrame)
  var tstate = callMethod("GetParam", callMethod("getObject", _me), "State");
  switch (tstate) {
case symbol("entry"):
  if (lingoBinary("gt", tFrame, callMethod("GetParam", callMethod("getObject", _me), "Entry").count)) {
  callMethod("SetParam", callMethod("getObject", _me), "FrameNum", 1)
  callMethod("SetParam", callMethod("getObject", _me), "State", symbol("loop"))
  }

  break;
case symbol("loop"):
  break;
case symbol("leave"):
  break;
  }

}

