// minigame_lobby.cct / CLobbyInterface / LobbyEventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LobbyEventProc(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  switch (tElemID) {
case "lobby_join_game":
  if (lingoBinary("neq", meProp(_me, "m_iGameListSelection"), 0)) {
  var tGameID = callMethod("getPropAt", callMethod("GetGameList", callMethod("getComponent", _me)), meProp(_me, "m_iGameListSelection"));
  var tTeam = callNamed("value", callMethod("getText", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sWindowName")), "lobby_team")));
  callMethod("JoinGame", callMethod("getComponent", _me), tGameID, tTeam)
  }

  break;
case "lobby_leave_game":
  callMethod("LeaveCurrentGame", callMethod("getComponent", _me))
  break;
case "lobby_create_game":
  callMethod("CreateGame", callMethod("getComponent", _me), new LingoPropList([]))
  break;
case "lobby_remove_game":
  callMethod("RemoveMyGame", callMethod("getComponent", _me))
  break;
case "lobby_start_game":
  callMethod("StartMyGame", callMethod("getComponent", _me))
  callMethod("ShowDefaultLobbyWindow", _me, 0)
  callNamed("updateStage")
  break;
case "lobby_kick_avatar":
  if (lingoBinary("neq", meProp(_me, "m_iPlayerListSelection"), 0)) {
  var tParticipantList = callMethod("GetParticipants", callMethod("GetCurrentGame", callMethod("getComponent", _me)));
  var tRef = tParticipantList[meProp(_me, "m_iPlayerListSelection")];
  callMethod("KickAvatarFromMyGame", callMethod("getComponent", _me), tRef)
  }

  break;
case "lobby_set_attribute":
  if (lingoBinary("neq", meProp(_me, "m_iAttributeListSelection"), 0)) {
  var tAttributelist = callMethod("GetParameterList", callMethod("GetCurrentGame", callMethod("getComponent", _me)));
  var tKey = tAttributelist[meProp(_me, "m_iAttributeListSelection")];
  var tvalue = callMethod("getText", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sWindowName")), "lobby_attribute_value"));
  callMethod("SetParameter", callMethod("GetCurrentGame", callMethod("getComponent", _me)), tKey, tvalue)
  }

  break;
case "lobby_set_my_attribute":
  if (lingoBinary("neq", meProp(_me, "m_iMyAttributeListSelection"), 0)) {
  var tMyAvatarRef = callMethod("get", callNamed("getObject", symbol("session")), "room_own_avatar");
  var tMe = callMethod("GetByAvatarRef", callMethod("GetCurrentGame", callMethod("getComponent", _me)), tMyAvatarRef);
  if (callNamed("objectp", tMe)) {
  var tAttributeMap = callMethod("GetParameterList", tMe);
  }

  }

  break;
case "lobby_list_of_games":
  callMethod("unselectAll", meProp(_me, "m_rGameListView"))
  var tClickPos = tParm;
  setMeProp(_me, "m_iGameListSelection", callMethod("getItemIndexClickedOn", meProp(_me, "m_rGameListView"), tClickPos));
  callMethod("selectItem", meProp(_me, "m_rGameListView"), meProp(_me, "m_iGameListSelection"), 1)
  callMethod("RefreshDisplay", _me)
  break;
case "lobby_current_game_players":
  callMethod("unselectAll", meProp(_me, "m_rPlayerListView"))
  tClickPos = tParm;
  setMeProp(_me, "m_iPlayerListSelection", callMethod("getItemIndexClickedOn", meProp(_me, "m_rPlayerListView"), tClickPos));
  callMethod("selectItem", meProp(_me, "m_rPlayerListView"), meProp(_me, "m_iPlayerListSelection"), 1)
  callMethod("RefreshDisplay", _me)
  break;
case "lobby_attribute_list":
  callMethod("unselectAll", meProp(_me, "m_rAttributeListView"))
  tClickPos = tParm;
  setMeProp(_me, "m_iAttributeListSelection", callMethod("getItemIndexClickedOn", meProp(_me, "m_rAttributeListView"), tClickPos));
  callMethod("selectItem", meProp(_me, "m_rAttributeListView"), meProp(_me, "m_iAttributeListSelection"), 1)
  callMethod("RefreshDisplay", _me)
  break;
case "lobby_my_attribute_list":
  callMethod("unselectAll", meProp(_me, "m_rMyAttributeListView"))
  tClickPos = tParm;
  setMeProp(_me, "m_iMyAttributeListSelection", callMethod("getItemIndexClickedOn", meProp(_me, "m_rMyAttributeListView"), tClickPos));
  callMethod("selectItem", meProp(_me, "m_rMyAttributeListView"), meProp(_me, "m_iMyAttributeListSelection"), 1)
  callMethod("RefreshDisplay", _me)
  break;
case "close":
  callMethod("ShowDefaultLobbyWindow", _me, 0)
  callNamed("updateStage")
  break;
  }

  }

}

