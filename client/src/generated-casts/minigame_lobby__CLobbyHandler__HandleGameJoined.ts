// minigame_lobby.cct / CLobbyHandler / HandleGameJoined

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HandleGameJoined(_me: LingoMe, tMsg: LingoValue) {
  var tGameRef = callMethod("GetIntFrom", tMsg.connection);
  var tAvatarRef = callMethod("GetIntFrom", tMsg.connection);
  var tTeam = callMethod("GetIntFrom", tMsg.connection);
  var tAmountOfData = callMethod("GetIntFrom", tMsg.connection);
  var t_mp_data = new LingoPropList([]);
  for (var j = 1; j <= tAmountOfData; ++j) {
  var t_sKey = callMethod("GetStrFrom", tMsg.connection);
  var t_sValue = callMethod("GetStrFrom", tMsg.connection);
  callMethod("addProp", t_mp_data, t_sKey, t_sValue)
  }

  callMethod("JoinAvatarToGame", callMethod("getComponent", _me), tGameRef, tAvatarRef, tTeam, t_mp_data)
}

