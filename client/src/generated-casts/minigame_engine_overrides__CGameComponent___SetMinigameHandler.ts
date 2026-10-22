// minigame_engine_overrides.cct / CGameComponent / _SetMinigameHandler

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _SetMinigameHandler(_me: LingoMe, i_sClass: LingoValue) {
  setThePropOf(_me, "m_sHandler", i_sClass);
  callNamed("createObject", "MGEHandler", "CMinigameHandlerPrototype", _me.m_sHandler)
  setThePropOf(_me, "m_rHandler", callNamed("getObject", "MGEHandler"));
  callMethod("SetSyncState", _me.m_rHandler, 1)
}

