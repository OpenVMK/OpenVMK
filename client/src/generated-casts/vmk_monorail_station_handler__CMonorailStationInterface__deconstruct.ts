// vmk_monorail_station_handler.cct / CMonorailStationInterface / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("unregisterMessage", symbol("room_ready"), callMethod("getID", _me), symbol("LoadAnim"))
  callNamed("unregisterMessage", symbol("room_leave"), callMethod("getID", _me), symbol("UnloadAnim"))
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_monorailAnimator"))) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_monorailAnimator")))
  }

  if (lingoBinary("neq", meProp(_me, "m_pTextScroller"), 0)) {
  callMethod("stop", meProp(_me, "m_pTextScroller"))
  }

  for (var i = 1; i <= 8; ++i) {
  callMethod("stop", callNamed("sound", i))
  }

  return 1;
}

