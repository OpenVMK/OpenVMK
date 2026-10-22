// vmk_minigame.cct / CGameHandler / _GameParticipantList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _GameParticipantList(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_rInput = a_rMsg.connection;
  var t_iCount = callMethod("GetIntFrom", t_rInput);
  var tList = new LingoPropList([]);
  for (var i = 1; i <= t_iCount; ++i) {
  var tAvatarRef = callMethod("GetIntFrom", t_rInput);
  var tAvatarName = callMethod("GetStrFrom", t_rInput);
  var t_AvatarFigureList = new LingoList([]);
  if (lingoBinary("neq", callNamed("getThread", "fireworks"), 0)) {
  var t_iFigureListCount = callMethod("GetIntFrom", t_rInput);
  for (var j = 1; j <= t_iFigureListCount; ++j) {
  var t_iFigureData = callMethod("GetIntFrom", t_rInput);
  callMethod("append", t_AvatarFigureList, t_iFigureData)
  }

  }

  callMethod("addProp", tList, tAvatarRef, new LingoPropList([symbol("name"), tAvatarName, symbol("figuredata"), t_AvatarFigureList]))
  }

  callMethod("_SetParticipantList", callMethod("getComponent", _this), tList)
}

