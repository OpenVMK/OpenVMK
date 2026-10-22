// vmk_hm_lobby_handler.cct / CHMLobbyInterface / SetJoinLeaveButtons

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetJoinLeaveButtons(_me: LingoMe, a_iMyGame: LingoValue, a_iMyTeam: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sGamelistWndTitle"));
  if (lingoBinary("neq", tWndObj, 0)) {
  if (lingoBinary("or", lingoBinary("eq", a_iMyGame, meProp(_me, "m_iListDisplayOffset")), lingoBinary("eq", a_iMyGame, lingoBinary("add", meProp(_me, "m_iListDisplayOffset"), 1)))) {
  if (lingoBinary("eq", a_iMyGame, meProp(_me, "m_iListDisplayOffset"))) {
  switch (a_iMyTeam) {
case 1:
  callMethod("hide", callMethod("getElement", tWndObj, "button.join.redteam"))
  callMethod("show", callMethod("getElement", tWndObj, "button.leave.redteam"))
  callMethod("show", callMethod("getElement", tWndObj, "button.join.blueteam"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.leave.blueteam"))
  break;
case 2:
  callMethod("hide", callMethod("getElement", tWndObj, "button.join.blueteam"))
  callMethod("show", callMethod("getElement", tWndObj, "button.leave.blueteam"))
  callMethod("show", callMethod("getElement", tWndObj, "button.join.redteam"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.leave.redteam"))
  break;
  }

  if (lingoBinary("gte", callMethod("GetGameList", meProp(_me, "m_rLobby")).count, lingoBinary("add", meProp(_me, "m_iListDisplayOffset"), 1))) {
  callMethod("show", callMethod("getElement", tWndObj, "button.join.blueteam2"))
  callMethod("show", callMethod("getElement", tWndObj, "button.join.redteam2"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.leave.blueteam2"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.leave.redteam2"))
  } else {
  callMethod("hide", callMethod("getElement", tWndObj, "button.join.blueteam2"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.join.redteam2"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.leave.blueteam2"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.leave.redteam2"))
  }

  } else {
  switch (a_iMyTeam) {
case 1:
  callMethod("hide", callMethod("getElement", tWndObj, "button.join.redteam2"))
  callMethod("show", callMethod("getElement", tWndObj, "button.leave.redteam2"))
  callMethod("show", callMethod("getElement", tWndObj, "button.join.blueteam2"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.leave.blueteam2"))
  break;
case 2:
  callMethod("hide", callMethod("getElement", tWndObj, "button.join.blueteam2"))
  callMethod("show", callMethod("getElement", tWndObj, "button.leave.blueteam2"))
  callMethod("show", callMethod("getElement", tWndObj, "button.join.redteam2"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.leave.redteam2"))
  break;
  }

  callMethod("show", callMethod("getElement", tWndObj, "button.join.blueteam"))
  callMethod("show", callMethod("getElement", tWndObj, "button.join.redteam"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.leave.blueteam"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.leave.redteam"))
  }

  } else {
  var tCount = callMethod("GetGameList", meProp(_me, "m_rLobby")).count;
  if (lingoBinary("gt", lingoBinary("add", meProp(_me, "m_iListDisplayOffset"), 1), tCount)) {
  callMethod("hide", callMethod("getElement", tWndObj, "button.join.blueteam2"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.join.redteam2"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.leave.blueteam2"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.leave.redteam2"))
  }

  if (lingoBinary("gt", meProp(_me, "m_iListDisplayOffset"), tCount)) {
  callMethod("hide", callMethod("getElement", tWndObj, "button.join.blueteam"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.join.redteam"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.leave.blueteam"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.leave.redteam"))
  }

  if (lingoBinary("lte", lingoBinary("add", meProp(_me, "m_iListDisplayOffset"), 1), tCount)) {
  callMethod("show", callMethod("getElement", tWndObj, "button.join.blueteam2"))
  callMethod("show", callMethod("getElement", tWndObj, "button.join.redteam2"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.leave.blueteam2"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.leave.redteam2"))
  }

  if (lingoBinary("lte", meProp(_me, "m_iListDisplayOffset"), tCount)) {
  callMethod("show", callMethod("getElement", tWndObj, "button.join.blueteam"))
  callMethod("show", callMethod("getElement", tWndObj, "button.join.redteam"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.leave.blueteam"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.leave.redteam"))
  }

  }

  }

  var tGameList = callMethod("GetGameList", meProp(_me, "m_rLobby"));
  if (lingoBinary("gte", tGameList.count, meProp(_me, "m_iListDisplayOffset"))) {
  var tGame1 = callMethod("GetGameData", meProp(_me, "m_rLobby"), callMethod("getPropAt", tGameList, meProp(_me, "m_iListDisplayOffset")));
  var tCountLeft = 0;
  var tCountRight = 0;
  for (var tParticipant of callMethod("GetParticipants", tGame1).toArray()) {
  switch (callMethod("GetParameterValue", tParticipant, "Team")) {
case 1:
  tCountLeft = lingoBinary("add", tCountLeft, 1);
  break;
case 2:
  tCountRight = lingoBinary("add", tCountRight, 1);
  break;
  }

  }

  if (lingoBinary("gte", tCountLeft, 4)) {
  callMethod("hide", callMethod("getElement", tWndObj, "button.join.redteam"))
  }

  if (lingoBinary("gte", tCountRight, 4)) {
  callMethod("hide", callMethod("getElement", tWndObj, "button.join.blueteam"))
  }

  var tOwner = callMethod("GetParameterValue", tGame1, "OwnerRef");
  if (lingoBinary("eq", tOwner, callMethod("getValue", callNamed("getObject", symbol("session")), "room_own_avatar"))) {
  callMethod("hide", callMethod("getElement", tWndObj, "button.join.blueteam"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.join.redteam"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.leave.blueteam"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.leave.redteam"))
  }

  }

  if (lingoBinary("gte", tGameList.count, lingoBinary("add", meProp(_me, "m_iListDisplayOffset"), 1))) {
  var tGame2 = callMethod("GetGameData", meProp(_me, "m_rLobby"), callMethod("getPropAt", tGameList, lingoBinary("add", meProp(_me, "m_iListDisplayOffset"), 1)));
  tCountLeft = 0;
  tCountRight = 0;
  for (var tParticipant of callMethod("GetParticipants", tGame1).toArray()) {
  switch (callMethod("GetParameterValue", tParticipant, "Team")) {
case 1:
  tCountLeft = lingoBinary("add", tCountLeft, 1);
  break;
case 2:
  tCountRight = lingoBinary("add", tCountRight, 1);
  break;
  }

  }

  if (lingoBinary("gte", tCountLeft, 4)) {
  callMethod("hide", callMethod("getElement", tWndObj, "button.join.redteam2"))
  }

  if (lingoBinary("gte", tCountRight, 4)) {
  callMethod("hide", callMethod("getElement", tWndObj, "button.join.blueteam2"))
  }

  tOwner = callMethod("GetParameterValue", tGame2, "OwnerRef");
  if (lingoBinary("eq", tOwner, callMethod("getValue", callNamed("getObject", symbol("session")), "room_own_avatar"))) {
  callMethod("hide", callMethod("getElement", tWndObj, "button.join.blueteam2"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.join.redteam2"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.leave.blueteam2"))
  callMethod("hide", callMethod("getElement", tWndObj, "button.leave.redteam2"))
  }

  }

}

