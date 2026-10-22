// vmk_hm_minigame.cct / CHMMGHandler / OnStartStage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function OnStartStage(_me: LingoMe) {
  if (meProp(_me, "m_bDebugOut")) {
  callNamed("put", "Stage Start")
  }

  callNamed("executeMessage", "PlayInterfaceSound", "1-2-3-GO")
  callMethod("ShowWindow", meProp(_me, "m_rHauntedMansionInterface"), "GetReady")
}

