// minigame_engine_potc2.cct / CGameComponent / _SetMinigameHandler

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _SetMinigameHandler(_me: LingoMe, i_sClass: LingoValue) {
  /* global */ var g_profMGEngine = globalVar("g_profMGEngine");
  /* global */ var g_profMGEProcess = globalVar("g_profMGEProcess");
  setMeProp(_me, "m_sHandler", i_sClass);
  callNamed("createObject", "MGEHandler", "CMinigameHandlerPrototype", meProp(_me, "m_sHandler"))
  setMeProp(_me, "m_rHandler", callNamed("getObject", "MGEHandler"));
  callMethod("SetSyncState", meProp(_me, "m_rHandler"), 0)
}

