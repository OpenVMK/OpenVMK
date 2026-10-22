// vmk_npc_ghost_3.cct / CGhostComponent / stopAnimations

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function stopAnimations(_me: LingoMe, tAnimEngine: LingoValue) {
  callNamed("put", lingoBinary("joinPad", "stopAnimations", _me))
  for (var i = 1; i <= meProp(_me, "m_animIDs").count; ++i) {
  callMethod("StopAnim", tAnimEngine, meProp(_me, "m_animIDs")[i])
  }

}

