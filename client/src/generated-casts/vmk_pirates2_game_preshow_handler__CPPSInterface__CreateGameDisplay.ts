// vmk_pirates2_game_preshow_handler.cct / CPPSInterface / CreateGameDisplay

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateGameDisplay(_me: LingoMe, a_list: LingoValue, i_rGame: LingoValue) {
  if (lingoBinary("eq", i_rGame, callMethod("CurrentGame", meProp(_me, "m_rLobby")))) {
  setMeProp(_me, "m_iMyGameLevel", callNamed("integer", callMethod("GetParameterValue", i_rGame, "l")));
  }

  var t_mp_rParticipants = callMethod("GetParticipants", i_rGame);
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sGamelistWndTitle"));
  var tMyAvatarRef = callMethod("get", callNamed("getObject", symbol("session")), "room_own_avatar");
  var t_rMyAvatar = callMethod("_AccessIndexed", callMethod("_AccessRoom", callNamed("getThread", "room").component), tMyAvatarRef, "avatar");
  var t_sMyName = callMethod("GetParam", t_rMyAvatar, "NAME");
  var tFields = new LingoList([new LingoList([]), new LingoList([])]);
  if ((lingoTruthy(callNamed("voidp", tWndObj)) ? 0 : 1)) {
  if (lingoBinary("eq", a_list, symbol("left"))) {
  var t_sSide = "";
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
  t_sSide = 2;
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

  for (var team of new LingoList(["red", "blue"]).toArray()) {
  for (var player of new LingoList([1, 2, 3, 4]).toArray()) {
  var t_sIconName = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "piratesship", t_sSide), "."), team), player);
  var t_sButtonName = lingoBinary("join", "button.", t_sIconName);
  var t_rIcon = callMethod("getElement", tWndObj, t_sIconName);
  var t_rButton = callMethod("getElement", tWndObj, t_sButtonName);
  if (callNamed("objectp", t_rIcon)) {
  callMethod("hide", t_rIcon)
  }

  if (callNamed("objectp", t_rButton)) {
  callMethod("hide", t_rButton)
  }

  }

  }

  var tLevel = callMethod("GetParameterValue", i_rGame, "l");
  var t_iGameMode = callMethod("GetParameterValue", i_rGame, "m");
  var tCountLeft = 1;
  var tCountRight = 1;
  var tTeams = new LingoList([new LingoList([]), new LingoList([])]);
  for (var tParticipant of t_mp_rParticipants.toArray()) {
  var tRoom = callMethod("_AccessRoom", callNamed("getThread", "room").component);
  var tAvatarRef = callMethod("GetParameterValue", tParticipant, symbol("AvatarRef"));
  var t_bShowShipButton = 0;
  if (lingoBinary("eq", tAvatarRef, tMyAvatarRef)) {
  t_bShowShipButton = 1;
  }

  var t_sSender = "";
  if (lingoBinary("lt", tAvatarRef, 0)) {
  t_sSender = lingoBinary("joinPad", "AI Player", tAvatarRef);
  } else {
  var t_rAvatar = callMethod("_AccessIndexed", tRoom, tAvatarRef, "avatar");
  if ((lingoTruthy(callNamed("voidp", t_rAvatar)) ? 0 : 1)) {
  t_sSender = callMethod("GetParam", t_rAvatar, "NAME");
  }

  }

  switch (callMethod("GetParameterValue", tParticipant, "Team")) {
case 1:
  var t_sShipStatus = lingoBinary("join", lingoBinary("join", lingoBinary("join", "piratesship", t_sSide), ".red"), tCountLeft);
  tCountLeft = lingoBinary("add", tCountLeft, 1);
  break;
case 2:
  t_sShipStatus = lingoBinary("join", lingoBinary("join", lingoBinary("join", "piratesship", t_sSide), ".blue"), tCountRight);
  tCountRight = lingoBinary("add", tCountRight, 1);
  break;
  }

  var t_sButtonStatus = lingoBinary("join", "button.", t_sShipStatus);
  var t_rElem = callMethod("getElement", tWndObj, t_sShipStatus);
  t_rButton = callMethod("getElement", tWndObj, t_sButtonStatus);
  if (callNamed("objectp", t_rElem)) {
  var t_iShipType = callNamed("integer", callMethod("GetParameterValue", tParticipant, "t"));
  if (t_bShowShipButton) {
  var t_rUpMember = undefined;
  var t_rDownMember = undefined;
  switch (t_iShipType) {
case 1:
  t_rUpMember = callNamed("getMember", "button.pearl.active");
  t_rDownMember = callNamed("getMember", "button.pearl.pressed");
  break;
case 2:
  t_rUpMember = callNamed("getMember", "button.dutchman.active");
  t_rDownMember = callNamed("getMember", "button.dutchman.pressed");
  break;
case 3:
  t_rUpMember = callNamed("getMember", "button.wicked.active");
  t_rDownMember = callNamed("getMember", "button.wicked.pressed");
  break;
  }

  t_rButton.pButtonImg[symbol("up")] = t_rUpMember.image;
  t_rButton.pButtonImg[symbol("down")] = t_rDownMember.image;
  setThePropOf(t_rButton, "pCachedImgs", new LingoPropList([]));
  callMethod("changeState", t_rButton, symbol("up"))
  callMethod("show", t_rButton)
  } else {
  callMethod("show", t_rElem)
  var t_rMember = undefined;
  switch (t_iShipType) {
case 1:
  t_rMember = callNamed("getMember", "pearl.selected");
  break;
case 2:
  t_rMember = callNamed("getMember", "dutchman.selected");
  break;
case 3:
  t_rMember = callNamed("getMember", "wicked.selected");
  break;
  }

  setThePropOf(callMethod("getProperty", t_rElem, symbol("sprite")), "member", t_rMember);
  }

  }

  callMethod("append", tTeams[callMethod("GetParameterValue", tParticipant, "Team")], t_sSender)
  }

  for (var t = 1; t <= 2; ++t) {
  for (var i = 1; i <= tTeams[t].count; ++i) {
  callMethod("setText", tFields[t][i], tTeams[t][i])
  }

  }

  callMethod("setText", tFields[3], lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", callNamed("getText", "pps_level"), tLevel), "-"), callNamed("getText", lingoBinary("join", "pirates.gamemode.", t_iGameMode))))
  }

}

