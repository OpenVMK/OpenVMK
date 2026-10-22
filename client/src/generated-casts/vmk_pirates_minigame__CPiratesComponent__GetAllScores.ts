// vmk_pirates_minigame.cct / CPiratesComponent / GetAllScores

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
  if (lingoBinary("eq", callMethod("GetParam", tShip, "Team"), 1)) {
  if (lingoBinary("eq", callMethod("GetParam", tShip, "Owner"), -float(1))) {
  var tName = callNamed("getText", "pirates_computer_player_name");
  } else {
  tName = callMethod("getaProp", callMethod("GetParticipantlist", meProp(_me, "m_rMGE")), callMethod("GetParam", tShip, "Owner"));
  }

  callMethod("append", t_ar_leftteam, new LingoPropList([symbol("name"), tName, symbol("score"), callMethod("GetParam", tShip, "Score")]))
  continue;
  }

  if (lingoBinary("eq", callMethod("GetParam", tShip, "Team"), 2)) {
  if (lingoBinary("eq", callMethod("GetParam", tShip, "Owner"), -float(1))) {
  tName = callNamed("getText", "pirates_computer_player_name");
  } else {
  tName = callMethod("getaProp", callMethod("GetParticipantlist", meProp(_me, "m_rMGE")), callMethod("GetParam", tShip, "Owner"));
  }

  callMethod("append", t_ar_rightteam, new LingoPropList([symbol("name"), tName, symbol("score"), callMethod("GetParam", tShip, "Score")]))
  }

  }

  if (lingoBinary("lt", t_ar_leftteam.count, 4)) {
  for (var i = lingoBinary("add", t_ar_leftteam.count, 1); i <= 4; ++i) {
  callMethod("append", t_ar_leftteam, new LingoPropList([symbol("name"), "", symbol("score"), 0]))
  }

  }

  if (lingoBinary("lt", t_ar_rightteam.count, 4)) {
  for (var i = lingoBinary("add", t_ar_rightteam.count, 1); i <= 4; ++i) {
  callMethod("append", t_ar_rightteam, new LingoPropList([symbol("name"), "", symbol("score"), 0]))
  }

  }

  return new LingoPropList([symbol("players"), new LingoList([t_ar_leftteam[1].name, t_ar_leftteam[2].name, t_ar_leftteam[3].name, t_ar_leftteam[4].name, t_ar_rightteam[1].name, t_ar_rightteam[2].name, t_ar_rightteam[3].name, t_ar_rightteam[4].name]), symbol("scores"), new LingoList([t_ar_leftteam[1].score, t_ar_leftteam[2].score, t_ar_leftteam[3].score, t_ar_leftteam[4].score, t_ar_rightteam[1].score, t_ar_rightteam[2].score, t_ar_rightteam[3].score, t_ar_rightteam[4].score]), symbol("teamscores"), new LingoList([callMethod("GetTeam1Score", callMethod("GetFactor", t_ar_scoreboard[1])), callMethod("GetTeam2Score", callMethod("GetFactor", t_ar_scoreboard[1]))])]);
}

