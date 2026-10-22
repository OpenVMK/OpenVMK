// minigame_engine_potc2.cct / CGameComponent / _ClearTurnBuffer

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ClearTurnBuffer(_me: LingoMe) {
  /* global */ var g_profMGEngine = globalVar("g_profMGEngine");
  /* global */ var g_profMGEProcess = globalVar("g_profMGEProcess");
  for (var tTurn of meProp(_me, "m_ar_turnBuffer").toArray()) {
  if ((lingoTruthy(callNamed("voidp", tTurn)) ? 0 : 1)) {
  callNamed("removeObject", callMethod("getID", tTurn))
  }

  }

  setMeProp(_me, "m_ar_turnBuffer", new LingoList([]));
}

