// 42c66f7b170484e24189f467fe87b08d.cct / CSoundTracker / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("unregisterMessage", "LoadRoomSound")
  callNamed("unregisterMessage", "StopRoomSound")
  callNamed("unregisterMessage", "ResetRoomSound")
  callNamed("unregisterMessage", symbol("room_ready"))
  callNamed("unregisterMessage", "room_leave")
  if (callNamed("timeoutExists", meProp(_me, "m_TmrTracker"))) {
  callNamed("removeTimeout", meProp(_me, "m_TmrTracker"))
  }

  callMethod("resetSettings", _me)
  return 1;
}

