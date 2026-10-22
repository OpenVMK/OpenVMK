// minigame_engine.cct / CGameHandler / _GameLoadStage

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
  callMethod("_LoadStage", callMethod("getComponent", _this), t_sStage, t_iVersion)
}

