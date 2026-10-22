// 3f02613936ba018480acffaf92dd883a.cct / CAnimationComponent / RemoveAnim

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemoveAnim(_me: LingoMe, i_animID: LingoValue) {
  var tArr = callMethod("getaProp", meProp(_me, "m_mp_arrangements"), i_animID);
  callNamed("removeObject", callMethod("getID", tArr))
  callMethod("deleteOne", meProp(_me, "m_mp_arrangements"), i_animID)
}

