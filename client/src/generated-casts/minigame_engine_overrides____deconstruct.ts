// minigame_engine_overrides.cct /  / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  if ((lingoTruthy(callNamed("voidp", _me.m_rObjectPool)) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", _me.m_rObjectPool))
  }

  if ((lingoTruthy(callNamed("voidp", _me.m_rHandler)) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", _me.m_rHandler))
  }

  for (var pObject of _me.m_mp_objects.toArray()) {
  callMethod("_RemoveIndexed", _me.m_rRoomContext, callMethod("GetParam", pObject, "Reference"))
  }

  setThePropOf(_me, "m_mp_objects", callNamed("propList"));
  callNamed("removeObject", callMethod("getID", _me.m_rVelocityTable))
  callNamed("removeObject", callMethod("getID", _me.m_rQuickRandom))
  callNamed("removeObject", callMethod("getID", _me.m_rComponentToAngle))
  callNamed("removeObject", callMethod("getID", _me.m_rCollision))
  callNamed("unregisterMessage", symbol("RegisterMinigameHandler"), callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("RegisterMinigameObject"), callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("SendMinigameAction"), callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("SetMinigameOwnerRef"), callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("StartMinigameEngine"), callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("StopMinigameEngine"), callMethod("getID", _me))
  callNamed("removeUpdate", callMethod("getID", _me))
  return 1;
}

