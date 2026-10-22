// vmk_hm_minigame.cct / CHMWindowNotice / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if (meProp(_me, "m_bActive")) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rNotification"))) ? 0 : 1)) {
  if (meProp(_me, "m_rNotification").visible) {
  setThePropOf(meProp(_me, "m_rNotification"), "blend", lingoBinary("sub", meProp(_me, "m_rNotification").blend, 2));
  if (lingoBinary("lte", meProp(_me, "m_rNotification").blend, 0)) {
  setThePropOf(meProp(_me, "m_rNotification"), "blend", 0);
  setThePropOf(meProp(_me, "m_rNotification"), "visible", 0);
  }

  }

  }

  }

}

