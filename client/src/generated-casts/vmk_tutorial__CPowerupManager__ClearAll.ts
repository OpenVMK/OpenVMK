// vmk_tutorial.cct / CPowerupManager / ClearAll

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ClearAll(_me: LingoMe) {
  for (var tPowerup of meProp(_me, "m_ar_visiblePowerups").toArray()) {
  callMethod("RemovePowerup", _me, tPowerup)
  }

  setMeProp(_me, "m_ar_fueloccupied", new LingoList([]));
  setMeProp(_me, "m_ar_filmoccupied", new LingoList([]));
}

