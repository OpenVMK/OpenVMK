// minigame_engine_overrides.cct /  / ProcessSubturn

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ProcessSubturn(_me: LingoMe, i_iSubturn: LingoValue) {
  var tt = theProperty("milliSeconds");
  callMethod("SetSyncState", _me.m_rHandler, 1)
  if (lingoBinary("lte", i_iSubturn, callMethod("GetNSubTurns", _me.m_rCurrentTurn))) {
  var tEvent = callMethod("GetSubTurn", _me.m_rCurrentTurn, i_iSubturn);
  for (var t_ar_iData of tEvent.toArray()) {
  var t_ar_Events = t_ar_iData[1];
  var t_iEvent = new LingoList([]);
  if (lingoBinary("gt", t_ar_iData.count, 1)) {
  for (var tIsThere = 2; tIsThere <= t_ar_iData.count; ++tIsThere) {
  callMethod("append", t_iEvent, t_ar_iData[tIsThere])
  }

  }

  callMethod("OnEvent", _me.m_rHandler, t_ar_Events, t_iEvent)
  }

  }

  for (var tObject of _me.m_mp_objects.toArray()) {
  callMethod("move", callMethod("GetFactor", tObject))
  }

  setThePropOf(_me, "m_MGEProcessAcc", lingoBinary("add", _me.m_MGEProcessAcc, lingoBinary("sub", theProperty("milliSeconds"), tt)));
}

