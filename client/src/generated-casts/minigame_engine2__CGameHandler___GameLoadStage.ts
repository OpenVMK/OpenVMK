// minigame_engine2.cct / CGameHandler / _GameLoadStage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _GameLoadStage(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_rInput = a_rMsg.connection;
  var t_sStage = callMethod("GetStrFrom", t_rInput);
  var t_iVersion = callMethod("GetIntFrom", t_rInput);
  var t_iParamCount = callMethod("GetIntFrom", t_rInput);
  var t_ar_Params = new LingoPropList([]);
  for (var j = 1; j <= t_iParamCount; ++j) {
  var t_sKey = callMethod("GetStrFrom", t_rInput);
  var t_sValue = callMethod("GetStrFrom", t_rInput);
  switch (t_sKey) {
case "intarray":
  var t_ar_intarray = new LingoList([]);
  for (var i = 1; i <= callNamed("integer", t_sValue); ++i) {
  callMethod("append", t_ar_intarray, callMethod("GetIntFrom", t_rInput))
  }

  callMethod("addProp", t_ar_Params, t_sKey, t_ar_intarray)
  break;
  default:
  callMethod("addProp", t_ar_Params, t_sKey, t_sValue)
  }

  }

  callMethod("_LoadStage", callMethod("getComponent", _this), t_sStage, t_iVersion, t_ar_Params)
}

