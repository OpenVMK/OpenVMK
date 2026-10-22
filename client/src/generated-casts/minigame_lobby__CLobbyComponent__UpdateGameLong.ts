// minigame_lobby.cct / CLobbyComponent / UpdateGameLong

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateGameLong(_me: LingoMe, i_ID: LingoValue, i_sDescription: LingoValue, i_iOwner: LingoValue, i_iNumParticipants: LingoValue, i_ar_participants: LingoValue, a_iTimeLeft: LingoValue, i_mp_data: LingoValue) {
  var tGame = callMethod("getaProp", meProp(_me, "m_mp_games"), i_ID);
  if (callNamed("voidp", tGame)) {
  callMethod("setaProp", meProp(_me, "m_mp_games"), i_ID, new LingoPropList([symbol("desc"), i_sDescription, symbol("data"), undefined]))
  tGame = callMethod("getaProp", meProp(_me, "m_mp_games"), i_ID);
  }

  setThePropOf(tGame, "desc", i_sDescription);
  if (callNamed("voidp", tGame.data)) {
  callMethod("setaProp", tGame, symbol("data"), callNamed("createObject", lingoBinary("join", "GameContainer:", i_ID), "CGameContainer"))
  }

  callMethod("SetParameter", tGame.data, "GameID", i_ID)
  callMethod("SetParameter", tGame.data, "OwnerRef", i_iOwner)
  callMethod("SetParameter", tGame.data, "GameName", i_sDescription)
  callMethod("SetParameter", tGame.data, "NumParticipants", i_iNumParticipants)
  callMethod("SetParameter", tGame.data, "TimeLeft", a_iTimeLeft)
  for (var i = 1; i <= i_mp_data.count; ++i) {
  callMethod("SetParameter", tGame.data, callMethod("getPropAt", i_mp_data, i), i_mp_data[i])
  }

  for (var i = 1; i <= i_iNumParticipants; ++i) {
  if ((lingoTruthy(callMethod("ParticipantExists", tGame.data, i_ar_participants[i].ref)) ? 0 : 1)) {
  var tParticipant = callMethod("AddParticipant", tGame.data, i_ar_participants[i].ref);
  if ((lingoTruthy(callNamed("voidp", tParticipant)) ? 0 : 1)) {
  callMethod("SetParameter", tParticipant, "AvatarRef", i_ar_participants[i].ref)
  callMethod("SetParameter", tParticipant, "Team", i_ar_participants[i].team)
  for (var j = 1; j <= i_ar_participants[i].data.count; ++j) {
  var tKey = callMethod("getPropAt", i_ar_participants[i].data, j);
  var tvalue = i_ar_participants[i].data[j];
  callMethod("SetParameter", tParticipant, tKey, tvalue)
  }

  }

  }

  }

  var tMyAvatarRef = callMethod("get", callNamed("getObject", symbol("session")), "room_own_avatar");
  if (lingoBinary("eq", i_iOwner, tMyAvatarRef)) {
  setMeProp(_me, "m_myGameID", i_ID);
  }

  setMeProp(_me, "m_bDirty", 1);
  setMeProp(_me, "m_bGameDataPending", 0);
  callMethod("CreateGameListContent", callMethod("getInterface", _me))
  callMethod("CreatePlayerListContent", callMethod("getInterface", _me))
  callMethod("CreateAttributeListContent", callMethod("getInterface", _me))
  callMethod("CreateMyAttributeListContent", callMethod("getInterface", _me))
}

