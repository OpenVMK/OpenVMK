// vmk_pirates2_minigame.cct / CPiratesComponent / GetAllScores

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetAllScores(_me: LingoMe) {
  /* global */ var g_profComponent = globalVar("g_profComponent");
  var t_out = new LingoPropList([symbol("players"), new LingoList([]), symbol("scores"), new LingoList([]), symbol("teamscores"), new LingoList([])]);
  var t_ar_ships = callMethod("GetObjectsByCode", callMethod("getComponent", callNamed("getThread", "minigame")), 1);
  var t_ar_scoreboard = callMethod("GetObjectsByCode", callMethod("getComponent", callNamed("getThread", "minigame")), 9);
  var t_ar_leftteam = new LingoList([]);
  var t_ar_rightteam = new LingoList([]);
  for (var tShip of t_ar_ships.toArray()) {
  var t_bDead = 0;
  if (lingoBinary("lt", callMethod("GetParam", tShip, "Health"), 0)) {
  t_bDead = 1;
  }

  if (lingoBinary("eq", callMethod("GetParam", tShip, "Team"), 1)) {
  if (lingoBinary("eq", callMethod("GetParam", tShip, "Owner"), -float(1))) {
  var tName = callNamed("getText", "pirates_computer_player_name.1");
  } else {
  var t_rList = callMethod("getaProp", callMethod("GetParticipantlist", meProp(_me, "m_rMGE")), callMethod("GetParam", tShip, "Owner"));
  if (callNamed("listp", t_rList)) {
  tName = t_rList[symbol("name")];
  } else {
  tName = "";
  }

  }

  callMethod("append", t_ar_leftteam, new LingoPropList([symbol("name"), tName, symbol("score"), callMethod("GetParam", tShip, "Gold"), symbol("vault"), callMethod("GetParam", tShip, "Score"), symbol("dead"), t_bDead]))
  continue;
  }

  if (lingoBinary("eq", callMethod("GetParam", tShip, "Team"), 2)) {
  if (lingoBinary("eq", callMethod("GetParam", tShip, "Owner"), -float(1))) {
  tName = callNamed("getText", "pirates_computer_player_name.2");
  } else {
  t_rList = callMethod("getaProp", callMethod("GetParticipantlist", meProp(_me, "m_rMGE")), callMethod("GetParam", tShip, "Owner"));
  if (callNamed("listp", t_rList)) {
  tName = t_rList[symbol("name")];
  } else {
  tName = "";
  }

  }

  callMethod("append", t_ar_rightteam, new LingoPropList([symbol("name"), tName, symbol("score"), callMethod("GetParam", tShip, "Gold"), symbol("vault"), callMethod("GetParam", tShip, "Score"), symbol("dead"), t_bDead]))
  }

  }

  var t_ar_return = new LingoPropList([symbol("players"), new LingoList([]), symbol("scores"), new LingoList([]), symbol("vaults"), new LingoList([]), symbol("teamscores"), new LingoList([]), symbol("TeamWins"), new LingoList([]), symbol("dead"), new LingoList([])]);
  if (lingoBinary("lt", t_ar_leftteam.count, 4)) {
  for (var i = lingoBinary("add", t_ar_leftteam.count, 1); i <= 4; ++i) {
  callMethod("append", t_ar_leftteam, new LingoPropList([symbol("name"), "", symbol("score"), 0, symbol("dead"), 0, symbol("vault"), 0]))
  }

  }

  if (lingoBinary("lt", t_ar_rightteam.count, 4)) {
  for (var i = lingoBinary("add", t_ar_rightteam.count, 1); i <= 4; ++i) {
  callMethod("append", t_ar_rightteam, new LingoPropList([symbol("name"), "", symbol("score"), 0, symbol("dead"), 0, symbol("vault"), 0]))
  }

  }

  for (var t_rPlayer of t_ar_leftteam.toArray()) {
  callMethod("append", t_ar_return[symbol("players")], t_rPlayer.name)
  callMethod("append", t_ar_return[symbol("scores")], t_rPlayer.score)
  callMethod("append", t_ar_return[symbol("vaults")], t_rPlayer.vault)
  callMethod("append", t_ar_return[symbol("dead")], t_rPlayer.dead)
  }

  for (var t_rPlayer of t_ar_rightteam.toArray()) {
  callMethod("append", t_ar_return[symbol("players")], t_rPlayer.name)
  callMethod("append", t_ar_return[symbol("scores")], t_rPlayer.score)
  callMethod("append", t_ar_return[symbol("vaults")], t_rPlayer.vault)
  callMethod("append", t_ar_return[symbol("dead")], t_rPlayer.dead)
  }

  callMethod("append", t_ar_return[symbol("teamscores")], callMethod("GetTeam1Score", callMethod("GetFactor", t_ar_scoreboard[1])))
  callMethod("append", t_ar_return[symbol("teamscores")], callMethod("GetTeam2Score", callMethod("GetFactor", t_ar_scoreboard[1])))
  callMethod("append", t_ar_return[symbol("TeamWins")], callMethod("GetTeam1Wins", callMethod("GetFactor", t_ar_scoreboard[1])))
  callMethod("append", t_ar_return[symbol("TeamWins")], callMethod("GetTeam2Wins", callMethod("GetFactor", t_ar_scoreboard[1])))
  return t_ar_return;
}

