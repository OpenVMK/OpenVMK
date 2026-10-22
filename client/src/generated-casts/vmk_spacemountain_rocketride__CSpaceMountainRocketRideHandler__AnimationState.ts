// vmk_spacemountain_rocketride.cct / CSpaceMountainRocketRideHandler / AnimationState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AnimationState(_me: LingoMe, tMsg: LingoValue) {
  var tAnimRef = callMethod("GetIntFrom", tMsg.connection);
  var tstate = callMethod("GetIntFrom", tMsg.connection);
  switch (tstate) {
case 0:
  callMethod("idle", callMethod("getComponent", _me))
  break;
case 1:
  callMethod("PreLaunch", callMethod("getComponent", _me))
  break;
case 2:
  callMethod("Depart", callMethod("getComponent", _me))
  break;
case 3:
  callMethod("Arrived", callMethod("getComponent", _me))
  break;
  default:
  callNamed("error", _me, "Unknown animation state", symbol("AnimationState"))
  }

}

