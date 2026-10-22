// vmk_fireworks_minigame.cct / CVectorStruct / isEmpty

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

// HAND-CORRECTED: `me.ancestor = []` makes the object a list in Director; keep the items in m_ar_vector instead.
export function isEmpty(_me: LingoMe) {
  return meProp(_me, "m_ar_vector").count === 0 ? 1 : 0;
}
