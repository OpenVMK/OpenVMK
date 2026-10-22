// vmk_shark_reef_handler.cct / CSharkReefHandler / AnimationState

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
  callMethod("ShowSplash", callMethod("getComponent", _me), t_iAnimRef)
}

