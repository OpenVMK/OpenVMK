// 3f02613936ba018480acffaf92dd883a.cct / CAnimationComponent / PlayAnim

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlayAnim(_me: LingoMe, i_animID: LingoValue, i_iFrameIndex: LingoValue) {
  var tArr = callMethod("getaProp", meProp(_me, "m_mp_arrangements"), i_animID);
  if (callNamed("voidp", tArr)) {
  return callNamed("error", _me, "Unknown Anim ID", symbol("PlayAnimation"));
  }

  callMethod("play", tArr, i_iFrameIndex)
}

