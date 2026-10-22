// vmk_pirates2_game_preshow_handler.cct / CPPSInterface / PrestartDlgEventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PrestartDlgEventProc(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sGamePrestartDlgWndTitle"));
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  switch (tElemID) {
case "button.pirates.startnow":
  callNamed("executeMessage", "PlayInterfaceSound", "PG-UI-knock")
  callMethod("StartMyGame", meProp(_me, "m_rLobby"))
  break;
case "button.piratesship.red1":
case "button.piratesship.red2":
case "button.piratesship.red3":
case "button.piratesship.red4":
case "button.piratesship.blue1":
case "button.piratesship.blue2":
case "button.piratesship.blue3":
case "button.piratesship.blue4":
  var t_rParticipant = undefined;
  var t_iPlayer = callNamed("integer", tElemID.char[tElemID.length]);
  if (lingoBinary("contains", tElemID, "red")) {
  if (lingoBinary("gte", meProp(_me, "m_ar_leftTeamParticipants").count, t_iPlayer)) {
  t_rParticipant = meProp(_me, "m_ar_leftTeamParticipants")[t_iPlayer];
  }

  } else {
  if (lingoBinary("gte", meProp(_me, "m_ar_rightTeamParticipants").count, t_iPlayer)) {
  t_rParticipant = meProp(_me, "m_ar_rightTeamParticipants")[t_iPlayer];
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

  break;
case "button.pirateskick.red1":
  if (lingoBinary("gte", meProp(_me, "m_ar_leftTeamParticipants").count, 1)) {
  callMethod("KickAvatarFromMyGame", meProp(_me, "m_rLobby"), callMethod("GetParameterValue", meProp(_me, "m_ar_leftTeamParticipants")[1], symbol("AvatarRef")))
  callNamed("executeMessage", "PlayInterfaceSound", "PG-UI-knock")
  }

  break;
case "button.pirateskick.red2":
  if (lingoBinary("gte", meProp(_me, "m_ar_leftTeamParticipants").count, 2)) {
  callMethod("KickAvatarFromMyGame", meProp(_me, "m_rLobby"), callMethod("GetParameterValue", meProp(_me, "m_ar_leftTeamParticipants")[2], symbol("AvatarRef")))
  callNamed("executeMessage", "PlayInterfaceSound", "PG-UI-knock")
  }

  break;
case "button.pirateskick.red3":
  if (lingoBinary("gte", meProp(_me, "m_ar_leftTeamParticipants").count, 3)) {
  callMethod("KickAvatarFromMyGame", meProp(_me, "m_rLobby"), callMethod("GetParameterValue", meProp(_me, "m_ar_leftTeamParticipants")[3], symbol("AvatarRef")))
  callNamed("executeMessage", "PlayInterfaceSound", "PG-UI-knock")
  }

  break;
case "button.pirateskick.red4":
  if (lingoBinary("gte", meProp(_me, "m_ar_leftTeamParticipants").count, 4)) {
  callMethod("KickAvatarFromMyGame", meProp(_me, "m_rLobby"), callMethod("GetParameterValue", meProp(_me, "m_ar_leftTeamParticipants")[4], symbol("AvatarRef")))
  callNamed("executeMessage", "PlayInterfaceSound", "PG-UI-knock")
  }

  break;
case "button.pirateskick.blue1":
  if (lingoBinary("gte", meProp(_me, "m_ar_rightTeamParticipants").count, 1)) {
  callMethod("KickAvatarFromMyGame", meProp(_me, "m_rLobby"), callMethod("GetParameterValue", meProp(_me, "m_ar_rightTeamParticipants")[1], symbol("AvatarRef")))
  callNamed("executeMessage", "PlayInterfaceSound", "PG-UI-knock")
  }

  break;
case "button.pirateskick.blue2":
  if (lingoBinary("gte", meProp(_me, "m_ar_rightTeamParticipants").count, 2)) {
  callMethod("KickAvatarFromMyGame", meProp(_me, "m_rLobby"), callMethod("GetParameterValue", meProp(_me, "m_ar_rightTeamParticipants")[2], symbol("AvatarRef")))
  callNamed("executeMessage", "PlayInterfaceSound", "PG-UI-knock")
  }

  break;
case "button.pirateskick.blue3":
  if (lingoBinary("gte", meProp(_me, "m_ar_rightTeamParticipants").count, 3)) {
  callMethod("KickAvatarFromMyGame", meProp(_me, "m_rLobby"), callMethod("GetParameterValue", meProp(_me, "m_ar_rightTeamParticipants")[3], symbol("AvatarRef")))
  callNamed("executeMessage", "PlayInterfaceSound", "PG-UI-knock")
  }

  break;
case "button.pirateskick.blue4":
  if (lingoBinary("gte", meProp(_me, "m_ar_rightTeamParticipants").count, 4)) {
  callMethod("KickAvatarFromMyGame", meProp(_me, "m_rLobby"), callMethod("GetParameterValue", meProp(_me, "m_ar_rightTeamParticipants")[4], symbol("AvatarRef")))
  callNamed("executeMessage", "PlayInterfaceSound", "PG-UI-knock")
  }

  break;
case "button.pirates.cancel":
case "pirates.close":
  if ((lingoTruthy(callNamed("voidp", callMethod("GetMyGame", meProp(_me, "m_rLobby")))) ? 0 : 1)) {
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callMethod("RemoveMyGame", meProp(_me, "m_rLobby"))
  callNamed("removeWindow", meProp(_me, "m_sGamePrestartDlgWndTitle"))
  callMethod("EnableStartAndMoreRooms", _me)
  setMeProp(_me, "m_iGameMode", 0);
  setMeProp(_me, "m_iShipType", 0);
  }

  break;
case "pirates.help":
  callNamed("executeMessage", symbol("open_help_page"), "help.games.pirates")
  break;
case "team.red.player1":
case "team.red.player2":
case "team.red.player3":
case "team.red.player4":
case "team.blue.player1":
case "team.blue.player2":
case "team.blue.player3":
case "team.blue.player4":
  setMeProp(_me, "m_ar_AIPlayer", new LingoPropList([]));
  t_iPlayer = callNamed("integer", tElemID.char[tElemID.length]);
  if (lingoBinary("contains", tElemID, "red")) {
  var t_iTeam = 1;
  } else {
  t_iTeam = 2;
  t_iPlayer = lingoBinary("add", t_iPlayer, 4);
  }

  var tMyGame = callMethod("GetMyGame", meProp(_me, "m_rLobby"));
  if (callNamed("objectp", tMyGame)) {
  if (lingoBinary("eq", callMethod("GetParameterValue", tMyGame, "m"), 2)) {
  var t_iGameID = callMethod("GetParameterValue", tMyGame, "GameID");
  meProp(_me, "m_ar_AIPlayer")[symbol("GameID")] = t_iGameID;
  meProp(_me, "m_ar_AIPlayer")[symbol("player")] = t_iPlayer;
  meProp(_me, "m_ar_AIPlayer")[symbol("ship")] = 2;
  callMethod("createConfirmAIDialog", _me)
  }

  }

  break;
case "button.topirates":
case "button.toport":
  tMyAvatarRef = callMethod("get", callNamed("getObject", symbol("session")), "room_own_avatar");
  callMethod("SendParticipantData", meProp(_me, "m_rLobby"), tMyAvatarRef, new LingoPropList(["team", "switch"]))
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "PrestartDlgEventProc", tElemID))
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

