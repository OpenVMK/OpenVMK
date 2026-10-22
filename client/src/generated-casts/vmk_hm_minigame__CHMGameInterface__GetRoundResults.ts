// vmk_hm_minigame.cct / CHMGameInterface / GetRoundResults

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetRoundResults(_me: LingoMe) {
  if (lingoBinary("gt", meProp(_me, "m_ar_roundResults").count, 0)) {
  return meProp(_me, "m_ar_roundResults")[meProp(_me, "m_ar_roundResults").count];
  } else {
  return new LingoList([]);
  }

}

