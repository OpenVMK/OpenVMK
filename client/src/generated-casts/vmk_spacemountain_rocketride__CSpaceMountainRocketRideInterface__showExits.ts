// vmk_spacemountain_rocketride.cct / CSpaceMountainRocketRideInterface / showExits

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showExits(_me: LingoMe) {
  if (lingoBinary("eq", meProp(_me, "m_ar_rExits").count, 0)) {
  callMethod("findExits", _me)
  }

  for (var t_exit of meProp(_me, "m_ar_rExits").toArray()) {
  callMethod("SetParam", t_exit, "CLASS", "exit")
  }

  for (var t_exit of meProp(_me, "m_ar_rTileExits").toArray()) {
  callMethod("SetParam", t_exit, "CLASS", "exit")
  }

}

