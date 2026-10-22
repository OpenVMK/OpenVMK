// vmk_hm_minigame.cct / CHMCoffinRattler / setState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setState(_me: LingoMe, a_iState: LingoValue, i_action: LingoValue) {
  setMeProp(_me, "m_iCounter", 0);
  switch (a_iState) {
case symbol("tremble"):
  setMeProp(_me, "m_iState", a_iState);
  break;
case symbol("rattle"):
  setMeProp(_me, "m_iState", a_iState);
  break;
  default:
  callNamed("put", "Unknown coffin state")
  }

}

