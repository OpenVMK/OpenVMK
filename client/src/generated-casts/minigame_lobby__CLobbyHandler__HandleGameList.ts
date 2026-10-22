// minigame_lobby.cct / CLobbyHandler / HandleGameList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HandleGameList(_me: LingoMe, tMsg: LingoValue) {
  var tNum = callMethod("GetIntFrom", tMsg.connection);
  for (var i = 1; i <= tNum; ++i) {
  var tGameRef = callMethod("GetIntFrom", tMsg.connection);
  var tGameName = callMethod("GetStrFrom", tMsg.connection);
  var tNumParticipants = callMethod("GetIntFrom", tMsg.connection);
  var tTimeLeft = callMethod("GetIntFrom", tMsg.connection);
  callMethod("AddOrUpdateGameShort", callMethod("getComponent", _me), tGameRef, tGameName, tNumParticipants, tTimeLeft)
  }

  callMethod("SetGameListReceived", callMethod("getComponent", _me), 1)
}

