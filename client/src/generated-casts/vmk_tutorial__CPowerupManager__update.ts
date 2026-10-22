// vmk_tutorial.cct / CPowerupManager / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  var tTime = theProperty("milliSeconds");
  var dt = lingoBinary("div", lingoBinary("sub", tTime, meProp(_me, "m_lastTime")), float(1000));
  setMeProp(_me, "m_lastTime", tTime);
  var t_ar_nuVisibleList = new LingoList([]);
  for (var tPowerup of meProp(_me, "m_ar_visiblePowerups").toArray()) {
  if ((lingoTruthy(callMethod("GetParam", tPowerup, "Picked")) ? 0 : 1)) {
  callMethod("append", t_ar_nuVisibleList, tPowerup)
  continue;
  }

  callMethod("RemovePowerup", _me, tPowerup)
  }

  setMeProp(_me, "m_ar_visiblePowerups", t_ar_nuVisibleList);
}

