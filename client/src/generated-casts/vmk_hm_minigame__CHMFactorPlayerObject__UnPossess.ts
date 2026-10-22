// vmk_hm_minigame.cct / CHMFactorPlayerObject / UnPossess

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UnPossess(_me: LingoMe) {
  var t_iBitMask = 1;
  if (lingoBinary("eq", callNamed("bitAnd", meProp(_me, "m_i_statebits"), t_iBitMask), t_iBitMask)) {
  setMeProp(_me, "m_i_statebits", callNamed("bitXor", meProp(_me, "m_i_statebits"), t_iBitMask));
  }

  callMethod("SyncGameParameters", _me)
  callMethod("UnPossess", callMethod("GetVisual", callMethod("getObject", _me)))
}

