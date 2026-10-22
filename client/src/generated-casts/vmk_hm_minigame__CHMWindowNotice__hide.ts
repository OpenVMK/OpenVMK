// vmk_hm_minigame.cct / CHMWindowNotice / hide

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function hide(_me: LingoMe) {
  if (lingoBinary("neq", callNamed("getWindow", meProp(_me, "m_sWindowName")), 0)) {
  callNamed("removeWindow", meProp(_me, "m_sWindowName"))
  }

  setMeProp(_me, "m_bActive", 0);
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rNotification"))) ? 0 : 1)) {
  setThePropOf(meProp(_me, "m_rNotification"), "visible", 0);
  }

}

