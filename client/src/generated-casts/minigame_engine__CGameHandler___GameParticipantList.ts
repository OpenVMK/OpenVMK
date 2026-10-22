// minigame_engine.cct / CGameHandler / _GameParticipantList

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
  var tCount = callMethod("GetIntFrom", t_rInput);
  var tList = new LingoPropList([]);
  for (var i = 1; i <= tCount; ++i) {
  var tAvatarRef = callMethod("GetIntFrom", t_rInput);
  var tAvatarName = callMethod("GetStrFrom", t_rInput);
  callMethod("addProp", tList, tAvatarRef, tAvatarName)
  }

  callMethod("_SetParticipantList", callMethod("getComponent", _this), tList)
}

