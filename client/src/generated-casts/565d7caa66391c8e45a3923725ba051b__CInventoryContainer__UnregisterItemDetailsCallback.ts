// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryContainer / UnregisterItemDetailsCallback

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UnregisterItemDetailsCallback(_me: LingoMe, _this: LingoValue, a_rTarget: LingoValue, a_kMethod: LingoValue) {
  var t_iHit = 0;
  for (var i = 1; i <= meProp(_me, "m_ar_mp_itemListCallbacks").count; ++i) {
  if (lingoBinary("and", lingoBinary("eq", meProp(_me, "m_ar_mp_detailsCallbacks")[i].target, a_rTarget), lingoBinary("eq", meProp(_me, "m_ar_mp_detailsCallbacks")[i].method, a_kMethod))) {
  t_iHit = i;
  break;
  }

  }

  if (lingoBinary("neq", t_iHit, 0)) {
  callMethod("deleteAt", meProp(_me, "m_ar_mp_detailsCallbacks"), t_iHit)
  }

}

