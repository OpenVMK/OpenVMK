// minigame_engine2.cct / CGoopComponent / ProcessSubturn

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ProcessSubturn(_me: LingoMe, i_iSubturn: LingoValue) {
  /* global */ var g_profMGEngine = globalVar("g_profMGEngine");
  /* global */ var g_profMGEProcess = globalVar("g_profMGEProcess");
  var tt = theProperty("milliSeconds");
  callMethod("SetSyncState", meProp(_me, "m_rHandler"), 1)
  if (lingoBinary("lte", i_iSubturn, callMethod("GetNSubTurns", meProp(_me, "m_rCurrentTurn")))) {
  var t_ar_Events = callMethod("GetSubTurn", meProp(_me, "m_rCurrentTurn"), i_iSubturn);
  for (var tEvent of t_ar_Events.toArray()) {
  var t_iEvent = tEvent[1];
  var t_ar_iData = new LingoList([]);
  if (lingoBinary("gt", tEvent.count, 1)) {
  for (var i = 2; i <= tEvent.count; ++i) {
  callMethod("append", t_ar_iData, tEvent[i])
  }

  }

  callMethod("OnEvent", meProp(_me, "m_rHandler"), t_iEvent, t_ar_iData)
  }

  }

  for (var tObject of meProp(_me, "m_mp_objects").toArray()) {
  callMethod("move", callMethod("GetFactor", tObject))
  }

  setMeProp(_me, "m_MGEProcessAcc", lingoBinary("add", meProp(_me, "m_MGEProcessAcc"), lingoBinary("sub", theProperty("milliSeconds"), tt)));
}

