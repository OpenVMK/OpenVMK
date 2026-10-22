// vmk_hm_minigame.cct / CHMFactorPlayerObject / setFoundExit

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setFoundExit(_me: LingoMe, a_bFoundExit: LingoValue) {
  setMeProp(_me, "m_bFoundExit", a_bFoundExit);
}

