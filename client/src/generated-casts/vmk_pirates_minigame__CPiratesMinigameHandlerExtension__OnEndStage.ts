// vmk_pirates_minigame.cct / CPiratesMinigameHandlerExtension / OnEndStage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function OnEndStage(_me: LingoMe, i_iTime: LingoValue, i_ar_params: LingoValue) {
  callMethod("StageEndCountDown", callMethod("getComponent", callNamed("getThread", "piratesminigame")), i_iTime, i_ar_params)
}

