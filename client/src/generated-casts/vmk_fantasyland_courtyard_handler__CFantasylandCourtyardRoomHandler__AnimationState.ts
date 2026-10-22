// vmk_fantasyland_courtyard_handler.cct / CFantasylandCourtyardRoomHandler / AnimationState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AnimationState(_me: LingoMe, tMsg: LingoValue) {
  var t_iAnimRef = callMethod("GetIntFrom", tMsg.connection);
  var t_iState = callMethod("GetIntFrom", tMsg.connection);
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "Animation State", t_iAnimRef), t_iState))
  switch (t_iState) {
case 0:
  callMethod("SwordIdle", callMethod("getComponent", _me), t_iAnimRef)
  break;
case 1:
  callMethod("SwordSuccess", callMethod("getComponent", _me), t_iAnimRef)
  callNamed("executeMessage", "PlayFxSound", "VMK-swordfromstone-v1")
  break;
case 2:
  callMethod("SwordFailure", callMethod("getComponent", _me), t_iAnimRef)
  break;
  default:
  callNamed("error", _me, "Unknown animation state", symbol("AnimationState"))
  }

}

