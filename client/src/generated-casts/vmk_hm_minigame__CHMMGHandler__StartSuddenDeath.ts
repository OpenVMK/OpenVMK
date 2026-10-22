// vmk_hm_minigame.cct / CHMMGHandler / StartSuddenDeath

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StartSuddenDeath(_me: LingoMe) {
  if (meProp(_me, "m_bDebugOut")) {
  callNamed("put", "[HMDBG] Start Sudden Death")
  }

  callMethod("ShowWindow", meProp(_me, "m_rHauntedMansionInterface"), "Notice", "sudden death")
  callNamed("executeMessage", "PlayInterfaceSound", "doors-open")
}

