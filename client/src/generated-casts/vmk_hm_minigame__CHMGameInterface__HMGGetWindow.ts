// vmk_hm_minigame.cct / CHMGameInterface / HMGGetWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HMGGetWindow(_me: LingoMe, t_sWindow: LingoValue) {
  return callMethod("getaProp", meProp(_me, "m_ar_Windows"), t_sWindow);
}

