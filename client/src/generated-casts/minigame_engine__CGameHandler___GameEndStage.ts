// minigame_engine.cct / CGameHandler / _GameEndStage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _GameEndStage(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_rInput = a_rMsg.connection;
  var tTimeToStart = callMethod("GetIntFrom", t_rInput);
  var tParamCount = callMethod("GetIntFrom", t_rInput);
  var t_ar_params = new LingoList([]);
  for (var i = 1; i <= tParamCount; ++i) {
  callMethod("append", t_ar_params, callMethod("GetIntFrom", t_rInput))
  }

  callMethod("_EndStage", callMethod("getComponent", _this), tTimeToStart, t_ar_params)
}

