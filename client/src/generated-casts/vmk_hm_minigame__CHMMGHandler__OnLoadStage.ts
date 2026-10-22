// vmk_hm_minigame.cct / CHMMGHandler / OnLoadStage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function OnLoadStage(_me: LingoMe, i_sName: LingoValue, i_iVersion: LingoValue) {
  if (meProp(_me, "m_bDebugOut")) {
  callNamed("put", lingoBinary("joinPad", "Load Stage", new LingoList([i_sName, i_iVersion])))
  }

  callMethod("LoadStage", meProp(_me, "m_rHauntedMansionEngine"), i_sName, i_iVersion)
}

