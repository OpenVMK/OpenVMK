// minigame_engine_overrides.cct / CGameComponent / _AddTurnToBuffer

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _AddTurnToBuffer(_me: LingoMe, i_rTurn: LingoValue) {
  if (callNamed("voidp", _me.m_rCurrentTurn)) {
  if (_me.m_bDump) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "MGEngine: Turn sync gained after", _me.m_syncLostTime), "seconds."))
  } else {
  if (_me.m_bDump) {
  callNamed("put", "MGEngine: Extra turn in buffer")
  }

  }

  }

  callMethod("append", _me.m_ar_turnBuffer, i_rTurn)
}

