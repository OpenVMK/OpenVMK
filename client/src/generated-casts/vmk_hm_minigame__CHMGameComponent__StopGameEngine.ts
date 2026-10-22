// vmk_hm_minigame.cct / CHMGameComponent / StopGameEngine

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StopGameEngine(_me: LingoMe) {
  callMethod("StopMinigameEngine", meProp(_me, "m_rMGE"))
  setMeProp(_me, "m_bGameOn", 0);
}

