// minigame_engine_potc2.cct / CMinigameHandlerPrototype / SetSyncState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetSyncState(_me: LingoMe, i_bVal: LingoValue) {
  setMeProp(_me, "m_bSyncState", i_bVal);
}

