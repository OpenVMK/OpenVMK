// vmk_pirates2_minigame.cct / CPiratesComponent / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  /* global */ var g_profComponent = globalVar("g_profComponent");
  setMeProp(_me, "m_prepared", 0);
  setMeProp(_me, "m_rSoundPlayer", undefined);
  callNamed("executeMessage", symbol("SetMinigameHandler"), "CPiratesMinigameHandlerExtension")
  return 1;
}

