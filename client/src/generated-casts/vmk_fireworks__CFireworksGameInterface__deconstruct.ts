// vmk_fireworks.cct / CFireworksGameInterface / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  if (meProp(_me, "m_prepared")) {
  callMethod("UnprepareRoom", _me)
  }

  setMeProp(_me, "m_ar_selectorLocations", undefined);
}

