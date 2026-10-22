// minigame_engine.cct / CGameComponent / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  /* global */ var g_profMGEngine = globalVar("g_profMGEngine");
  /* global */ var g_profMGEProcess = globalVar("g_profMGEProcess");
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rObjectPool"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rObjectPool")))
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rHandler"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rHandler")))
  }

  for (var pObject of meProp(_me, "m_mp_objects").toArray()) {
  callMethod("_RemoveIndexed", meProp(_me, "m_rRoomContext"), callMethod("GetParam", pObject, "Reference"))
  }

  setMeProp(_me, "m_mp_objects", new LingoPropList([]));
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rVelocityTable")))
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rQuickRandom")))
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rComponentToAngle")))
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rCollision")))
  callNamed("unregisterMessage", symbol("RegisterMinigameHandler"), callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("RegisterMinigameObject"), callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("SendMinigameAction"), callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("SetMinigameOwnerRef"), callMethod("getID", _me))
  callNamed("removeUpdate", callMethod("getID", _me))
  return 1;
}

