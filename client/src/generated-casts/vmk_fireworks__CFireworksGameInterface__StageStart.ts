// vmk_fireworks.cct / CFireworksGameInterface / StageStart

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StageStart(_me: LingoMe) {
  for (var t_sElement of meProp(_me, "m_ar_hideElements").toArray()) {
  }

  callMethod("displayBonus", _me)
}

