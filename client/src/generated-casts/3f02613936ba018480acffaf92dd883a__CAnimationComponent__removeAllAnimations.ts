// 3f02613936ba018480acffaf92dd883a.cct / CAnimationComponent / removeAllAnimations

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function removeAllAnimations(_me: LingoMe) {
  for (var i = 1; i <= meProp(_me, "m_mp_arrangements").count; ++i) {
  var t_arrangementID = lingoBinary("join", "RoomAnimation:", callMethod("getPropAt", meProp(_me, "m_mp_arrangements"), i));
  if (lingoBinary("neq", t_arrangementID, 0)) {
  callNamed("removeObject", t_arrangementID)
  }

  }

  if (callNamed("listp", meProp(_me, "m_mp_arrangements"))) {
  callMethod("deleteAll", meProp(_me, "m_mp_arrangements"))
  }

}

