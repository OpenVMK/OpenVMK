// vmk_hm_minigame.cct / CHMFactorPlayerObject / move

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function move(_me: LingoMe) {
  if (callNamed("voidp", meProp(_me, "m_rAvatar"))) {
  callMethod("SetConstants", _me)
  }

  if (callNamed("voidp", meProp(_me, "m_rAvatar"))) {
  return;
  }

  callMethod("SetParam", callMethod("getObject", _me), "WorldPosition", callNamed("intvector", 0, 0, 0))
  callMethod("SetParam", callMethod("getObject", _me), "Direction", 0)
}

