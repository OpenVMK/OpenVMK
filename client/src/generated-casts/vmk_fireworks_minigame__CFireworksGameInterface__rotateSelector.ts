// vmk_fireworks_minigame.cct / CFireworksGameInterface / rotateSelector

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function rotateSelector(_me: LingoMe, t_iDir: LingoValue) {
  if (meProp(_me, "m_bControlsLocked")) {
  if (lingoBinary("gt", t_iDir, 0)) {
  callMethod("rotateAntiClockwise", meProp(_me, "m_ar_selectorLocations"))
  } else {
  callMethod("rotateClockwise", meProp(_me, "m_ar_selectorLocations"))
  }

  for (var i = 1; i <= meProp(_me, "m_ar_mp_selector").count; ++i) {
  var tSelection = meProp(_me, "m_ar_mp_selector")[i];
  // HAND-CORRECTED: the CVectorStruct's items live in its m_ar_vector list.
  setThePropOf(tSelection.sprite, "loc", callMethod("getAt", meProp(meProp(_me, "m_ar_selectorLocations"), "m_ar_vector"), i));
  }

  }

}

