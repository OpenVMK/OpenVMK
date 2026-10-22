// vmk_jungle_cruise.cct / CJungleCruiseHandlerExtension / OnLoadStage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function OnLoadStage(_me: LingoMe, i_sName: LingoValue) {
  if (meProp(_me, "m_bDebugOut")) {
  callNamed("put", lingoBinary("joinPad", meProp(_me, "m_sDebugPre"), "OnLoadStage()"))
  }

  callMethod("StopMinigameEngine", callMethod("getComponent", callNamed("getThread", "minigame")))
  callMethod("LoadStage", callMethod("getComponent", callNamed("getThread", "junglecruise")), i_sName)
}

