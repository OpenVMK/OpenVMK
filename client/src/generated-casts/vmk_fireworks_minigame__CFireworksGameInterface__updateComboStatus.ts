// vmk_fireworks_minigame.cct / CFireworksGameInterface / updateComboStatus

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateComboStatus(_me: LingoMe) {
  var t_ar_CurrentStatus = callMethod("GetComboStatus", callMethod("getComponent", _me));
  for (var t_rSpr of meProp(_me, "m_rDisplayComboStatusSprites").toArray()) {
  setThePropOf(t_rSpr, "blend", 50);
  }

  for (var i = 1; i <= t_ar_CurrentStatus.count; ++i) {
  t_rSpr = meProp(_me, "m_rDisplayComboStatusSprites")[i];
  setThePropOf(t_rSpr, "blend", 100);
  }

}

