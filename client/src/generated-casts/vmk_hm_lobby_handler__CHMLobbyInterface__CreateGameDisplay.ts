// vmk_hm_lobby_handler.cct / CHMLobbyInterface / CreateGameDisplay

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateGameDisplay(_me: LingoMe, a_list: LingoValue, i_rGame: LingoValue) {
  var t_mp_rParticipants = callMethod("GetParticipants", i_rGame);
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sGamelistWndTitle"));
  var tFields = new LingoList([new LingoList([]), new LingoList([])]);
  if (lingoBinary("neq", tWndObj, 0)) {
  if (lingoBinary("eq", a_list, symbol("left"))) {
  callMethod("append", tFields[1], callMethod("getElement", tWndObj, "team.red.player1"))
  callMethod("append", tFields[1], callMethod("getElement", tWndObj, "team.red.player2"))
  callMethod("append", tFields[1], callMethod("getElement", tWndObj, "team.red.player3"))
  callMethod("append", tFields[1], callMethod("getElement", tWndObj, "team.red.player4"))
  callMethod("append", tFields[2], callMethod("getElement", tWndObj, "team.blue.player1"))
  callMethod("append", tFields[2], callMethod("getElement", tWndObj, "team.blue.player2"))
  callMethod("append", tFields[2], callMethod("getElement", tWndObj, "team.blue.player3"))
  callMethod("append", tFields[2], callMethod("getElement", tWndObj, "team.blue.player4"))
  tFields[3] = callMethod("getElement", tWndObj, "signup.level.team1");
  } else {
  callMethod("append", tFields[1], callMethod("getElement", tWndObj, "team.red2.player1"))
  callMethod("append", tFields[1], callMethod("getElement", tWndObj, "team.red2.player2"))
  callMethod("append", tFields[1], callMethod("getElement", tWndObj, "team.red2.player3"))
  callMethod("append", tFields[1], callMethod("getElement", tWndObj, "team.red2.player4"))
  callMethod("append", tFields[2], callMethod("getElement", tWndObj, "team.blue2.player1"))
  callMethod("append", tFields[2], callMethod("getElement", tWndObj, "team.blue2.player2"))
  callMethod("append", tFields[2], callMethod("getElement", tWndObj, "team.blue2.player3"))
  callMethod("append", tFields[2], callMethod("getElement", tWndObj, "team.blue2.player4"))
  tFields[3] = callMethod("getElement", tWndObj, "signup.level.team2");
  }

  var tLevel = callMethod("GetParameterValue", i_rGame, "l");
  var tLeftIterator = 1;
  var tRightIterator = 1;
  var tTeams = new LingoList([new LingoList([]), new LingoList([])]);
  for (var tParticipant of t_mp_rParticipants.toArray()) {
  var tRoom = callMethod("_AccessRoom", callNamed("getThread", "room").component);
  var tAvatarRef = callMethod("GetParameterValue", tParticipant, symbol("AvatarRef"));
  var t_rAvatar = callMethod("_AccessIndexed", tRoom, tAvatarRef, "avatar");
  var t_sSender = "";
  if ((lingoTruthy(callNamed("voidp", t_rAvatar)) ? 0 : 1)) {
  t_sSender = callMethod("GetParam", t_rAvatar, "NAME");
  }

  callMethod("append", tTeams[callMethod("GetParameterValue", tParticipant, "Team")], t_sSender)
  }

  for (var t = 1; t <= 2; ++t) {
  for (var i = 1; i <= tTeams[t].count; ++i) {
  callMethod("setText", tFields[t][i], tTeams[t][i])
  }

  }

  }

}

