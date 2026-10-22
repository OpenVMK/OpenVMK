// minigame_engine_overrides.cct /  / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  var tTurnsToDo = theProperty("milliSeconds");
  setThePropOf(_me, "m_MGEProcessAcc", 0);
  if ((lingoTruthy(callNamed("voidp", _me.m_rRoomContext)) ? 0 : 1)) {
  var dt = lingoBinary("div", lingoBinary("sub", tTurnsToDo, _me.m_iLastMS), float(1000));
  setThePropOf(_me, "m_iLastMS", tTurnsToDo);
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
  var t = lingoBinary("div", _me.m_fTurnPulse, callMethod("GetNSubTurns", _me.m_rCurrentTurn));
  setThePropOf(_me, "m_iSubTurnSpacing", lingoBinary("mul", t, lingoBinary("div", float(1), _me.m_iSpeedUp)));
  t = _me.m_iSubTurnSpacing;
  var tSubturnSpacing = lingoBinary("add", callNamed("integer", callNamed("floor", lingoBinary("div", _me.m_fTurnT, t))), 1);
  if (lingoBinary("gt", tSubturnSpacing, callMethod("GetNSubTurns", _me.m_rCurrentTurn))) {
  tSubturnSpacing = callMethod("GetNSubTurns", _me.m_rCurrentTurn);
  }

  if (_me.m_bDump) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "SubTurnSpacing :", t), "ms, buffer size :"), _me.m_ar_turnBuffer.count))
  }

  if (lingoBinary("neq", tSubturnSpacing, _me.m_iLastSubturn)) {
  if (lingoBinary("neq", lingoBinary("sub", tSubturnSpacing, 1), _me.m_iLastSubturn)) {
  var g_profMGEProcess = lingoBinary("sub", lingoBinary("sub", tSubturnSpacing, 1), _me.m_iLastSubturn);
  for (var tMissedCount = lingoBinary("sub", tSubturnSpacing, g_profMGEProcess); tMissedCount <= lingoBinary("sub", tSubturnSpacing, 1); ++tMissedCount) {
  callMethod("ProcessSubturn", _me, tMissedCount)
  }

  }

  if (_me.m_bDump) {
  callNamed("put", lingoBinary("join", "SubTurnN :", tSubturnSpacing))
  }

  callMethod("ProcessSubturn", _me, tSubturnSpacing)
  setThePropOf(_me, "m_iLastSubturn", tSubturnSpacing);
  }

  } else {
  callMethod("SetSyncState", _me.m_rHandler, 1)
  setThePropOf(_me, "m_syncLostTime", lingoBinary("add", _me.m_syncLostTime, dt));
  }

  var missedTurn = 1;
  if (lingoBinary("gt", dt, _me.m_fTurnPulse)) {
  if (_me.m_bDump) {
  callNamed("put", "MGEngine: frame rate too slow!!!")
  }

  missedTurn = 0;
  }

  if (lingoBinary("or", callMethod("turnDone", _me), (lingoTruthy(missedTurn) ? 0 : 1))) {
  if ((lingoTruthy(callNamed("voidp", _me.m_rCurrentTurn)) ? 0 : 1)) {
  if (lingoBinary("lt", tSubturnSpacing, callMethod("GetNSubTurns", _me.m_rCurrentTurn))) {
  var tFrameRateEnough = lingoBinary("sub", callMethod("GetNSubTurns", _me.m_rCurrentTurn), tSubturnSpacing);
  for (var tMissedCount = lingoBinary("add", lingoBinary("sub", callMethod("GetNSubTurns", _me.m_rCurrentTurn), tFrameRateEnough), 1); tMissedCount <= callMethod("GetNSubTurns", _me.m_rCurrentTurn); ++tMissedCount) {
  callMethod("ProcessSubturn", _me, tMissedCount)
  }

  }

  }

  if ((lingoTruthy(missedTurn) ? 0 : 1)) {
  for (var g_profMGEngine = 1; g_profMGEngine <= lingoBinary("sub", _me.m_ar_turnBuffer.count, 1); ++g_profMGEngine) {
  callMethod("_AdvanceTurn", _me)
  for (var tSubturnSpacing = 1; tSubturnSpacing <= callMethod("GetNSubTurns", _me.m_rCurrentTurn); ++tSubturnSpacing) {
  callMethod("ProcessSubturn", _me, tSubturnSpacing)
  }

  }

  }

  callMethod("_AdvanceTurn", _me)
  }

  }

  var tTime = lingoBinary("sub", theProperty("milliSeconds"), tTurnsToDo);
  var tSubturn = _me.m_MGEProcessAcc;
}

