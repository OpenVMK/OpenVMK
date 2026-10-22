// vmk_pirates2_minigame.cct / CPiratesMinigameHandlerExtension / OnLoadStage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function OnLoadStage(_me: LingoMe, i_sName: LingoValue, i_iVersion: LingoValue, i_ar_params: LingoValue) {
  callMethod("StopMinigameEngine", callMethod("getComponent", callNamed("getThread", "minigame")))
  callMethod("LoadStage", callMethod("getComponent", callNamed("getThread", "piratesminigame")), i_sName, i_iVersion, i_ar_params)
}

