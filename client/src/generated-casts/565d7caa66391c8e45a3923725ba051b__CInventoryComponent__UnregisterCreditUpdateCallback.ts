// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryComponent / UnregisterCreditUpdateCallback

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UnregisterCreditUpdateCallback(_me: LingoMe, _this: LingoValue, a_kMethod: LingoValue, a_rObject: LingoValue) {
  for (var i = 1; i <= meProp(_me, "m_ar_mpCreditsCallbacks").count; ++i) {
  if (lingoBinary("and", lingoBinary("eq", meProp(_me, "m_ar_mpCreditsCallbacks")[i].method, a_kMethod), lingoBinary("eq", meProp(_me, "m_ar_mpCreditsCallbacks")[i]._object, a_rObject))) {
  callMethod("deleteAt", meProp(_me, "m_ar_mpCreditsCallbacks"), i)
  return 1;
  }

  }

  return callNamed("error", _this, "Tried to remove a credits update callback that was nonexistent.", symbol("UnregisterCreditUpdateCallback"));
}

