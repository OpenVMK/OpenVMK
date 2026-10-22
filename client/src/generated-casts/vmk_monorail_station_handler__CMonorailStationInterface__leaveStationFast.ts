// vmk_monorail_station_handler.cct / CMonorailStationInterface / leaveStationFast

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function leaveStationFast(_me: LingoMe) {
  callMethod("hideDoors", _me)
  if (callNamed("voidp", meProp(_me, "m_monorailAnimator"))) {
  callMethod("createMonorailAnimator", _me)
  }

  callMethod("leaveStationFast", meProp(_me, "m_monorailAnimator"))
}

