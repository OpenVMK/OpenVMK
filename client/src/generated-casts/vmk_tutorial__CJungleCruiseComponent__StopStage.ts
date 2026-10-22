// vmk_tutorial.cct / CJungleCruiseComponent / StopStage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StopStage(_me: LingoMe, m_rContext: LingoValue) {
  callMethod("StopMinigameEngine", callMethod("getComponent", callNamed("getThread", "minigame")))
  setMeProp(_me, "m_gameOn", 0);
}

