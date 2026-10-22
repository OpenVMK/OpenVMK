// vmk_hm_minigame.cct / CHMVisualPlayerObject / undelayed

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function undelayed(_me: LingoMe) {
  var t_iStatus = symbol("normal");
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rStatus"))) ? 0 : 1)) {
  callMethod("setStatus", meProp(_me, "m_rStatus"), t_iStatus)
  }

}

