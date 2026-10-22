// vmk_pirates2_minigame.cct / CPiratesInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
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
  callNamed("put", lingoBinary("joinPad", callNamed("getSpriteManager").pTotalSprList.count, callNamed("getSpriteManager").pFreeSprList.count))
  setMeProp(_me, "m_prepared", 0);
  setMeProp(_me, "m_bMessageBarInitialized", 0);
  setMeProp(_me, "m_ar_lastClicks", new LingoList([]));
  setMeProp(_me, "m_piratesBar", undefined);
  setMeProp(_me, "m_lasthealth", 0);
  setMeProp(_me, "m_lastammo", 0);
  setMeProp(_me, "m_iGameMode", 0);
  setMeProp(_me, "m_lastRedGold", 0);
  setMeProp(_me, "m_lastBlueGold", 0);
  setMeProp(_me, "m_lastRedVault", 0);
  setMeProp(_me, "m_lastBlueVault", 0);
  setMeProp(_me, "m_iLastTeam1Wins", 0);
  setMeProp(_me, "m_iLastTeam2Wins", 0);
  setMeProp(_me, "m_sMidStageWndTitle", "PiratesMidstage");
  setMeProp(_me, "m_sGameStartString", "");
  setMeProp(_me, "m_sEndGameDialog", "PiratesEndGame");
  setMeProp(_me, "m_sPreGameWndTitle", "PiratesPreGame");
  setMeProp(_me, "m_lastShoot", theProperty("milliSeconds"));
  setMeProp(_me, "m_shootDelay", callNamed("getVariableValue", "interface.shootdelay"));
  setMeProp(_me, "m_dblClickDelay", callNamed("getVariableValue", "interface.dblclickdelay"));
  setMeProp(_me, "m_iShootPntrDelay", callNamed("getVariableValue", "interface.shootpntrdelay"));
  setMeProp(_me, "m_keydownscript", "");
  setMeProp(_me, "m_mousedownscript", "");
  setMeProp(_me, "m_mp_shootState", new LingoPropList([symbol("state"), symbol("none"), symbol("time"), theProperty("milliSeconds")]));
  setMeProp(_me, "m_rTimerDisplay", undefined);
  setMeProp(_me, "m_sKickWarningDlg", "PiratesKickWarning");
  return 1;
}

