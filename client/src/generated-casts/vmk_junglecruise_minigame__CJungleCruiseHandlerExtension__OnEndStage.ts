// vmk_junglecruise_minigame.cct / CJungleCruiseHandlerExtension / OnEndStage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function OnEndStage(_me: LingoMe, i_iTime: LingoValue, i_ar_params: LingoValue) {
  if (meProp(_me, "m_bDebugOut")) {
  callNamed("put", lingoBinary("joinPad", meProp(_me, "m_sDebugPre"), "OnEndStage()"))
  }

  callMethod("StageEndCountDown", callMethod("getComponent", callNamed("getThread", "junglecruise")), i_iTime, i_ar_params)
}

