// vmk_hm_minigame.cct / CHMMGHandler / CoffinTrembles

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CoffinTrembles(_me: LingoMe, i_iCoffin: LingoValue) {
  if (meProp(_me, "m_bDebugOut")) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "[HMDBG] Coffin", i_iCoffin), "trembles"))
  }

  callMethod("tremble", meProp(_me, "m_rHauntedMansionEngine").m_rStage, i_iCoffin)
  callNamed("executeMessage", "PlayInterfaceSound", "HMG-coffin-tremble")
}

