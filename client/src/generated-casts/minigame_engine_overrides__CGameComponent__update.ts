// minigame_engine_overrides.cct / CGameComponent / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  var tTime = theProperty("milliSeconds");
  setThePropOf(_me, "m_MGEProcessAcc", 0);
  if ((lingoTruthy(callNamed("voidp", _me.m_rRoomContext)) ? 0 : 1)) {
  var dt = lingoBinary("div", lingoBinary("sub", tTime, _me.m_iLastMS), float(1000));
  setThePropOf(_me, "m_iLastMS", tTime);
  if ((lingoTruthy(callNamed("voidp", _me.m_rCurrentTurn)) ? 0 : 1)) {
  if ((lingoTruthy(callMethod("GetTested", _me.m_rCurrentTurn)) ? 0 : 1)) {
  callMethod("_MinigameTestChecksum", _me, callMethod("GetChecksum", _me.m_rCurrentTurn))
  callMethod("SetTested", _me.m_rCurrentTurn, 1)
  }

  setThePropOf(_me, "m_syncLostTime", float(0));
  if (lingoBinary("eq", callMethod("_TurnBufferState", _me), symbol("overfill"))) {
  setThePropOf(_me, "m_iSpeedUp", lingoBinary("div", _me.m_ar_turnBuffer.count, 1.5));
  if (_me.m_bDump) {
  callNamed("put", "MGEngine: speedup on")
  }

  }

  setThePropOf(_me, "m_fTurnT", lingoBinary("add", _me.m_fTurnT, dt));
  var tSubturnSpacing = lingoBinary("div", _me.m_fTurnPulse, callMethod("GetNSubTurns", _me.m_rCurrentTurn));
  setThePropOf(_me, "m_iSubTurnSpacing", lingoBinary("mul", tSubturnSpacing, lingoBinary("div", float(1), _me.m_iSpeedUp)));
  tSubturnSpacing = _me.m_iSubTurnSpacing;
  var tSubturn = lingoBinary("add", callNamed("integer", callNamed("floor", lingoBinary("div", _me.m_fTurnT, tSubturnSpacing))), 1);
  if (lingoBinary("gt", tSubturn, callMethod("GetNSubTurns", _me.m_rCurrentTurn))) {
  tSubturn = callMethod("GetNSubTurns", _me.m_rCurrentTurn);
  }

  if (_me.m_bDump) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "SubTurnSpacing :", tSubturnSpacing), "ms, buffer size :"), _me.m_ar_turnBuffer.count))
  }

  if (lingoBinary("neq", tSubturn, _me.m_iLastSubturn)) {
  if (lingoBinary("neq", lingoBinary("sub", tSubturn, 1), _me.m_iLastSubturn)) {
  var tMissedCount = lingoBinary("sub", lingoBinary("sub", tSubturn, 1), _me.m_iLastSubturn);
  for (var missedTurn = lingoBinary("sub", tSubturn, tMissedCount); missedTurn <= lingoBinary("sub", tSubturn, 1); ++missedTurn) {
  callMethod("ProcessSubturn", _me, missedTurn)
  }

  }

  if (_me.m_bDump) {
  callNamed("put", lingoBinary("join", "SubTurnN :", tSubturn))
  }

  callMethod("ProcessSubturn", _me, tSubturn)
  setThePropOf(_me, "m_iLastSubturn", tSubturn);
  }

  } else {
  callMethod("SetSyncState", _me.m_rHandler, 1)
  setThePropOf(_me, "m_syncLostTime", lingoBinary("add", _me.m_syncLostTime, dt));
  }

  var tFrameRateEnough = 1;
  if (lingoBinary("gt", dt, _me.m_fTurnPulse)) {
  if (_me.m_bDump) {
  callNamed("put", "MGEngine: frame rate too slow!!!")
  }

  tFrameRateEnough = 0;
  }

  if (lingoBinary("or", callMethod("turnDone", _me), (lingoTruthy(tFrameRateEnough) ? 0 : 1))) {
  if ((lingoTruthy(callNamed("voidp", _me.m_rCurrentTurn)) ? 0 : 1)) {
  if (lingoBinary("lt", tSubturn, callMethod("GetNSubTurns", _me.m_rCurrentTurn))) {
  var tTurnsToDo = lingoBinary("sub", callMethod("GetNSubTurns", _me.m_rCurrentTurn), tSubturn);
  for (var missedTurn = lingoBinary("add", lingoBinary("sub", callMethod("GetNSubTurns", _me.m_rCurrentTurn), tTurnsToDo), 1); missedTurn <= callMethod("GetNSubTurns", _me.m_rCurrentTurn); ++missedTurn) {
  callMethod("ProcessSubturn", _me, missedTurn)
  }

  }

  }

  if ((lingoTruthy(tFrameRateEnough) ? 0 : 1)) {
  for (var t = 1; t <= lingoBinary("sub", _me.m_ar_turnBuffer.count, 1); ++t) {
  callMethod("_AdvanceTurn", _me)
  for (var tSubturn = 1; tSubturn <= callMethod("GetNSubTurns", _me.m_rCurrentTurn); ++tSubturn) {
  callMethod("ProcessSubturn", _me, tSubturn)
  }

  }

  }

  callMethod("_AdvanceTurn", _me)
  }

  }

  var g_profMGEngine = lingoBinary("sub", theProperty("milliSeconds"), tTime);
  var g_profMGEProcess = _me.m_MGEProcessAcc;
}

