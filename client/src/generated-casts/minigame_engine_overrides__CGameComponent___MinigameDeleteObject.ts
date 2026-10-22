// minigame_engine_overrides.cct / CGameComponent / _MinigameDeleteObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _MinigameDeleteObject(_me: LingoMe, i_iRef: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", _me.m_rRoomContext)) ? 0 : 1)) {
  var tObject = callMethod("getaProp", _me.m_mp_objects, i_iRef);
  if ((lingoTruthy(callNamed("voidp", tObject)) ? 0 : 1)) {
  callMethod("deleteOne", _me.m_ar_ar_objByType[callMethod("GetParam", tObject, "ObjectCode")], tObject)
  callMethod("deleteOne", _me.m_ar_rMyObjects, tObject)
  if (lingoBinary("eq", _me.m_iAllocationModel, symbol("simple"))) {
  if ((lingoTruthy(callNamed("voidp", tObject)) ? 0 : 1)) {
  callMethod("_RemoveIndexed", _me.m_rRoomContext, callMethod("GetParam", tObject, "Reference"), callMethod("getaProp", _me.m_mp_sObject, callMethod("GetParam", tObject, "ObjectCode")))
  callMethod("deleteOne", _me.m_ar_rMyObjects, tObject)
  } else {
  callNamed("error", _me, "Object to be removed from room context was not in the list")
  }

  } else {
  if (lingoBinary("eq", _me.m_iAllocationModel, symbol("pooled"))) {
  callMethod("FreeObject", _me.m_rObjectPool, tObject)
  }

  }

  callMethod("deleteProp", _me.m_mp_objects, i_iRef)
  } else {
  callNamed("error", _me, "Object to be removed from room context was not in the list")
  }

  }

}

