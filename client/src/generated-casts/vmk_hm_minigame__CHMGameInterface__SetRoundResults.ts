// vmk_hm_minigame.cct / CHMGameInterface / SetRoundResults

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetRoundResults(_me: LingoMe, i_ar_roundResults: LingoValue) {
  callMethod("append", meProp(_me, "m_ar_roundResults"), i_ar_roundResults)
}

