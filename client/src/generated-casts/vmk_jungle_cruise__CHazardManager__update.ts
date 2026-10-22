// vmk_jungle_cruise.cct / CHazardManager / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  var t_ar_nuVisibleList = new LingoList([]);
  for (var tHazard of meProp(_me, "m_ar_visibleHazards").toArray()) {
  if ((lingoTruthy(callMethod("GetParam", tHazard, "IsHit")) ? 0 : 1)) {
  callMethod("append", t_ar_nuVisibleList, tHazard)
  continue;
  }

  callMethod("RemoveHazard", _me, tHazard)
  }

  setMeProp(_me, "m_ar_visibleHazards", t_ar_nuVisibleList);
}

