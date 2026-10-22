// vmk_monorail_station_handler.cct / CMonorailStationInterface / displayText

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function displayText(_me: LingoMe, t_sText: LingoValue) {
  if (lingoBinary("neq", meProp(_me, "m_pTextScroller"), 0)) {
  callMethod("resetQueue", meProp(_me, "m_pTextScroller"))
  callMethod("setText", meProp(_me, "m_pTextScroller"), t_sText)
  }

}

