// vmk_hm_minigame.cct / CHMCoffinRattler / closeCoffin

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function closeCoffin(_me: LingoMe) {
  setMeProp(_me, "m_iOpenState", lingoBinary("sub", meProp(_me, "m_iOpenState"), 1));
  if (lingoBinary("eq", meProp(_me, "m_iOpenState"), 0)) {
  setMeProp(_me, "m_iState", symbol("normal"));
  }

  callMethod("animateCoffin", _me)
}

