// vmk_tutorial.cct / CJungleCruiseFactorAnimal / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  callMethod("SetAbsPos", callMethod("getObject", _me), callMethod("GetParam", callMethod("getObject", _me), "WorldPosition"))
  var tBlocker = callMethod("GetParam", callMethod("getObject", _me), "IsBlocker");
  var tScared = callMethod("GetParam", callMethod("getObject", _me), "IsScared");
  var tFrame = lingoBinary("add", callMethod("GetParam", callMethod("getObject", _me), "FrameNum"), 1);
  callMethod("SetParam", callMethod("getObject", _me), "FrameNum", tFrame)
  if ((lingoTruthy(meProp(_me, "m_b_collisionInited")) ? 0 : 1)) {
  if (tBlocker) {
  callMethod("createCollisionModifier", _me)
  }

  setMeProp(_me, "m_b_collisionInited", 1);
  }

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

  var tBoat = callMethod("GetParam", callMethod("getObject", _me), "Boat");
  var tDistance = callMethod("length", lingoBinary("sub", callMethod("GetAbsPos", callMethod("getObject", tBoat)), callMethod("GetAbsPos", callMethod("getObject", _me))));
  tstate = callMethod("GetParam", callMethod("getObject", _me), "State");
  if ((lingoTruthy(lingoBinary("eq", tstate, symbol("leave"))) ? 0 : 1)) {
  if (tScared) {
  if (lingoBinary("lt", tDistance, meProp(_me, "m_scareDistance"))) {
  callMethod("leave", _me)
  }

  }

  }

}

