// vmk_fireworks_minigame.cct / CFireworksMinigameHandler / OnEndStage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function OnEndStage(_me: LingoMe, i_iTime: LingoValue, i_ar_params: LingoValue) {
  callMethod("StageEnd", callMethod("getComponent", callNamed("getThread", "fireworks")), i_iTime, i_ar_params)
}

