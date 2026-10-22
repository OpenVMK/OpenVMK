// vmk_pirates_minigame.cct / CPiratesInterface / DisplayStageEnd

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DisplayStageEnd(_me: LingoMe, a_sTitle: LingoValue, a_ar_sPlayers: LingoValue, a_ar_iScores: LingoValue, a_ar_iTeamScores: LingoValue, a_iCountStart: LingoValue) {
  /* global */ var g_profInterface = globalVar("g_profInterface");
  /* global */ var g_gfxCbNormal = globalVar("g_gfxCbNormal");
  /* global */ var g_gfxCbRed = globalVar("g_gfxCbRed");
  /* global */ var g_gfxCbWhite = globalVar("g_gfxCbWhite");
  /* global */ var g_gfxCbFire = globalVar("g_gfxCbFire");
  /* global */ var g_gfxPickupAmmo = globalVar("g_gfxPickupAmmo");
  /* global */ var g_gfxPickupHealth = globalVar("g_gfxPickupHealth");
  if (callNamed("windowExists", meProp(_me, "m_sMidStageWndTitle"))) {
  callNamed("removeWindow", meProp(_me, "m_sMidStageWndTitle"))
  }

  callNamed("createWindow", meProp(_me, "m_sMidStageWndTitle"), "vmk_pirates_modal.window")
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sMidStageWndTitle"));
  var tWnd = callNamed("getWindow", meProp(_me, "m_sMidStageWndTitle"));
  callMethod("merge", tWnd, "pirates_stageend.window")
  callMethod("hide", callMethod("getElement", tWnd, "pirates.dialog.hd"))
  callMethod("setText", callMethod("getElement", tWnd, "player1"), a_ar_sPlayers[1])
  callMethod("setText", callMethod("getElement", tWnd, "player2"), a_ar_sPlayers[2])
  callMethod("setText", callMethod("getElement", tWnd, "player3"), a_ar_sPlayers[3])
  callMethod("setText", callMethod("getElement", tWnd, "player4"), a_ar_sPlayers[4])
  callMethod("setText", callMethod("getElement", tWnd, "player5"), a_ar_sPlayers[5])
  callMethod("setText", callMethod("getElement", tWnd, "player6"), a_ar_sPlayers[6])
  callMethod("setText", callMethod("getElement", tWnd, "player7"), a_ar_sPlayers[7])
  callMethod("setText", callMethod("getElement", tWnd, "player8"), a_ar_sPlayers[8])
  callMethod("setText", callMethod("getElement", tWnd, "player1score"), a_ar_iScores[1])
  callMethod("setText", callMethod("getElement", tWnd, "player2score"), a_ar_iScores[2])
  callMethod("setText", callMethod("getElement", tWnd, "player3score"), a_ar_iScores[3])
  callMethod("setText", callMethod("getElement", tWnd, "player4score"), a_ar_iScores[4])
  callMethod("setText", callMethod("getElement", tWnd, "player5score"), a_ar_iScores[5])
  callMethod("setText", callMethod("getElement", tWnd, "player6score"), a_ar_iScores[6])
  callMethod("setText", callMethod("getElement", tWnd, "player7score"), a_ar_iScores[7])
  callMethod("setText", callMethod("getElement", tWnd, "player8score"), a_ar_iScores[8])
  callMethod("setText", callMethod("getElement", tWnd, "team1score"), a_ar_iTeamScores[1])
  callMethod("setText", callMethod("getElement", tWnd, "team2score"), a_ar_iTeamScores[2])
  callMethod("center", tWndObj)
}

