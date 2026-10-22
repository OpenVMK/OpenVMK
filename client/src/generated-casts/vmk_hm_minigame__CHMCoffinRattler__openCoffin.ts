// vmk_hm_minigame.cct / CHMCoffinRattler / openCoffin

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function openCoffin(_me: LingoMe) {
  var t_iStates = 3;
  var t_iSpeed = 2;
  var t_iMax = lingoBinary("mul", t_iStates, t_iSpeed);
  setMeProp(_me, "m_iOpenState", lingoBinary("add", meProp(_me, "m_iOpenState"), 1));
  if (lingoBinary("eq", meProp(_me, "m_iOpenState"), t_iMax)) {
  setMeProp(_me, "m_iState", symbol("closing"));
  }

  callMethod("animateCoffin", _me)
}

