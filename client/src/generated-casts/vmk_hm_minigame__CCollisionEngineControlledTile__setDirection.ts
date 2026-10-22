// vmk_hm_minigame.cct / CCollisionEngineControlledTile / setDirection

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setDirection(_me: LingoMe, t_iDirection: LingoValue) {
  callMethod("setDirection", meProp(_me, "m_ar_BoundingObjects")[1], t_iDirection)
}

