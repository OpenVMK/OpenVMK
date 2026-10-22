// vmk_hm_minigame.cct / CHMMGHandler / SwingDoor

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SwingDoor(_me: LingoMe, i_iDoorRef: LingoValue) {
  if (meProp(_me, "m_bDebugOut")) {
  callNamed("put", lingoBinary("joinPad", "[HMDBG] Swing Door", i_iDoorRef))
  }

  callNamed("executeMessage", "PlayInterfaceSound", "doors-open")
  callMethod("SwingDoor", meProp(_me, "m_rHauntedMansionEngine"), i_iDoorRef)
}

