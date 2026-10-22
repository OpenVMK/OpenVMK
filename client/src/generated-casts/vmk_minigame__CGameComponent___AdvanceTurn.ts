// vmk_minigame.cct / CGameComponent / _AdvanceTurn

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _AdvanceTurn(_me: LingoMe) {
  /* global */ var g_profMGEngine = globalVar("g_profMGEngine");
  /* global */ var g_profMGEProcess = globalVar("g_profMGEProcess");
  callMethod("_ClearCurrentTurn", _me)
  switch (callMethod("_TurnBufferState", _me)) {
case symbol("ready"):
case symbol("overfill"):
  setMeProp(_me, "m_rCurrentTurn", meProp(_me, "m_ar_turnBuffer")[1]);
  callMethod("deleteAt", meProp(_me, "m_ar_turnBuffer"), 1)
  setMeProp(_me, "m_fTurnT", float(0));
  break;
case symbol("empty"):
  setMeProp(_me, "m_iSpeedUp", 1);
  setMeProp(_me, "m_rCurrentTurn", undefined);
  if (meProp(_me, "m_bDump")) {
  callNamed("put", "MGEngine: No turns in buffer. Speedup off")
  }

  break;
  break;
  }

  setMeProp(_me, "m_iLastSubturn", 0);
  setMeProp(_me, "m_fTurnT", float(0));
}

