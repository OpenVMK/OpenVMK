// vmk_pirates_minigame.cct / CPiratesMinigameHandlerExtension / OnStartStage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function OnStartStage(_me: LingoMe) {
  callMethod("StageStartCountDown", callMethod("getComponent", callNamed("getThread", "piratesminigame")))
}

