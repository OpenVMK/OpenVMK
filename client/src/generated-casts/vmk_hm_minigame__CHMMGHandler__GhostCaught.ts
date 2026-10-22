// vmk_hm_minigame.cct / CHMMGHandler / GhostCaught

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GhostCaught(_me: LingoMe, i_iGhost: LingoValue, i_iPlayer: LingoValue) {
  if (meProp(_me, "m_bDebugOut")) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "[HMDBG] Ghost", i_iGhost), "is caught by player"), i_iPlayer))
  }

  callMethod("CreatePuff", meProp(_me, "m_rHauntedMansionEngine"), i_iGhost, i_iPlayer)
  callMethod("_MinigameDeleteObject", meProp(_me, "m_rGameEngine"), i_iGhost)
  callMethod("AwardScore", callMethod("GetFactor", callMethod("GetMGObject", meProp(_me, "m_rGameEngine"), i_iPlayer)), 1)
  callNamed("executeMessage", "PlayInterfaceSound", "ghost-is-catched")
}

