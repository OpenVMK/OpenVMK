// minigame_engine_potc2.cct / CRoomObjectManager / FreeAll

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function FreeAll(_me: LingoMe) {
  for (var t_ar_pool of meProp(_me, "m_mp_ar_rUsepool").toArray()) {
  if (lingoBinary("gt", t_ar_pool.count, 0)) {
  for (var tObject of t_ar_pool.toArray()) {
  callMethod("FreeObject", _me, tObject)
  }

  }

  }

}

