// minigame_lobby.cct / CLobbyHandler / HandleGameData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HandleGameData(_me: LingoMe, tMsg: LingoValue) {
  var tNum = callMethod("GetIntFrom", tMsg.connection);
  for (var i = 1; i <= tNum; ++i) {
  var tGameRef = callMethod("GetIntFrom", tMsg.connection);
  var tGameDesc = callMethod("GetStrFrom", tMsg.connection);
  var tOwnerID = callMethod("GetIntFrom", tMsg.connection);
  var tTimeLeft = callMethod("GetIntFrom", tMsg.connection);
  var tNumAvatars = callMethod("GetIntFrom", tMsg.connection);
  var t_ar_participants = new LingoList([]);
  for (var j = 1; j <= tNumAvatars; ++j) {
  var tAvatarRef = callMethod("GetIntFrom", tMsg.connection);
  var tAvatarTeam = callMethod("GetIntFrom", tMsg.connection);
  var tAmountOfData = callMethod("GetIntFrom", tMsg.connection);
  var t_mp_avatar_data = new LingoPropList([]);
  for (var k = 1; k <= tAmountOfData; ++k) {
  var t_sKey = callMethod("GetStrFrom", tMsg.connection);
  var t_sValue = callMethod("GetStrFrom", tMsg.connection);
  callMethod("addProp", t_mp_avatar_data, t_sKey, t_sValue)
  }

  callMethod("append", t_ar_participants, new LingoPropList([symbol("ref"), tAvatarRef, symbol("team"), tAvatarTeam, symbol("data"), t_mp_avatar_data]))
  }

  tAmountOfData = callMethod("GetIntFrom", tMsg.connection);
  var t_mp_data = new LingoPropList([]);
  for (var j = 1; j <= tAmountOfData; ++j) {
  t_sKey = callMethod("GetStrFrom", tMsg.connection);
  t_sValue = callMethod("GetStrFrom", tMsg.connection);
  callMethod("addProp", t_mp_data, t_sKey, t_sValue)
  }

  callMethod("UpdateGameLong", callMethod("getComponent", _me), tGameRef, tGameDesc, tOwnerID, tNumAvatars, t_ar_participants, tTimeLeft, t_mp_data)
  }

}

