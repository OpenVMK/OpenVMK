// minigame_engine.cct / CGameComponent / _AddTurnToBuffer

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _AddTurnToBuffer(_me: LingoMe, i_rTurn: LingoValue) {
  /* global */ var g_profMGEngine = globalVar("g_profMGEngine");
  /* global */ var g_profMGEProcess = globalVar("g_profMGEProcess");
  if (callNamed("voidp", meProp(_me, "m_rCurrentTurn"))) {
  if (meProp(_me, "m_bDump")) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "MGEngine: Turn sync gained after", meProp(_me, "m_syncLostTime")), "seconds."))
  } else {
  if (meProp(_me, "m_bDump")) {
  callNamed("put", "MGEngine: Extra turn in buffer")
  }

  }

  }

  callMethod("append", meProp(_me, "m_ar_turnBuffer"), i_rTurn)
}

