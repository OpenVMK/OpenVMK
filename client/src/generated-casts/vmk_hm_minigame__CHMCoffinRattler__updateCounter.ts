// vmk_hm_minigame.cct / CHMCoffinRattler / updateCounter

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateCounter(_me: LingoMe) {
  setMeProp(_me, "m_iCounter", lingoBinary("add", meProp(_me, "m_iCounter"), 1));
  if (lingoBinary("gt", meProp(_me, "m_iCounter"), 10)) {
  setMeProp(_me, "m_iCounter", 0);
  if (lingoBinary("eq", meProp(_me, "m_iState"), symbol("rattle"))) {
  setMeProp(_me, "m_iOpenState", 0);
  setMeProp(_me, "m_iState", symbol("opening"));
  } else {
  setMeProp(_me, "m_iState", symbol("normal"));
  }

  }

}

