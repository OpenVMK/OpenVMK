// vmk_junglecruise_minigame.cct / CPowerupManager / GetVisiblePowerupList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetVisiblePowerupList(_me: LingoMe) {
  return meProp(_me, "m_ar_visiblePowerups");
}

