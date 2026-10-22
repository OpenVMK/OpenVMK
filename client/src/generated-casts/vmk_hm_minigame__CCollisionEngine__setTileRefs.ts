// vmk_hm_minigame.cct / CCollisionEngine / setTileRefs

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setTileRefs(_me: LingoMe, a_ar_floors: LingoValue) {
  setMeProp(_me, "m_ar_tileRef", new LingoList([]));
  for (var t_ar_floor of a_ar_floors.toArray()) {
  for (var t_iRef of t_ar_floor[3].toArray()) {
  callMethod("append", meProp(_me, "m_ar_tileRef"), t_iRef)
  }

  }

}

