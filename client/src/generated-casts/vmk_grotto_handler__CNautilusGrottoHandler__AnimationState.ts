// vmk_grotto_handler.cct / CNautilusGrottoHandler / AnimationState

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
  switch (t_iAnimRef) {
case 0:
  callMethod("HandleDisplay", callMethod("getComponent", _me), t_iState)
  break;
case 1:
  callMethod("HandleGate", callMethod("getComponent", _me), t_iState)
  break;
  default:
  callNamed("error", _me, "Unknown animation state", symbol("AnimationState"))
  }

}

