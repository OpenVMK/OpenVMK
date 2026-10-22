// minigame_lobby.cct / CLobbyComponent / JoinAvatarToGame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function JoinAvatarToGame(_me: LingoMe, i_ID: LingoValue, i_iAvatarRef: LingoValue, i_iTeam: LingoValue, i_ar_data: LingoValue) {
  var t_rMyGame = callMethod("GetMyGame", _me);
  var tGame = callMethod("getaProp", meProp(_me, "m_mp_games"), i_ID);
  if (callNamed("voidp", tGame)) {
  return callNamed("error", _me, lingoBinary("joinPad", lingoBinary("joinPad", "GameID", i_ID), "not found"), symbol("JoinAvatarToGame"));
  }

  var tParticipant = callMethod("AddParticipant", tGame.data, i_iAvatarRef);
  callMethod("SetParameter", tParticipant, "AvatarRef", i_iAvatarRef)
  callMethod("SetParameter", tParticipant, "Team", i_iTeam)
  for (var j = 1; j <= i_ar_data.count; ++j) {
  var tKey = callMethod("getPropAt", i_ar_data, j);
  var tvalue = i_ar_data[j];
  callMethod("SetParameter", tParticipant, tKey, tvalue)
  }

  var tMyAvatarRef = callMethod("get", callNamed("getObject", symbol("session")), "room_own_avatar");
  if (lingoBinary("eq", i_iAvatarRef, tMyAvatarRef)) {
  setMeProp(_me, "m_myGameID", i_ID);
  }

  setMeProp(_me, "m_bDirty", 1);
  callMethod("SetParameter", tGame.data, "NumParticipants", callMethod("GetParticipants", tGame.data).count)
  callMethod("CreateGameListContent", callMethod("getInterface", _me))
  callMethod("CreatePlayerListContent", callMethod("getInterface", _me))
  callMethod("CreateAttributeListContent", callMethod("getInterface", _me))
  callMethod("CreateMyAttributeListContent", callMethod("getInterface", _me))
  return tParticipant;
}

