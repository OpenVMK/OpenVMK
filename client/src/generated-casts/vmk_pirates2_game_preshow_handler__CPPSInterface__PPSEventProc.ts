// vmk_pirates2_game_preshow_handler.cct / CPPSInterface / PPSEventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PPSEventProc(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  callMethod("deactivate", callNamed("getWindowManager"), meProp(_me, "m_sGamelistWndTitle"))
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  var tGameList = callMethod("GetGameList", meProp(_me, "m_rLobby"));
  switch (tElemID) {
case "button.next":
  setMeProp(_me, "m_iListDisplayOffset", lingoBinary("add", meProp(_me, "m_iListDisplayOffset"), 1));
  if (lingoBinary("gt", meProp(_me, "m_iListDisplayOffset"), lingoBinary("sub", tGameList.count, 1))) {
  setMeProp(_me, "m_iListDisplayOffset", lingoBinary("sub", tGameList.count, 1));
  }

  if (lingoBinary("lt", meProp(_me, "m_iListDisplayOffset"), 1)) {
  setMeProp(_me, "m_iListDisplayOffset", 1);
  }

  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callMethod("refreshOnScreen", _me)
  break;
case "button.previous":
  setMeProp(_me, "m_iListDisplayOffset", lingoBinary("sub", meProp(_me, "m_iListDisplayOffset"), 1));
  if (lingoBinary("lt", meProp(_me, "m_iListDisplayOffset"), 1)) {
  setMeProp(_me, "m_iListDisplayOffset", 1);
  }

  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callMethod("refreshOnScreen", _me)
  break;
case "button.join.redteam":
  if (lingoBinary("gte", tGameList.count, meProp(_me, "m_iListDisplayOffset"))) {
  var tGameID = callMethod("getPropAt", tGameList, meProp(_me, "m_iListDisplayOffset"));
  if (callNamed("voidp", callMethod("CurrentGame", meProp(_me, "m_rLobby")))) {
  callMethod("JoinGame", _me, tGameID, 1)
  } else {
  if (lingoBinary("or", lingoBinary("neq", meProp(_me, "m_iMyTeam"), 1), lingoBinary("neq", callMethod("GetParameterValue", callMethod("CurrentGame", meProp(_me, "m_rLobby")), "GameID"), tGameID))) {
  callMethod("LeaveCurrentGame", meProp(_me, "m_rLobby"))
  callMethod("JoinGame", _me, tGameID, 1)
  }

  }

  if (callNamed("windowExists", meProp(_me, "m_sGamePrestartDlgWndTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sGamePrestartDlgWndTitle"))
  }

  }

  callNamed("executeMessage", "PlayInterfaceSound", "PG-UI-knock")
  break;
case "button.join.blueteam":
  if (lingoBinary("gte", tGameList.count, meProp(_me, "m_iListDisplayOffset"))) {
  tGameID = callMethod("getPropAt", tGameList, meProp(_me, "m_iListDisplayOffset"));
  if (callNamed("voidp", callMethod("CurrentGame", meProp(_me, "m_rLobby")))) {
  callMethod("JoinGame", _me, tGameID, 2)
  } else {
  if (lingoBinary("or", lingoBinary("neq", meProp(_me, "m_iMyTeam"), 2), lingoBinary("neq", callMethod("GetParameterValue", callMethod("CurrentGame", meProp(_me, "m_rLobby")), "GameID"), tGameID))) {
  callMethod("LeaveCurrentGame", meProp(_me, "m_rLobby"))
  callMethod("JoinGame", _me, tGameID, 2)
  }

  }

  if (callNamed("windowExists", meProp(_me, "m_sGamePrestartDlgWndTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sGamePrestartDlgWndTitle"))
  }

  }

  callNamed("executeMessage", "PlayInterfaceSound", "PG-UI-knock")
  break;
case "button.join.redteam2":
  if (lingoBinary("gte", tGameList.count, lingoBinary("add", meProp(_me, "m_iListDisplayOffset"), 1))) {
  tGameID = callMethod("getPropAt", tGameList, lingoBinary("add", meProp(_me, "m_iListDisplayOffset"), 1));
  if (callNamed("voidp", callMethod("CurrentGame", meProp(_me, "m_rLobby")))) {
  callMethod("JoinGame", _me, tGameID, 1)
  } else {
  if (lingoBinary("or", lingoBinary("neq", meProp(_me, "m_iMyTeam"), 1), lingoBinary("neq", callMethod("GetParameterValue", callMethod("CurrentGame", meProp(_me, "m_rLobby")), "GameID"), tGameID))) {
  callMethod("LeaveCurrentGame", meProp(_me, "m_rLobby"))
  callMethod("JoinGame", _me, tGameID, 1)
  }

  }

  if (callNamed("windowExists", meProp(_me, "m_sGamePrestartDlgWndTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sGamePrestartDlgWndTitle"))
  }

  }

  callNamed("executeMessage", "PlayInterfaceSound", "PG-UI-knock")
  break;
case "button.join.blueteam2":
  if (lingoBinary("gte", tGameList.count, lingoBinary("add", meProp(_me, "m_iListDisplayOffset"), 1))) {
  tGameID = callMethod("getPropAt", tGameList, lingoBinary("add", meProp(_me, "m_iListDisplayOffset"), 1));
  if (callNamed("voidp", callMethod("CurrentGame", meProp(_me, "m_rLobby")))) {
  callMethod("JoinGame", _me, tGameID, 2)
  } else {
  if (lingoBinary("or", lingoBinary("neq", meProp(_me, "m_iMyTeam"), 2), lingoBinary("neq", callMethod("GetParameterValue", callMethod("CurrentGame", meProp(_me, "m_rLobby")), "GameID"), tGameID))) {
  callMethod("LeaveCurrentGame", meProp(_me, "m_rLobby"))
  callMethod("JoinGame", _me, tGameID, 2)
  }

  }

  if (callNamed("windowExists", meProp(_me, "m_sGamePrestartDlgWndTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sGamePrestartDlgWndTitle"))
  }

  }

  break;
case "button.leave.redteam":
case "button.leave.blueteam":
case "button.leave.redteam2":
case "button.leave.blueteam2":
  callNamed("executeMessage", "PlayInterfaceSound", "PG-UI-knock")
  if (lingoBinary("eq", callMethod("GetMyGame", meProp(_me, "m_rLobby")), callMethod("CurrentGame", meProp(_me, "m_rLobby")))) {
  callNamed("removeWindow", meProp(_me, "m_sGamePrestartDlgWndTitle"))
  }

  callMethod("LeaveCurrentGame", meProp(_me, "m_rLobby"))
  setMeProp(_me, "m_iMyTeam", 0);
  break;
case "button.newgame":
  callNamed("executeMessage", "PlayInterfaceSound", "PG-UI-knock")
  var t_iGameConditions = callMethod("GetGameConditions", meProp(_me, "m_rLobby"));
  var t_iCost = callNamed("integer", t_iGameConditions["c"]);
  switch (t_iCost) {
case 0:
  callMethod("CreateStartGameWindow", _me)
  break;
  default:
  callMethod("createGameConditionsDialog", _me, t_iCost)
  }

  break;
case "button.moregames":
  callNamed("executeMessage", "PlayInterfaceSound", "PG-UI-knock")
  callMethod("CreatePeerListWindow", _me)
  callMethod("GetMoreGameRooms", _me)
  break;
case "button.instructions":
  callNamed("executeMessage", "PlayInterfaceSound", "PG-UI-knock")
  callMethod("CreateInstructionsWindow", _me)
  break;
case "button.piratesship.red1":
case "button.piratesship.red2":
case "button.piratesship.red3":
case "button.piratesship.red4":
case "button.piratesship.blue1":
case "button.piratesship.blue2":
case "button.piratesship.blue3":
case "button.piratesship.blue4":
case "button.piratesship2.red1":
case "button.piratesship2.red2":
case "button.piratesship2.red3":
case "button.piratesship2.red4":
case "button.piratesship2.blue1":
case "button.piratesship2.blue2":
case "button.piratesship2.blue3":
case "button.piratesship2.blue4":
  var t_rParticipant = undefined;
  var t_iPlayer = callNamed("integer", tElemID.char[tElemID.length]);
  var t_rGame = callMethod("GetJoinedGame", meProp(_me, "m_rLobby"));
  if (callNamed("objectp", t_rGame)) {
  var t_ar_leftTeamParticipants = new LingoList([]);
  var t_ar_rightTeamParticipants = new LingoList([]);
  for (var tParticipant of callMethod("GetParticipants", t_rGame).toArray()) {
  switch (callMethod("GetParameterValue", tParticipant, "Team")) {
case 1:
  callMethod("append", t_ar_leftTeamParticipants, tParticipant)
  break;
case 2:
  callMethod("append", t_ar_rightTeamParticipants, tParticipant)
  break;
  }

  }

  if (lingoBinary("contains", tElemID, "red")) {
  if (lingoBinary("gte", t_ar_leftTeamParticipants.count, t_iPlayer)) {
  t_rParticipant = t_ar_leftTeamParticipants[t_iPlayer];
  }

  } else {
  if (lingoBinary("gte", t_ar_rightTeamParticipants.count, t_iPlayer)) {
  t_rParticipant = t_ar_rightTeamParticipants[t_iPlayer];
  }

  }

  var tMyAvatarRef = callMethod("get", callNamed("getObject", symbol("session")), "room_own_avatar");
  if (callNamed("objectp", t_rParticipant)) {
  var t_iAvatarRef = callMethod("GetParameterValue", t_rParticipant, symbol("AvatarRef"));
  setMeProp(_me, "m_iShipType", callNamed("integer", callMethod("GetParameterValue", t_rParticipant, "t")));
  if (lingoBinary("gte", t_iAvatarRef, 0)) {
  if (lingoBinary("eq", t_iAvatarRef, tMyAvatarRef)) {
  callMethod("createSelectShipDialog", _me, t_iAvatarRef)
  }

  }

  }

  }

  break;
case "button.highscores":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callMethod("CreateHighscoreWindow", _me)
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  }

  }

}

