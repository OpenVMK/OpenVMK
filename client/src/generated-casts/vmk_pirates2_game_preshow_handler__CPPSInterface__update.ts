// vmk_pirates2_game_preshow_handler.cct / CPPSInterface / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if (callMethod("GameListDirty", meProp(_me, "m_rLobby"))) {
  var tMyGame = callMethod("GetMyGame", meProp(_me, "m_rLobby"));
  if (callNamed("objectp", tMyGame)) {
  callMethod("DisableStartAndMoreRooms", _me)
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sGamePrestartDlgWndTitle"));
  if ((lingoTruthy(callNamed("voidp", tWndObj)) ? 0 : 1)) {
  callMethod("show", tWndObj)
  callMethod("setText", callMethod("getElement", tWndObj, "team.red.player1"), "")
  callMethod("setText", callMethod("getElement", tWndObj, "team.red.player2"), "")
  callMethod("setText", callMethod("getElement", tWndObj, "team.red.player3"), "")
  callMethod("setText", callMethod("getElement", tWndObj, "team.red.player4"), "")
  callMethod("setText", callMethod("getElement", tWndObj, "team.blue.player1"), "")
  callMethod("setText", callMethod("getElement", tWndObj, "team.blue.player2"), "")
  callMethod("setText", callMethod("getElement", tWndObj, "team.blue.player3"), "")
  callMethod("setText", callMethod("getElement", tWndObj, "team.blue.player4"), "")
  callMethod("hide", callMethod("getElement", tWndObj, "button.topirates"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.toport"))
  setMeProp(_me, "m_ar_leftTeamParticipants", new LingoList([]));
  setMeProp(_me, "m_ar_rightTeamParticipants", new LingoList([]));
  var tCountLeft = 1;
  var tCountRight = 1;
  var tMyAvatarRef = callMethod("get", callNamed("getObject", symbol("session")), "room_own_avatar");
  var t_rMyAvatar = callMethod("_AccessIndexed", callMethod("_AccessRoom", callNamed("getThread", "room").component), tMyAvatarRef, "avatar");
  var t_sMyName = callMethod("GetParam", t_rMyAvatar, "NAME");
  var t_iGameMode = callMethod("GetParameterValue", tMyGame, "m");
  for (var team of new LingoList(["red", "blue"]).toArray()) {
  for (var player of new LingoList([1, 2, 3, 4]).toArray()) {
  var t_sElemName = lingoBinary("join", lingoBinary("join", "button.piratesship.", team), player);
  var t_rElem = callMethod("getElement", tWndObj, t_sElemName);
  if (callNamed("objectp", t_rElem)) {
  callMethod("hide", t_rElem)
  }

  t_sElemName = lingoBinary("join", lingoBinary("join", "piratesship.", team), player);
  t_rElem = callMethod("getElement", tWndObj, t_sElemName);
  if (callNamed("objectp", t_rElem)) {
  callMethod("hide", t_rElem)
  }

  }

  }

  for (var tParticipant of callMethod("GetParticipants", tMyGame).toArray()) {
  var t_iAvatarRef = callMethod("GetParameterValue", tParticipant, symbol("AvatarRef"));
  var t_sName = "";
  var t_bShowShipButton = 0;
  if (lingoBinary("eq", t_iAvatarRef, tMyAvatarRef)) {
  t_bShowShipButton = 1;
  }

  if (lingoBinary("eq", t_iAvatarRef, tMyAvatarRef)) {
  var t_rKick1 = callMethod("getElement", tWndObj, "button.pirateskick.red1");
  var t_rKick2 = callMethod("getElement", tWndObj, "button.pirateskick.blue1");
  switch (callMethod("GetParameterValue", tParticipant, "Team")) {
case 1:
  callMethod("show", callMethod("getElement", tWndObj, "button.topirates"))
  if (callNamed("objectp", t_rKick1)) {
  callMethod("deactivate", t_rKick1)
  }

  if (callNamed("objectp", t_rKick2)) {
  callMethod("Activate", t_rKick2)
  }

  break;
case 2:
  callMethod("show", callMethod("getElement", tWndObj, "button.toport"))
  if (callNamed("objectp", t_rKick1)) {
  callMethod("Activate", t_rKick1)
  }

  if (callNamed("objectp", t_rKick2)) {
  callMethod("deactivate", t_rKick2)
  }

  break;
  }

  }

  if (lingoBinary("lt", t_iAvatarRef, 0)) {
  t_sName = lingoBinary("joinPad", callNamed("getText", "pirates.player.ai.name"), t_iAvatarRef);
  } else {
  var t_rAvatar = callMethod("_AccessIndexed", callMethod("_AccessRoom", callNamed("getThread", "room").component), t_iAvatarRef, "avatar");
  if ((lingoTruthy(callNamed("voidp", t_rAvatar)) ? 0 : 1)) {
  t_sName = callMethod("GetParam", t_rAvatar, "NAME");
  }

  }

  switch (callMethod("GetParameterValue", tParticipant, "Team")) {
case 1:
  callMethod("append", meProp(_me, "m_ar_leftTeamParticipants"), tParticipant)
  callMethod("setText", callMethod("getElement", tWndObj, lingoBinary("join", "team.red.player", tCountLeft)), t_sName)
  var t_sShipStatus = lingoBinary("join", "piratesship.red", tCountLeft);
  tCountLeft = lingoBinary("add", tCountLeft, 1);
  break;
case 2:
  callMethod("append", meProp(_me, "m_ar_rightTeamParticipants"), tParticipant)
  callMethod("setText", callMethod("getElement", tWndObj, lingoBinary("join", "team.blue.player", tCountRight)), t_sName)
  t_sShipStatus = lingoBinary("join", "piratesship.blue", tCountRight);
  tCountRight = lingoBinary("add", tCountRight, 1);
  break;
  }

  var t_sButtonStatus = lingoBinary("join", "button.", t_sShipStatus);
  t_rElem = callMethod("getElement", tWndObj, t_sShipStatus);
  var t_rButton = callMethod("getElement", tWndObj, t_sButtonStatus);
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
  continue;
  }

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

  var t_bOkToStart = 1;
  if (meProp(_me, "m_bCheckEqualPlayers")) {
  var t_iTotalPlayersMin = 4;
  if (lingoBinary("lt", callMethod("GetParticipants", tMyGame).count, t_iTotalPlayersMin)) {
  t_bOkToStart = 0;
  } else {
  if ((lingoTruthy(lingoBinary("eq", tCountLeft, tCountRight)) ? 0 : 1)) {
  t_bOkToStart = 0;
  }

  }

  }

  t_rElem = callMethod("getElement", tWndObj, "button.pirates.startnow");
  if (t_bOkToStart) {
  callMethod("Activate", t_rElem)
  } else {
  callMethod("deactivate", t_rElem)
  }

  if (lingoBinary("eq", meProp(_me, "m_ar_leftTeamParticipants").count, 4)) {
  callMethod("deactivate", callMethod("getElement", tWndObj, "button.toport"))
  } else {
  callMethod("Activate", callMethod("getElement", tWndObj, "button.toport"))
  }

  if (lingoBinary("eq", meProp(_me, "m_ar_rightTeamParticipants").count, 4)) {
  callMethod("deactivate", callMethod("getElement", tWndObj, "button.topirates"))
  } else {
  callMethod("Activate", callMethod("getElement", tWndObj, "button.topirates"))
  }

  if (lingoBinary("eq", t_iGameMode, 2)) {
  for (var team of new LingoList(["red", "blue"]).toArray()) {
  for (var player of new LingoList([1, 2, 3, 4]).toArray()) {
  t_sElemName = lingoBinary("join", lingoBinary("join", lingoBinary("join", "team.", team), ".player"), player);
  t_rElem = callMethod("getElement", tWndObj, t_sElemName);
  if (callNamed("objectp", t_rElem)) {
  if (lingoBinary("eq", callMethod("getText", t_rElem), "")) {
  callMethod("setText", t_rElem, callNamed("getText", "pirates.player.ai.create"))
  }

  }

  }

  }

  }

  }

  } else {
  var t_ar_gameConditions = callMethod("GetGameConditions", meProp(_me, "m_rLobby"));
  if ((lingoTruthy(callNamed("voidp", t_ar_gameConditions["c"])) ? 0 : 1)) {
  callMethod("EnableStartAndMoreRooms", _me)
  } else {
  callMethod("DisableStartAndMoreRooms", _me)
  }

  }

  callMethod("refreshOnScreen", _me)
  }

}

