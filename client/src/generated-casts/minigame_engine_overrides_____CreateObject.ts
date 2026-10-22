// minigame_engine_overrides.cct /  / _CreateObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _CreateObject(_me: LingoMe, i_sName: LingoValue, i_params: LingoValue) {
  if (lingoBinary("eq", callMethod("getaProp", _me.m_mp_objects, i_params[symbol("ref")]), undefined)) {
  var tObject = callMethod("_MinigameCreateObject", _me, i_sName, i_params);
  callMethod("addProp", _me.m_mp_objects, i_params[symbol("ref")], tObject)
  if (lingoBinary("eq", _me.m_mp_objects.count, 1)) {
  callMethod("sort", _me.m_mp_objects)
  }

  callMethod("append", _me.m_ar_ar_objByType[i_params[symbol("type")]], tObject)
  }

}

