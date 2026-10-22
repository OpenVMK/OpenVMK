// vmk_hm_minigame.cct / CHMMGHandler / RemoveGhost

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemoveGhost(_me: LingoMe, i_iGhost: LingoValue) {
  if (meProp(_me, "m_bDebugOut")) {
  callNamed("put", lingoBinary("joinPad", "[HMDBG] Remove ghost", i_iGhost))
  }

  callMethod("_MinigameDeleteObject", meProp(_me, "m_rGameEngine"), i_iGhost)
}

