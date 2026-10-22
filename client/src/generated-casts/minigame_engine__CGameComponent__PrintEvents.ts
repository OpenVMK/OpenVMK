// minigame_engine.cct / CGameComponent / PrintEvents

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PrintEvents(_me: LingoMe, i_turn: LingoValue) {
  /* global */ var g_profMGEngine = globalVar("g_profMGEngine");
  /* global */ var g_profMGEProcess = globalVar("g_profMGEProcess");
  for (var i = 1; i <= callMethod("GetNSubTurns", i_turn); ++i) {
  var t_ar_events = callMethod("GetSubTurn", i_turn, i);
  for (var tEvent of t_ar_events.toArray()) {
  callNamed("put", lingoBinary("join", "SubTurn : ", i))
  var t_iEvent = tEvent[1];
  var t_ar_iData = new LingoList([]);
  for (var j = 2; j <= tEvent.count; ++j) {
  callMethod("append", t_ar_iData, tEvent[j])
  }

  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "Event:", t_iEvent), "Data:"), t_ar_iData))
  }

  }

}

