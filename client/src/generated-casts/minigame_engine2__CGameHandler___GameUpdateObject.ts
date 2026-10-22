// minigame_engine2.cct / CGameHandler / _GameUpdateObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _GameUpdateObject(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_rInput = a_rMsg.connection;
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

  var tParams = new LingoPropList([symbol("ref"), t_iRef, symbol("owner"), t_iOwner, symbol("team"), 3, t_iTeam, symbol("worldpos"), callNamed("intvector", t_xWorld, t_yWorld, t_zWorld), symbol("Dir"), t_iDir, symbol("extra"), t_iExtraParams]);
  callMethod("_MinigameUpdateObject", callMethod("getComponent", _this), t_iRef, tParams)
}

