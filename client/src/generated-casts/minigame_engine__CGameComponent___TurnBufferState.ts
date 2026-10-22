// minigame_engine.cct / CGameComponent / _TurnBufferState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _TurnBufferState(_me: LingoMe) {
  /* global */ var g_profMGEngine = globalVar("g_profMGEngine");
  /* global */ var g_profMGEProcess = globalVar("g_profMGEProcess");
  if (lingoBinary("gt", meProp(_me, "m_ar_turnBuffer").count, 1)) {
  return symbol("overfill");
  }

  if (lingoBinary("eq", meProp(_me, "m_ar_turnBuffer").count, 1)) {
  return symbol("ready");
  }

  if (lingoBinary("eq", meProp(_me, "m_ar_turnBuffer").count, 0)) {
  return symbol("empty");
  }

}

