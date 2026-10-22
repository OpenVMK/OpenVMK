// minigame_engine.cct / CRoomObjectManager / newObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function newObject(_me: LingoMe, a_sClass: LingoValue, a_mp_params: LingoValue) {
  var tClassPool = callMethod("getaProp", meProp(_me, "m_mp_ar_rFreepool"), a_sClass);
  if (callNamed("voidp", tClassPool)) {
  callMethod("Reserve", _me, a_sClass)
  }

  tClassPool = callMethod("getaProp", meProp(_me, "m_mp_ar_rFreepool"), a_sClass);
  if (lingoBinary("lt", tClassPool.count, 1)) {
  callMethod("Reserve", _me, a_sClass)
  }

  var tUsePool = callMethod("getaProp", meProp(_me, "m_mp_ar_rUsepool"), a_sClass);
  if (callNamed("voidp", tUsePool)) {
  callMethod("setaProp", meProp(_me, "m_mp_ar_rUsepool"), a_sClass, new LingoList([]))
  }

  tUsePool = callMethod("getaProp", meProp(_me, "m_mp_ar_rUsepool"), a_sClass);
  var tObject = tClassPool[tClassPool.count];
  setThePropOf(tObject, "m_rFactor", callMethod("GetParam", tObject, "StandardFactor"));
  setThePropOf(tObject, "m_rVisual", callMethod("GetParam", tObject, "StandardVisual"));
  callMethod("construct", tObject.m_rFactor)
  callMethod("construct", tObject.m_rVisual)
  callMethod("deleteAt", tClassPool, tClassPool.count)
  callMethod("append", tUsePool, tObject)
  if ((lingoTruthy(callNamed("voidp", a_mp_params)) ? 0 : 1)) {
  for (var i = 1; i <= a_mp_params.count; ++i) {
  var tKey = callMethod("getPropAt", a_mp_params, i);
  var tValue = callMethod("getaProp", a_mp_params, tKey);
  callMethod("SetParam", tObject, tKey, tValue)
  }

  }

  return tObject;
}

