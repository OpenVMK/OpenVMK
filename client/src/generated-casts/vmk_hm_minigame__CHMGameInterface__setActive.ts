// vmk_hm_minigame.cct / CHMGameInterface / setActive

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setActive(_me: LingoMe, i_bActive: LingoValue) {
  setMeProp(_me, "m_bActive", i_bActive);
}

