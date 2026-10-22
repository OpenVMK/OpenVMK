// vmk_mars_handler.cct / CAutopiaQuestTrackHandler / AnimationState

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
  switch (t_iState) {
case 0:
  callMethod("GateClosed", callMethod("getComponent", _me))
  break;
case 1:
  callMethod("GateOpen", callMethod("getComponent", _me))
  break;
  default:
  callNamed("error", _me, "Unknown animation state", symbol("AnimationState"))
  }

}

