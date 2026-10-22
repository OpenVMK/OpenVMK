// 3f02613936ba018480acffaf92dd883a.cct / CVMKAnimationManager / ClearAll

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ClearAll(_me: LingoMe) {
  while (lingoBinary("gt", meProp(_me, "m_ar_rAnimations").count, 0)) {
  var t_sAnimationID = callMethod("getPropAt", meProp(_me, "m_ar_rAnimations"), 1);
  callMethod("RemoveAnimation", _me, t_sAnimationID)
  }

  setMeProp(_me, "m_ar_rAnimations", new LingoPropList([]));
}

