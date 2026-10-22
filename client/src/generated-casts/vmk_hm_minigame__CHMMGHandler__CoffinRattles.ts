// vmk_hm_minigame.cct / CHMMGHandler / CoffinRattles

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CoffinRattles(_me: LingoMe, i_iRef: LingoValue, i_iCoffinAction: LingoValue) {
  if (meProp(_me, "m_bDebugOut")) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "[HMDBG] Coffin", i_iRef), "rattles"))
  }

  callMethod("rattle", meProp(_me, "m_rHauntedMansionEngine").m_rStage, i_iRef, i_iCoffinAction)
  callNamed("executeMessage", "PlayInterfaceSound", "coffin-rattles")
}

