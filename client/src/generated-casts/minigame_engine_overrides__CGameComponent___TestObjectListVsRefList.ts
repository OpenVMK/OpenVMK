// minigame_engine_overrides.cct / CGameComponent / _TestObjectListVsRefList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _TestObjectListVsRefList(_me: LingoMe, i_ar_refList: LingoValue) {
  var t_ar_tobedeleted = new LingoList([]);
  for (var i = 1; i <= _me.m_mp_objects.count; ++i) {
  var tRef = callMethod("getPropAt", _me.m_mp_objects, i);
  var tIsThere = 0;
  for (var tListRef of i_ar_refList.toArray()) {
  if (lingoBinary("eq", tListRef, tRef)) {
  tIsThere = 1;
  }

  }

  if ((lingoTruthy(tIsThere) ? 0 : 1)) {
  callMethod("append", t_ar_tobedeleted, tRef)
  }

  }

  for (var tRef of t_ar_tobedeleted.toArray()) {
  callMethod("_MinigameDeleteObject", _me, tRef)
  }

}

