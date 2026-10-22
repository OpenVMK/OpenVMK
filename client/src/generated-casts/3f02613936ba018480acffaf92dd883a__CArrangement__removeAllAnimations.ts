// 3f02613936ba018480acffaf92dd883a.cct / CArrangement / removeAllAnimations

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function removeAllAnimations(_me: LingoMe) {
  for (var tAnim of meProp(_me, "m_ar_pAnimations").toArray()) {
  var tID = callMethod("getID", tAnim);
  if (lingoBinary("neq", tID, 0)) {
  callNamed("removeObject", tID)
  }

  }

  if (callNamed("listp", meProp(_me, "m_ar_pAnimations"))) {
  callMethod("deleteAll", meProp(_me, "m_ar_pAnimations"))
  }

}

