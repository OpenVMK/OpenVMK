// minigame_lobby.cct / CLobbyInterface / CreatePlayerListContent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreatePlayerListContent(_me: LingoMe) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rPlayerListView"))) ? 0 : 1)) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowName"));
  if (callNamed("objectp", tWndObj)) {
  var tElement = callMethod("getElement", tWndObj, "lobby_current_game_players");
  if (callNamed("objectp", tElement)) {
  var tCurrentGame = callMethod("CurrentGame", callMethod("getComponent", _me));
  callMethod("clear", meProp(_me, "m_rPlayerListView"))
  callMethod("SetItemWidth", meProp(_me, "m_rPlayerListView"), callMethod("getProperty", tElement, symbol("width")))
  if (callNamed("objectp", tCurrentGame)) {
  var tParticipantList = callMethod("GetParticipants", tCurrentGame);
  for (var tParticipant of tParticipantList.toArray()) {
  var tRoom = callMethod("_AccessRoom", callNamed("getThread", "room").component);
  var tAvatarRef = callMethod("GetParameterValue", tParticipant, symbol("AvatarRef"));
  var t_rAvatar = callMethod("_AccessIndexed", tRoom, tAvatarRef, "avatar");
  var t_sSender = "";
  if ((lingoTruthy(callNamed("voidp", t_rAvatar)) ? 0 : 1)) {
  t_sSender = callMethod("GetParam", t_rAvatar, "NAME");
  }

  callMethod("createItem", meProp(_me, "m_rPlayerListView"), lingoBinary("join", lingoBinary("join", callNamed("string", tAvatarRef), ", "), t_sSender))
  }

  var tImage = callMethod("render", meProp(_me, "m_rPlayerListView"));
  callMethod("feedImage", tElement, tImage)
  }

  }

  }

  setMeProp(_me, "m_iPlayerListSelection", undefined);
  }

}

