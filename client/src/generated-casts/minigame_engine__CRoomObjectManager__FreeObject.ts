// minigame_engine.cct / CRoomObjectManager / FreeObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function FreeObject(_me: LingoMe, a_rObject: LingoValue) {
  var t_sClass = callMethod("GetParam", a_rObject, "CLASS");
  var tUsePool = callMethod("getaProp", meProp(_me, "m_mp_ar_rUsepool"), t_sClass);
  var t_iIndex = callMethod("getOne", tUsePool, a_rObject);
  if (lingoBinary("eq", t_iIndex, 0)) {
  return callNamed("error", _me, "ERROR : Objectpool reference mismatch!", symbol("FreeObject"));
  }

  callMethod("deleteAt", tUsePool, t_iIndex)
  var tClassPool = callMethod("getaProp", meProp(_me, "m_mp_ar_rFreepool"), t_sClass);
  callMethod("append", tClassPool, a_rObject)
  callMethod("deconstruct", a_rObject.m_rFactor)
  callMethod("deconstruct", a_rObject.m_rVisual)
  callMethod("SetParam", a_rObject, "StandardFactor", callMethod("GetFactor", a_rObject))
  callMethod("SetParam", a_rObject, "StandardVisual", callMethod("GetVisual", a_rObject))
  setThePropOf(a_rObject, "m_rFactor", meProp(_me, "m_rEmptyFactor"));
  setThePropOf(a_rObject, "m_rVisual", meProp(_me, "m_rEmptyVisual"));
  return 1;
}

