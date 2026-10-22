// minigame_engine_potc2.cct / CGameHandler / _GameStatusUpdate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _GameStatusUpdate(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_rInput = a_rMsg.connection;
  var t_iTurn = callMethod("GetIntFrom", t_rInput);
  var t_iChecksum = callMethod("GetIntFrom", t_rInput);
  var t_iNTurns = callMethod("GetIntFrom", t_rInput);
  if (callNamed("memberExists", "CTurnContainer")) {
  var t_turn = callNamed("createObject", symbol("random"), "CTurnContainer");
  callMethod("SetNumber", t_turn, t_iTurn)
  callMethod("SetChecksum", t_turn, t_iChecksum)
  for (var i = 1; i <= t_iNTurns; ++i) {
  var t_iNEvents = callMethod("GetIntFrom", t_rInput);
  for (var j = 1; j <= t_iNEvents; ++j) {
  var t_iCount = callMethod("GetIntFrom", t_rInput);
  var t_ar_event = new LingoList([]);
  for (var n = 1; n <= t_iCount; ++n) {
  callMethod("append", t_ar_event, callMethod("GetIntFrom", t_rInput))
  }

  callMethod("AddElement", t_turn, i, callMethod("duplicate", t_ar_event))
  }

  if (lingoBinary("eq", t_iNEvents, 0)) {
  callMethod("AddElement", t_turn, i, undefined)
  }

  }

  callMethod("_AddTurnToBuffer", callMethod("getComponent", _this), t_turn)
  }

}

