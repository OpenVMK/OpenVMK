// vmk_fireworks_minigame.cct / CVectorStruct / rotateClockwise

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

// HAND-CORRECTED: `me.ancestor = []` makes the object a list in Director; keep the items in m_ar_vector instead.
export function rotateClockwise(_me: LingoMe) {
  callMethod("push", _me, callMethod("Shift", _me))
}
