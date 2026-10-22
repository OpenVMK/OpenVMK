// vmk_monorail_station_handler.cct / CMonorailStationInterface / UnloadAnim

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UnloadAnim(_me: LingoMe) {
  if (callNamed("threadExists", symbol("animation"))) {
  var tAnimEngine = callMethod("getComponent", callNamed("getThread", symbol("animation")));
  tAnimEngine = callMethod("getComponent", callNamed("getThread", symbol("animation")));
  callMethod("RemoveAnim", tAnimEngine, meProp(_me, "m_animIDs")[1])
  }

}

