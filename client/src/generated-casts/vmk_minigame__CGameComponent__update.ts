// vmk_minigame.cct / CGameComponent / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  /* global */ var g_profMGEngine = globalVar("g_profMGEngine");
  /* global */ var g_profMGEProcess = globalVar("g_profMGEProcess");
  var tTime = theProperty("milliSeconds");
  setMeProp(_me, "m_MGEProcessAcc", 0);
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rRoomContext"))) ? 0 : 1)) {
  var dt = lingoBinary("div", lingoBinary("sub", tTime, meProp(_me, "m_iLastMS")), float(1000));
  setMeProp(_me, "m_iLastMS", tTime);
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rCurrentTurn"))) ? 0 : 1)) {
  if ((lingoTruthy(callMethod("GetTested", meProp(_me, "m_rCurrentTurn"))) ? 0 : 1)) {
  callMethod("_MinigameTestChecksum", _me, callMethod("GetChecksum", meProp(_me, "m_rCurrentTurn")))
  callMethod("SetTested", meProp(_me, "m_rCurrentTurn"), 1)
  }

  setMeProp(_me, "m_syncLostTime", float(0));
  if (lingoBinary("eq", callMethod("_TurnBufferState", _me), symbol("overfill"))) {
  setMeProp(_me, "m_iSpeedUp", lingoBinary("div", meProp(_me, "m_ar_turnBuffer").count, 1.5));
  if (meProp(_me, "m_bDump")) {
  callNamed("put", "MGEngine: speedup on")
  }

  }

  setMeProp(_me, "m_fTurnT", lingoBinary("add", meProp(_me, "m_fTurnT"), dt));
  var tSubturnSpacing = lingoBinary("div", meProp(_me, "m_fTurnPulse"), callMethod("GetNSubTurns", meProp(_me, "m_rCurrentTurn")));
  setMeProp(_me, "m_iSubTurnSpacing", lingoBinary("mul", tSubturnSpacing, lingoBinary("div", float(1), meProp(_me, "m_iSpeedUp"))));
  tSubturnSpacing = meProp(_me, "m_iSubTurnSpacing");
  var tSubturn = lingoBinary("add", callNamed("integer", callNamed("floor", lingoBinary("div", meProp(_me, "m_fTurnT"), tSubturnSpacing))), 1);
  if (lingoBinary("gt", tSubturn, callMethod("GetNSubTurns", meProp(_me, "m_rCurrentTurn")))) {
  tSubturn = callMethod("GetNSubTurns", meProp(_me, "m_rCurrentTurn"));
  }

  if (meProp(_me, "m_bDump")) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "SubTurnSpacing :", tSubturnSpacing), "ms, buffer size :"), meProp(_me, "m_ar_turnBuffer").count))
  }

  if (lingoBinary("neq", tSubturn, meProp(_me, "m_iLastSubturn"))) {
  if (lingoBinary("neq", lingoBinary("sub", tSubturn, 1), meProp(_me, "m_iLastSubturn"))) {
  var tMissedCount = lingoBinary("sub", lingoBinary("sub", tSubturn, 1), meProp(_me, "m_iLastSubturn"));
  for (var missedTurn = lingoBinary("sub", tSubturn, tMissedCount); missedTurn <= lingoBinary("sub", tSubturn, 1); ++missedTurn) {
  callMethod("ProcessSubturn", _me, missedTurn)
  }

  }

  if (meProp(_me, "m_bDump")) {
  callNamed("put", lingoBinary("join", "SubTurnN :", tSubturn))
  }

  callMethod("ProcessSubturn", _me, tSubturn)
  setMeProp(_me, "m_iLastSubturn", tSubturn);
  }

  } else {
  callMethod("SetSyncState", meProp(_me, "m_rHandler"), 0)
  setMeProp(_me, "m_syncLostTime", lingoBinary("add", meProp(_me, "m_syncLostTime"), dt));
  }

  var tFrameRateEnough = 1;
  if (lingoBinary("gt", dt, meProp(_me, "m_fTurnPulse"))) {
  if (meProp(_me, "m_bDump")) {
  callNamed("put", "MGEngine: frame rate too slow!!!")
  }

  tFrameRateEnough = 0;
  }

  if (lingoBinary("or", callMethod("turnDone", _me), (lingoTruthy(tFrameRateEnough) ? 0 : 1))) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rCurrentTurn"))) ? 0 : 1)) {
  if (lingoBinary("lt", tSubturn, callMethod("GetNSubTurns", meProp(_me, "m_rCurrentTurn")))) {
  var tTurnsToDo = lingoBinary("sub", callMethod("GetNSubTurns", meProp(_me, "m_rCurrentTurn")), tSubturn);
  for (var missedTurn = lingoBinary("add", lingoBinary("sub", callMethod("GetNSubTurns", meProp(_me, "m_rCurrentTurn")), tTurnsToDo), 1); missedTurn <= callMethod("GetNSubTurns", meProp(_me, "m_rCurrentTurn")); ++missedTurn) {
  callMethod("ProcessSubturn", _me, missedTurn)
  }

  }

  }

  if ((lingoTruthy(tFrameRateEnough) ? 0 : 1)) {
  for (var t = 1; t <= lingoBinary("sub", meProp(_me, "m_ar_turnBuffer").count, 1); ++t) {
  callMethod("_AdvanceTurn", _me)
  for (var tSubturn = 1; tSubturn <= callMethod("GetNSubTurns", meProp(_me, "m_rCurrentTurn")); ++tSubturn) {
  callMethod("ProcessSubturn", _me, tSubturn)
  }

  }

  }

  callMethod("_AdvanceTurn", _me)
  }

  }

  setGlobal("g_profMGEngine", lingoBinary("sub", theProperty("milliSeconds"), tTime));
  setGlobal("g_profMGEProcess", meProp(_me, "m_MGEProcessAcc"));
}

