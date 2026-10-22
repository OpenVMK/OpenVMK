// vmk_tutorial.cct / CHazardManager / ClearAll

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ClearAll(_me: LingoMe) {
  for (var tHazard of meProp(_me, "m_ar_visibleHazards").toArray()) {
  callMethod("RemoveHazard", _me, tHazard)
  }

  var m_ar_fueloccupied = new LingoList([]);
  var m_ar_filmoccupied = new LingoList([]);
}

