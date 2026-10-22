// minigame_engine_overrides.cct /  / PrintEvents

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PrintEvents(_me: LingoMe, i_turn: LingoValue) {
  for (var tIsThere = 1; tIsThere <= callMethod("GetNSubTurns", i_turn); ++tIsThere) {
  var tEvent = callMethod("GetSubTurn", i_turn, tIsThere);
  for (var t_ar_iData of tEvent.toArray()) {
  callNamed("put", lingoBinary("join", "SubTurn : ", tIsThere))
  var t_ar_Events = t_ar_iData[1];
  var t_iEvent = new LingoList([]);
  for (var j = 2; j <= t_ar_iData.count; ++j) {
  callMethod("append", t_iEvent, t_ar_iData[j])
  }

  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "Event:", t_ar_Events), "Data:"), t_iEvent))
  }

  }

}

