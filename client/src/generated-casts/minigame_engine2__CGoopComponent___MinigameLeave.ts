// minigame_engine2.cct / CGoopComponent / _MinigameLeave

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _MinigameLeave(_me: LingoMe) {
  /* global */ var g_profMGEngine = globalVar("g_profMGEngine");
  /* global */ var g_profMGEProcess = globalVar("g_profMGEProcess");
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rRoomContext"))) ? 0 : 1)) {
  callMethod("OnLeave", meProp(_me, "m_rHandler"))
  }

}

