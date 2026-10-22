// vmk_hm_minigame.cct / CHMMGHandler / PlayerCatchesGhostlyPlayer

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlayerCatchesGhostlyPlayer(_me: LingoMe, i_iCatcher: LingoValue, i_iCatchee: LingoValue, i_iScore: LingoValue) {
  if (meProp(_me, "m_bDebugOut")) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "[HMDBG] Player", i_iCatcher), "catches ghostly player"), i_iCatchee), "receives"), i_iScore), "points."))
  }

  callMethod("AwardScore", callMethod("GetFactor", callMethod("GetMGObject", meProp(_me, "m_rGameEngine"), i_iCatcher)), i_iScore)
  callMethod("UnPossess", callMethod("GetFactor", callMethod("GetMGObject", meProp(_me, "m_rGameEngine"), i_iCatchee)))
  callNamed("executeMessage", "PlayInterfaceSound", "player-catch-ghostly-player")
}

