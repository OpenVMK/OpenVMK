// vmk_monorail_station_handler.cct / CMonorailStationInterface / stopAnimations

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function stopAnimations(_me: LingoMe, tAnimEngine: LingoValue) {
  if (callNamed("threadExists", symbol("animation"))) {
  tAnimEngine = callMethod("getComponent", callNamed("getThread", symbol("animation")));
  callMethod("StopAnim", tAnimEngine, meProp(_me, "m_animIDs")[1])
  callMethod("StopAnim", tAnimEngine, meProp(_me, "m_animIDs")[2])
  }

}

