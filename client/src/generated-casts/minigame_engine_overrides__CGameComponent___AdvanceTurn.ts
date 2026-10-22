// minigame_engine_overrides.cct / CGameComponent / _AdvanceTurn

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _AdvanceTurn(_me: LingoMe) {
  callMethod("_ClearCurrentTurn", _me)
  if (lingoBinary("neq", callMethod("_TurnBufferState", _me), symbol("ready"))) {
  if (lingoBinary("eq", callMethod("_TurnBufferState", _me), symbol("overfill"))) {
  setThePropOf(_me, "m_rCurrentTurn", _me.m_ar_turnBuffer[1]);
  callMethod("deleteAt", _me.m_ar_turnBuffer, 1)
  setThePropOf(_me, "m_fTurnT", float(0));
  } else {
  if (lingoBinary("eq", callMethod("_TurnBufferState", _me), symbol("empty"))) {
  setThePropOf(_me, "m_iSpeedUp", 1);
  setThePropOf(_me, "m_rCurrentTurn", undefined);
  if (_me.m_bDump) {
  callNamed("put", "MGEngine: No turns in buffer. Speedup off")
  }

  }

  }

  }

  setThePropOf(_me, "m_iLastSubturn", 0);
  setThePropOf(_me, "m_fTurnT", float(0));
}

