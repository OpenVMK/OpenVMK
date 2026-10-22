// vmk_hm_minigame.cct / CHMFactorCoffin / tremble

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function tremble(_me: LingoMe) {
  if (callNamed("voidp", meProp(_me, "m_rRattler"))) {
  callMethod("setup", _me)
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rRattler"))) ? 0 : 1)) {
  callMethod("setState", meProp(_me, "m_rRattler"), symbol("tremble"))
  }

}

