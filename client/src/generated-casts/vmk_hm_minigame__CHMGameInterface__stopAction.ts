// vmk_hm_minigame.cct / CHMGameInterface / stopAction

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function stopAction(_me: LingoMe) {
  if (meProp(_me, "m_bActionActive")) {
  callNamed("executeMessage", symbol("SendMinigameAction"), 8, new LingoList([]))
  }

  setMeProp(_me, "m_bActionActive", 0);
}

