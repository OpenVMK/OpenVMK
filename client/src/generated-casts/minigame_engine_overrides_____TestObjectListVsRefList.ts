// minigame_engine_overrides.cct /  / _TestObjectListVsRefList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _TestObjectListVsRefList(_me: LingoMe, i_ar_refList: LingoValue) {
  var tRef = new LingoList([]);
  for (var tIsThere = 1; tIsThere <= _me.m_mp_objects.count; ++tIsThere) {
  var i = callMethod("getPropAt", _me.m_mp_objects, tIsThere);
  var tListRef = 0;
  for (var t_ar_tobedeleted of i_ar_refList.toArray()) {
  if (lingoBinary("eq", t_ar_tobedeleted, i)) {
  tListRef = 1;
  }

  }

  if ((lingoTruthy(tListRef) ? 0 : 1)) {
  callMethod("append", tRef, i)
  }

  }

  for (var i of tRef.toArray()) {
  callMethod("_MinigameDeleteObject", _me, i)
  }

}

