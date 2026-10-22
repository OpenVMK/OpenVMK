// vmk_hm_minigame.cct / CHMWindowGameOver / HideGameOverWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HideGameOverWindow(_me: LingoMe) {
  setMeProp(_me, "m_iExitCounter", lingoBinary("add", meProp(_me, "m_iExitCounter"), 1));
  if (lingoBinary("gte", meProp(_me, "m_iExitCounter"), 2)) {
  callNamed("removeObject", callMethod("getID", _me))
  }

}

