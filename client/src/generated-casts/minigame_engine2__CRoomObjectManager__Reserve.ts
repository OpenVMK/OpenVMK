// minigame_engine2.cct / CRoomObjectManager / Reserve

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Reserve(_me: LingoMe, a_sClass: LingoValue, a_iCount: LingoValue) {
  var tClassPool = callMethod("getaProp", meProp(_me, "m_mp_ar_rFreepool"), a_sClass);
  if (callNamed("voidp", tClassPool)) {
  callMethod("setaProp", meProp(_me, "m_mp_ar_rFreepool"), a_sClass, new LingoList([]))
  }

  tClassPool = callMethod("getaProp", meProp(_me, "m_mp_ar_rFreepool"), a_sClass);
  if (callNamed("voidp", a_iCount)) {
  a_iCount = meProp(_me, "m_iAllocationSize");
  }

  for (var i = 1; i <= a_iCount; ++i) {
  var tNewObject = callMethod("CreateRoomObject", _me, a_sClass, callMethod("GetNewRef", _me));
  callMethod("deconstruct", tNewObject.m_rFactor)
  callMethod("deconstruct", tNewObject.m_rVisual)
  callMethod("SetParam", tNewObject, "StandardFactor", callMethod("GetFactor", tNewObject))
  callMethod("SetParam", tNewObject, "StandardVisual", callMethod("GetVisual", tNewObject))
  setThePropOf(tNewObject, "m_rFactor", meProp(_me, "m_rEmptyFactor"));
  setThePropOf(tNewObject, "m_rVisual", meProp(_me, "m_rEmptyVisual"));
  callMethod("append", tClassPool, tNewObject)
  }

}

