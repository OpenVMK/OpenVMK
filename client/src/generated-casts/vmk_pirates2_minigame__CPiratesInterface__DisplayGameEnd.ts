// vmk_pirates2_minigame.cct / CPiratesInterface / DisplayGameEnd

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DisplayGameEnd(_me: LingoMe, a_sTitle: LingoValue, a_ar_stagevictoryparams: LingoValue, a_ar_sPlayers: LingoValue, a_ar_iScores: LingoValue, a_ar_iVaults: LingoValue, a_ar_iTeamScores: LingoValue, a_ar_iTeamWins: LingoValue, a_iTimeRemaining: LingoValue) {
  /* global */ var g_profInterface = globalVar("g_profInterface");
  /* global */ var g_gfxCbNormal = globalVar("g_gfxCbNormal");
  /* global */ var g_gfxCbGolden = globalVar("g_gfxCbGolden");
  /* global */ var g_gfxCbRed = globalVar("g_gfxCbRed");
  /* global */ var g_gfxCbWhite = globalVar("g_gfxCbWhite");
  /* global */ var g_gfxCbFire = globalVar("g_gfxCbFire");
  /* global */ var g_gfxPickupAmmo = globalVar("g_gfxPickupAmmo");
  /* global */ var g_gfxPickupAmmoGolden = globalVar("g_gfxPickupAmmoGolden");
  /* global */ var g_gfxPickupHealth = globalVar("g_gfxPickupHealth");
  /* global */ var g_gfxPickupFlag1 = globalVar("g_gfxPickupFlag1");
  /* global */ var g_gfxPickupFlag2 = globalVar("g_gfxPickupFlag2");
  var a_iWinner = a_ar_stagevictoryparams[1];
  var t_iTeam1Score = a_ar_stagevictoryparams[2];
  var t_iTeam2Score = a_ar_stagevictoryparams[3];
  var t_iLastStage = a_ar_stagevictoryparams[4];
  var t_iTeam1FlagBonus = a_ar_stagevictoryparams[5];
  var t_iTeam2FlagBonus = a_ar_stagevictoryparams[6];
  var t_iGameCancelled = a_ar_stagevictoryparams[7];
  var t_iWinningBonus = a_ar_stagevictoryparams[8];
  var t_iEndInfo = a_ar_stagevictoryparams[9];
  if (callNamed("windowExists", meProp(_me, "m_sMidStageWndTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sMidStageWndTitle"))
  }

  callNamed("createWindow", meProp(_me, "m_sMidStageWndTitle"), "vmk_pirates_modal.window")
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sMidStageWndTitle"));
  var tWnd = callNamed("getWindow", meProp(_me, "m_sMidStageWndTitle"));
  var t_iGameMode = callMethod("GetGameMode", callMethod("getComponent", _me));
  switch (t_iGameMode) {
case 1:
  callMethod("merge", tWnd, "pirates_gameend_ctf.window")
  break;
case 2:
  callMethod("merge", tWnd, "pirates_gameend_lms.window")
  break;
  default:
  callMethod("merge", tWnd, "vmk_pirates_winner.window")
  }

  var t_sWinner = "";
  switch (a_iWinner) {
case 1:
  t_sWinner = callNamed("getText", "pirates.team.1");
  if (lingoBinary("eq", t_iGameMode, 1)) {
  callMethod("changeImageInElement", _me, tWnd, "ctf.bonus.portroyal", callNamed("member", "ctf.gamebonus.portroyal"))
  } else {
  if (lingoBinary("eq", t_iGameMode, 2)) {
  callMethod("changeImageInElement", _me, tWnd, "lms.bonus.portroyal", callNamed("member", "lms.bonus"))
  }

  }

  break;
case 2:
  t_sWinner = callNamed("getText", "pirates.team.2");
  if (lingoBinary("eq", t_iGameMode, 1)) {
  callMethod("changeImageInElement", _me, tWnd, "ctf.bonus.pirates", callNamed("member", "ctf.gamebonus.pirates"))
  } else {
  if (lingoBinary("eq", t_iGameMode, 2)) {
  callMethod("changeImageInElement", _me, tWnd, "lms.bonus.pirates", callNamed("member", "lms.bonus"))
  }

  }

  break;
  }

  callMethod("setText", callMethod("getElement", tWnd, "gamewinner"), lingoBinary("joinPad", callNamed("convertToHigherCase", t_sWinner), callNamed("getText", "pirates.win.game")))
  var t_sEndInfo = callNamed("replaceChunks", callNamed("getText", lingoBinary("join", "pirates.endinfo.", t_iEndInfo)), "%teamName%", t_sWinner);
  callMethod("setText", callMethod("getElement", tWnd, "endinfo"), t_sEndInfo)
  if (lingoBinary("eq", callMethod("GetParam", meProp(_me, "m_myShip"), "Team"), a_iWinner)) {
  callMethod("PlayVoiceOver", callMethod("GetSoundPlayer", callMethod("getComponent", _me)), symbol("OwnTeamWins"))
  } else {
  callMethod("PlayVoiceOver", callMethod("GetSoundPlayer", callMethod("getComponent", _me)), symbol("OtherTeamWins"))
  }

  callMethod("hide", callMethod("getElement", tWnd, "pirates.dialog.hd"))
  callMethod("setText", callMethod("getElement", tWnd, "player1"), a_ar_sPlayers[1])
  callMethod("setText", callMethod("getElement", tWnd, "player2"), a_ar_sPlayers[2])
  callMethod("setText", callMethod("getElement", tWnd, "player3"), a_ar_sPlayers[3])
  callMethod("setText", callMethod("getElement", tWnd, "player4"), a_ar_sPlayers[4])
  callMethod("setText", callMethod("getElement", tWnd, "player5"), a_ar_sPlayers[5])
  callMethod("setText", callMethod("getElement", tWnd, "player6"), a_ar_sPlayers[6])
  callMethod("setText", callMethod("getElement", tWnd, "player7"), a_ar_sPlayers[7])
  callMethod("setText", callMethod("getElement", tWnd, "player8"), a_ar_sPlayers[8])
  if (lingoBinary("eq", t_iGameMode, 1)) {
  if ((lingoTruthy(lingoBinary("eq", a_ar_sPlayers[1], "")) ? 0 : 1)) {
  callMethod("setText", callMethod("getElement", tWnd, "player1vault"), a_ar_iScores[1])
  }

  if ((lingoTruthy(lingoBinary("eq", a_ar_sPlayers[2], "")) ? 0 : 1)) {
  callMethod("setText", callMethod("getElement", tWnd, "player2vault"), a_ar_iScores[2])
  }

  if ((lingoTruthy(lingoBinary("eq", a_ar_sPlayers[3], "")) ? 0 : 1)) {
  callMethod("setText", callMethod("getElement", tWnd, "player3vault"), a_ar_iScores[3])
  }

  if ((lingoTruthy(lingoBinary("eq", a_ar_sPlayers[4], "")) ? 0 : 1)) {
  callMethod("setText", callMethod("getElement", tWnd, "player4vault"), a_ar_iScores[4])
  }

  if ((lingoTruthy(lingoBinary("eq", a_ar_sPlayers[5], "")) ? 0 : 1)) {
  callMethod("setText", callMethod("getElement", tWnd, "player5vault"), a_ar_iScores[5])
  }

  if ((lingoTruthy(lingoBinary("eq", a_ar_sPlayers[6], "")) ? 0 : 1)) {
  callMethod("setText", callMethod("getElement", tWnd, "player6vault"), a_ar_iScores[6])
  }

  if ((lingoTruthy(lingoBinary("eq", a_ar_sPlayers[7], "")) ? 0 : 1)) {
  callMethod("setText", callMethod("getElement", tWnd, "player7vault"), a_ar_iScores[7])
  }

  if ((lingoTruthy(lingoBinary("eq", a_ar_sPlayers[8], "")) ? 0 : 1)) {
  callMethod("setText", callMethod("getElement", tWnd, "player8vault"), a_ar_iScores[8])
  }

  if ((lingoTruthy(lingoBinary("eq", a_ar_sPlayers[1], "")) ? 0 : 1)) {
  callMethod("setText", callMethod("getElement", tWnd, "player1bonus"), t_iTeam1FlagBonus)
  }

  if ((lingoTruthy(lingoBinary("eq", a_ar_sPlayers[2], "")) ? 0 : 1)) {
  callMethod("setText", callMethod("getElement", tWnd, "player2bonus"), t_iTeam1FlagBonus)
  }

  if ((lingoTruthy(lingoBinary("eq", a_ar_sPlayers[3], "")) ? 0 : 1)) {
  callMethod("setText", callMethod("getElement", tWnd, "player3bonus"), t_iTeam1FlagBonus)
  }

  if ((lingoTruthy(lingoBinary("eq", a_ar_sPlayers[4], "")) ? 0 : 1)) {
  callMethod("setText", callMethod("getElement", tWnd, "player4bonus"), t_iTeam1FlagBonus)
  }

  if ((lingoTruthy(lingoBinary("eq", a_ar_sPlayers[5], "")) ? 0 : 1)) {
  callMethod("setText", callMethod("getElement", tWnd, "player5bonus"), t_iTeam2FlagBonus)
  }

  if ((lingoTruthy(lingoBinary("eq", a_ar_sPlayers[6], "")) ? 0 : 1)) {
  callMethod("setText", callMethod("getElement", tWnd, "player6bonus"), t_iTeam2FlagBonus)
  }

  if ((lingoTruthy(lingoBinary("eq", a_ar_sPlayers[7], "")) ? 0 : 1)) {
  callMethod("setText", callMethod("getElement", tWnd, "player7bonus"), t_iTeam2FlagBonus)
  }

  if ((lingoTruthy(lingoBinary("eq", a_ar_sPlayers[8], "")) ? 0 : 1)) {
  callMethod("setText", callMethod("getElement", tWnd, "player8bonus"), t_iTeam2FlagBonus)
  }

  callMethod("setText", callMethod("getElement", tWnd, "teamvault.portroyal"), a_ar_iTeamScores[1])
  callMethod("setText", callMethod("getElement", tWnd, "teamvault.pirates"), a_ar_iTeamScores[2])
  } else {
  if (lingoBinary("eq", t_iGameMode, 2)) {
  if ((lingoTruthy(lingoBinary("eq", a_ar_sPlayers[1], "")) ? 0 : 1)) {
  callMethod("setText", callMethod("getElement", tWnd, "player1vault"), lingoBinary("add", a_ar_iScores[1], a_ar_iVaults[1]))
  }

  if ((lingoTruthy(lingoBinary("eq", a_ar_sPlayers[2], "")) ? 0 : 1)) {
  callMethod("setText", callMethod("getElement", tWnd, "player2vault"), lingoBinary("add", a_ar_iScores[2], a_ar_iVaults[2]))
  }

  if ((lingoTruthy(lingoBinary("eq", a_ar_sPlayers[3], "")) ? 0 : 1)) {
  callMethod("setText", callMethod("getElement", tWnd, "player3vault"), lingoBinary("add", a_ar_iScores[3], a_ar_iVaults[3]))
  }

  if ((lingoTruthy(lingoBinary("eq", a_ar_sPlayers[4], "")) ? 0 : 1)) {
  callMethod("setText", callMethod("getElement", tWnd, "player4vault"), lingoBinary("add", a_ar_iScores[4], a_ar_iVaults[4]))
  }

  if ((lingoTruthy(lingoBinary("eq", a_ar_sPlayers[5], "")) ? 0 : 1)) {
  callMethod("setText", callMethod("getElement", tWnd, "player5vault"), lingoBinary("add", a_ar_iScores[5], a_ar_iVaults[5]))
  }

  if ((lingoTruthy(lingoBinary("eq", a_ar_sPlayers[6], "")) ? 0 : 1)) {
  callMethod("setText", callMethod("getElement", tWnd, "player6vault"), lingoBinary("add", a_ar_iScores[6], a_ar_iVaults[6]))
  }

  if ((lingoTruthy(lingoBinary("eq", a_ar_sPlayers[7], "")) ? 0 : 1)) {
  callMethod("setText", callMethod("getElement", tWnd, "player7vault"), lingoBinary("add", a_ar_iScores[7], a_ar_iVaults[7]))
  }

  if ((lingoTruthy(lingoBinary("eq", a_ar_sPlayers[8], "")) ? 0 : 1)) {
  callMethod("setText", callMethod("getElement", tWnd, "player8vault"), lingoBinary("add", a_ar_iScores[8], a_ar_iVaults[8]))
  }

  if (lingoBinary("gt", t_iWinningBonus, 0)) {
  switch (a_iWinner) {
case 1:
  if ((lingoTruthy(lingoBinary("eq", a_ar_sPlayers[1], "")) ? 0 : 1)) {
  callMethod("setText", callMethod("getElement", tWnd, "player1bonus"), lingoBinary("joinPad", t_iWinningBonus, "+"))
  }

  if ((lingoTruthy(lingoBinary("eq", a_ar_sPlayers[2], "")) ? 0 : 1)) {
  callMethod("setText", callMethod("getElement", tWnd, "player2bonus"), lingoBinary("joinPad", t_iWinningBonus, "+"))
  }

  if ((lingoTruthy(lingoBinary("eq", a_ar_sPlayers[3], "")) ? 0 : 1)) {
  callMethod("setText", callMethod("getElement", tWnd, "player3bonus"), lingoBinary("joinPad", t_iWinningBonus, "+"))
  }

  if ((lingoTruthy(lingoBinary("eq", a_ar_sPlayers[4], "")) ? 0 : 1)) {
  callMethod("setText", callMethod("getElement", tWnd, "player4bonus"), lingoBinary("joinPad", t_iWinningBonus, "+"))
  }

  break;
case 2:
  if ((lingoTruthy(lingoBinary("eq", a_ar_sPlayers[5], "")) ? 0 : 1)) {
  callMethod("setText", callMethod("getElement", tWnd, "player5bonus"), lingoBinary("joinPad", t_iWinningBonus, "+"))
  }

  if ((lingoTruthy(lingoBinary("eq", a_ar_sPlayers[6], "")) ? 0 : 1)) {
  callMethod("setText", callMethod("getElement", tWnd, "player6bonus"), lingoBinary("joinPad", t_iWinningBonus, "+"))
  }

  if ((lingoTruthy(lingoBinary("eq", a_ar_sPlayers[7], "")) ? 0 : 1)) {
  callMethod("setText", callMethod("getElement", tWnd, "player7bonus"), lingoBinary("joinPad", t_iWinningBonus, "+"))
  }

  if ((lingoTruthy(lingoBinary("eq", a_ar_sPlayers[8], "")) ? 0 : 1)) {
  callMethod("setText", callMethod("getElement", tWnd, "player8bonus"), lingoBinary("joinPad", t_iWinningBonus, "+"))
  }

  break;
  }

  }

  }

  }

  callMethod("setText", callMethod("getElement", tWnd, "score.portroyal"), a_ar_iTeamWins[1])
  callMethod("setText", callMethod("getElement", tWnd, "score.pirates"), a_ar_iTeamWins[2])
  callNamed("updateStage")
  callMethod("center", tWndObj)
  callMethod("PlayFanfare", callMethod("GetSoundPlayer", callMethod("getComponent", _me)))
}

