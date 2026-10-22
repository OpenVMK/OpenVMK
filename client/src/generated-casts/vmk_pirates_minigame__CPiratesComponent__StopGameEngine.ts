// vmk_pirates_minigame.cct / CPiratesComponent / StopGameEngine

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StopGameEngine(_me: LingoMe, m_rContext: LingoValue) {
  /* global */ var g_profComponent = globalVar("g_profComponent");
  callMethod("StopMinigameEngine", callMethod("getComponent", callNamed("getThread", "minigame")))
  setMeProp(_me, "m_gameOn", 0);
}

