// vmk_hm_lobby_handler.cct / CHMLobbyInterface / update

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
  callMethod("checkStartGameButton", _me)
  callMethod("DisableStartAndMoreRooms", _me)
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sGamePrestartDlgWndTitle"));
  if (lingoBinary("neq", tWndObj, 0)) {
  callMethod("show", tWndObj)
  callMethod("setText", callMethod("getElement", tWndObj, "team.red.player1"), "")
  callMethod("setText", callMethod("getElement", tWndObj, "team.red.player2"), "")
  callMethod("setText", callMethod("getElement", tWndObj, "team.red.player3"), "")
  callMethod("setText", callMethod("getElement", tWndObj, "team.red.player4"), "")
  callMethod("setText", callMethod("getElement", tWndObj, "team.blue.player1"), "")
  callMethod("setText", callMethod("getElement", tWndObj, "team.blue.player2"), "")
  callMethod("setText", callMethod("getElement", tWndObj, "team.blue.player3"), "")
  callMethod("setText", callMethod("getElement", tWndObj, "team.blue.player4"), "")
  setMeProp(_me, "m_ar_leftTeamParticipants", new LingoList([]));
  setMeProp(_me, "m_ar_rightTeamParticipants", new LingoList([]));
  var tCountLeft = 1;
  var tCountRight = 1;
  var tMyAvatarRef = callMethod("get", callNamed("getObject", symbol("session")), "room_own_avatar");
  for (var tParticipant of callMethod("GetParticipants", tMyGame).toArray()) {
  var t_rAvatar = callMethod("_AccessIndexed", callMethod("_AccessRoom", callNamed("getThread", "room").component), callMethod("GetParameterValue", tParticipant, symbol("AvatarRef")), "avatar");
  var t_sName = "";
  if ((lingoTruthy(callNamed("voidp", t_rAvatar)) ? 0 : 1)) {
  t_sName = callMethod("GetParam", t_rAvatar, "NAME");
  }

  switch (callMethod("GetParameterValue", tParticipant, "Team")) {
case 1:
  callMethod("append", meProp(_me, "m_ar_leftTeamParticipants"), tParticipant)
  callMethod("setText", callMethod("getElement", tWndObj, lingoBinary("join", "team.red.player", tCountLeft)), t_sName)
  tCountLeft = lingoBinary("add", tCountLeft, 1);
  break;
case 2:
  callMethod("append", meProp(_me, "m_ar_rightTeamParticipants"), tParticipant)
  callMethod("setText", callMethod("getElement", tWndObj, lingoBinary("join", "team.blue.player", tCountRight)), t_sName)
  tCountRight = lingoBinary("add", tCountRight, 1);
  break;
  }

  }

  var t_sMyName = callMethod("GetParam", callMethod("_AccessIndexed", callMethod("_AccessRoom", callNamed("getThread", "room").component), tMyAvatarRef, "avatar"), "NAME");
  }

  } else {
  callMethod("EnableStartAndMoreRooms", _me)
  }

  callMethod("refreshOnScreen", _me)
  }

}

