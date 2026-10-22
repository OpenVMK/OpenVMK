// vmk_pirates_game.cct / CPiratesComponent / SetGameMode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetGameMode(_me: LingoMe, a_iGameMode: LingoValue) {
  /* global */ var g_profComponent = globalVar("g_profComponent");
  callNamed("put", lingoBinary("joinPad", "Set GAme Mode", a_iGameMode))
  if ((lingoTruthy(callNamed("voidp", a_iGameMode)) ? 0 : 1)) {
  setMeProp(_me, "m_iGameMode", a_iGameMode);
  }

}

