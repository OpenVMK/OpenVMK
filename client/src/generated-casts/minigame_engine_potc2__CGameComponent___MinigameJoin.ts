// minigame_engine_potc2.cct / CGameComponent / _MinigameJoin

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _MinigameJoin(_me: LingoMe) {
  /* global */ var g_profMGEngine = globalVar("g_profMGEngine");
  /* global */ var g_profMGEProcess = globalVar("g_profMGEProcess");
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rRoomContext"))) ? 0 : 1)) {
  callMethod("OnJoin", meProp(_me, "m_rHandler"))
  }

}

