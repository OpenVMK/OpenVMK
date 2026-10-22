// vmk_minigame.cct / CGameHandler / _GameObjectsList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _GameObjectsList(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_rInput = a_rMsg.connection;
  var t_iCountObjects = callMethod("GetIntFrom", t_rInput);
  for (var i = 1; i <= t_iCountObjects; ++i) {
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
  for (var j = 9; j <= t_iCount; ++j) {
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
  callMethod("_CreateObject", callMethod("getComponent", _this), t_iRef, tParams)
  }

}

