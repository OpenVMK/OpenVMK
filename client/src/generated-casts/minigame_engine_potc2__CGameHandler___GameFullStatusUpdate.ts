// minigame_engine_potc2.cct / CGameHandler / _GameFullStatusUpdate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _GameFullStatusUpdate(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_ar_refList = new LingoList([]);
  var t_rInput = a_rMsg.connection;
  var t_iObjectCount = callMethod("GetIntFrom", t_rInput);
  for (var o = 1; o <= t_iObjectCount; ++o) {
  t_rInput = a_rMsg.connection;
  var t_iCount = callMethod("GetIntFrom", t_rInput);
  var t_iType = callMethod("GetIntFrom", t_rInput);
  var t_iRef = callMethod("GetIntFrom", t_rInput);
  var t_iOwner = callMethod("GetIntFrom", t_rInput);
  var t_iTeam = callMethod("GetIntFrom", t_rInput);
  var t_xWorld = callMethod("GetIntFrom", t_rInput);
  var t_yWorld = callMethod("GetIntFrom", t_rInput);
  var t_zWorld = callMethod("GetIntFrom", t_rInput);
  var t_iDir = callMethod("GetIntFrom", t_rInput);
  var t_iExtraParams = new LingoList([]);
  if (lingoBinary("gt", t_iCount, 8)) {
  for (var i = 9; i <= t_iCount; ++i) {
  callMethod("append", t_iExtraParams, callMethod("GetIntFrom", t_rInput))
  }

  }

  var t_rPos = callNamed("intvector", t_xWorld, t_yWorld, t_zWorld);
  var tParams = new LingoPropList([]);
  callMethod("setaProp", tParams, symbol("ref"), t_iRef)
  callMethod("setaProp", tParams, symbol("owner"), t_iOwner)
  callMethod("setaProp", tParams, symbol("team"), t_iTeam)
  callMethod("setaProp", tParams, symbol("worldpos"), t_rPos)
  callMethod("setaProp", tParams, symbol("Dir"), t_iDir)
  callMethod("setaProp", tParams, symbol("type"), t_iType)
  callMethod("setaProp", tParams, symbol("extra"), t_iExtraParams)
  callMethod("_MinigameUpdateOrCreateObject", callMethod("getComponent", _this), t_iRef, tParams)
  callMethod("append", t_ar_refList, t_iRef)
  }

  callMethod("_TestObjectListVsRefList", callMethod("getComponent", _this), t_ar_refList)
  callMethod("_SetChecksumValid", callMethod("getComponent", _this))
  callMethod("_ClearTurnBuffer", callMethod("getComponent", _this))
  callMethod("_ClearCurrentTurn", callMethod("getComponent", _this))
  var t_iTurn = callMethod("GetIntFrom", t_rInput);
  var t_iChecksum = callMethod("GetIntFrom", t_rInput);
  var t_iNTurns = callMethod("GetIntFrom", t_rInput);
  var t_turn = callNamed("createObject", symbol("random"), "CTurnContainer");
  callMethod("SetNumber", t_turn, t_iTurn)
  callMethod("SetChecksum", t_turn, t_iChecksum)
  for (var i = 1; i <= t_iNTurns; ++i) {
  var t_iNEvents = callMethod("GetIntFrom", t_rInput);
  for (var j = 1; j <= t_iNEvents; ++j) {
  t_iCount = callMethod("GetIntFrom", t_rInput);
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

