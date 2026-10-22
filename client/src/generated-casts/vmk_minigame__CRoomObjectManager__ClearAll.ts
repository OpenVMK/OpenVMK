// vmk_minigame.cct / CRoomObjectManager / ClearAll

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ClearAll(_me: LingoMe) {
  for (var t_ar_pool of meProp(_me, "m_mp_ar_rUsepool").toArray()) {
  if (lingoBinary("gt", t_ar_pool.count, 0)) {
  for (var tObject of t_ar_pool.toArray()) {
  callMethod("RemoveRoomObject", _me, callMethod("GetParam", tObject, "CLASS"), callMethod("GetParam", tObject, "REF"))
  }

  t_ar_pool = new LingoList([]);
  }

  }

  setMeProp(_me, "m_mp_ar_rUsepool", new LingoPropList([]));
  for (var t_ar_pool of meProp(_me, "m_mp_ar_rFreepool").toArray()) {
  if (lingoBinary("gt", t_ar_pool.count, 0)) {
  for (var tObject of t_ar_pool.toArray()) {
  callMethod("RemoveRoomObject", _me, callMethod("GetParam", tObject, "CLASS"), callMethod("GetParam", tObject, "REF"))
  }

  t_ar_pool = new LingoList([]);
  }

  }

  setMeProp(_me, "m_mp_ar_rFreepool", new LingoPropList([]));
}

