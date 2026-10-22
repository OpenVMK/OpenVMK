// vmk_fireworks.cct / CFireworksGameInterface / showSelectorWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showSelectorWindow(_me: LingoMe) {
  callMethod("show", meProp(_me, "m_fireWorkSelector"))
  if (lingoBinary("neq", meProp(_me, "m_sCurrentSelection"), "")) {
  callMethod("PlaceSelector", _me)
  }

}

