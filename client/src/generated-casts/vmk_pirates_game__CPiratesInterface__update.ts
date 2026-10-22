// vmk_pirates_game.cct / CPiratesInterface / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
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
  var tt = theProperty("milliSeconds");
  switch (1) {
case callNamed("keyPressed", 123):
  var t_direction = -float(1);
  break;
case callNamed("keyPressed", 124):
  t_direction = 1;
  break;
case callNamed("keyPressed", 125):
  t_direction = 2;
  break;
  default:
  t_direction = 0;
  }

  if (lingoBinary("neq", t_direction, 0)) {
  if ((lingoTruthy(meProp(_me, "m_bKeyIsDown")) ? 0 : 1)) {
  callMethod("HandleKeyDown", _me, t_direction)
  setMeProp(_me, "m_bKeyIsDown", 1);
  }

  } else {
  setMeProp(_me, "m_bKeyIsDown", 0);
  }

  if (callNamed("windowExists", meProp(_me, "m_sPreGameWndTitle"))) {
  }

  if (callNamed("voidp", meProp(_me, "m_myShip"))) {
  setMeProp(_me, "m_myShip", callMethod("GetMyShip", _me));
  }

  if (lingoBinary("and", callNamed("objectp", meProp(_me, "m_myShip")), (lingoTruthy(meProp(_me, "m_bMessageBarInitialized")) ? 0 : 1))) {
  callMethod("initMessageBar", _me)
  }

  if (lingoBinary("and", lingoBinary("gt", lingoBinary("sub", tt, meProp(_me, "m_mp_shootState").time), meProp(_me, "m_iShootPntrDelay")), lingoBinary("neq", meProp(_me, "m_mp_shootState").state, symbol("none")))) {
  if (callNamed("objectp", meProp(_me, "m_myShip"))) {
  callMethod("MarkShoot", callMethod("GetVisual", meProp(_me, "m_myShip")), symbol("none"))
  }

  setThePropOf(meProp(_me, "m_mp_shootState"), "state", symbol("none"));
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_myShip"))) ? 0 : 1)) {
  var tAmmo = callMethod("GetParam", meProp(_me, "m_myShip"), "Ammo");
  var tHealth = callMethod("GetParam", meProp(_me, "m_myShip"), "Health");
  if (lingoBinary("neq", tAmmo.count, meProp(_me, "m_lastammo"))) {
  callMethod("setAmmoindicator", meProp(_me, "m_piratesBar"), tAmmo)
  }

  if (lingoBinary("neq", tHealth, meProp(_me, "m_lasthealth"))) {
  callMethod("setHealthIndicator", meProp(_me, "m_piratesBar"), tHealth)
  }

  setMeProp(_me, "m_lastammo", tAmmo.count);
  setMeProp(_me, "m_lasthealth", tHealth);
  }

  var tScoreBoard = callMethod("GetObjectsByCode", callMethod("getComponent", callNamed("getThread", "minigame")), 9);
  if (lingoBinary("eq", tScoreBoard.count, 1)) {
  if (callNamed("objectp", callMethod("GetFactor", tScoreBoard[1]))) {
  var t_iGameMode = callMethod("GetGameMode", callMethod("getComponent", _me));
  var tRedGold = 0;
  var tRedVault = 0;
  var tBlueGold = 0;
  var tBlueVault = 0;
  if (lingoBinary("eq", t_iGameMode, 1)) {
  tRedGold = callMethod("GetTeam1Gold", callMethod("GetFactor", tScoreBoard[1]));
  tBlueGold = callMethod("GetTeam2Gold", callMethod("GetFactor", tScoreBoard[1]));
  tRedVault = lingoBinary("add", callMethod("GetTeam1Score", callMethod("GetFactor", tScoreBoard[1])), tRedGold);
  tBlueVault = lingoBinary("add", callMethod("GetTeam2Score", callMethod("GetFactor", tScoreBoard[1])), tBlueGold);
  if (lingoBinary("neq", tRedGold, meProp(_me, "m_lastRedGold"))) {
  callMethod("setRedScore", meProp(_me, "m_piratesBar"), tRedGold)
  }

  if (lingoBinary("neq", tBlueGold, meProp(_me, "m_lastBlueGold"))) {
  callMethod("setBlueScore", meProp(_me, "m_piratesBar"), tBlueGold)
  }

  if (lingoBinary("neq", tRedVault, meProp(_me, "m_lastRedVault"))) {
  callMethod("setRedVault", meProp(_me, "m_piratesBar"), tRedVault)
  }

  if (lingoBinary("neq", tBlueVault, meProp(_me, "m_lastBlueVault"))) {
  callMethod("setBlueVault", meProp(_me, "m_piratesBar"), tBlueVault)
  }

  } else {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_myShip"))) ? 0 : 1)) {
  tRedGold = callMethod("GetParam", meProp(_me, "m_myShip"), "Gold");
  tRedVault = callMethod("GetParam", meProp(_me, "m_myShip"), "Score");
  }

  if (lingoBinary("neq", tRedGold, meProp(_me, "m_lastRedGold"))) {
  callMethod("setRedScore", meProp(_me, "m_piratesBar"), tRedGold)
  }

  if (lingoBinary("neq", tRedVault, meProp(_me, "m_lastRedVault"))) {
  callMethod("setRedVault", meProp(_me, "m_piratesBar"), tRedVault)
  }

  }

  setMeProp(_me, "m_lastRedGold", tRedGold);
  setMeProp(_me, "m_lastBlueGold", tBlueGold);
  setMeProp(_me, "m_lastRedVault", tRedVault);
  setMeProp(_me, "m_lastBlueVault", tBlueVault);
  var t_iTeam1Wins = callMethod("GetTeam1Wins", callMethod("GetFactor", tScoreBoard[1]));
  var t_iTeam2Wins = callMethod("GetTeam2Wins", callMethod("GetFactor", tScoreBoard[1]));
  if (lingoBinary("neq", t_iTeam1Wins, meProp(_me, "m_iLastTeam1Wins"))) {
  callMethod("SetTeam1Wins", meProp(_me, "m_piratesBar"), t_iTeam1Wins, t_iTeam2Wins)
  }

  if (lingoBinary("neq", t_iTeam2Wins, meProp(_me, "m_iLastTeam2Wins"))) {
  callMethod("SetTeam2Wins", meProp(_me, "m_piratesBar"), t_iTeam2Wins, t_iTeam1Wins)
  }

  setMeProp(_me, "m_iLastTeam1Wins", t_iTeam1Wins);
  setMeProp(_me, "m_iLastTeam2Wins", t_iTeam2Wins);
  }

  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_myShip"))) ? 0 : 1)) {
  var tCurPoint = callNamed("intvector", callNamed("InverseAxonometricPosition", theProperty("mouseLoc")).locH, callNamed("InverseAxonometricPosition", theProperty("mouseLoc")).locV, 0);
  if (lingoBinary("and", lingoBinary("or", callMethod("getBroadsideStatus", meProp(_me, "m_piratesBar")), callMethod("IsShootable", callMethod("GetFactor", meProp(_me, "m_myShip")), tCurPoint)), lingoBinary("gt", lingoBinary("sub", tt, meProp(_me, "m_lastShoot")), meProp(_me, "m_shootDelay")))) {
  if (lingoBinary("neq", meProp(_me, "m_rGraphicCursorSprite").member, meProp(_me, "m_shootableCursor"))) {
  setThePropOf(meProp(_me, "m_rGraphicCursorSprite"), "member", meProp(_me, "m_shootableCursor"));
  setThePropOf(meProp(_me, "m_rGraphicCursorSprite"), "width", meProp(_me, "m_shootableCursor").width);
  setThePropOf(meProp(_me, "m_rGraphicCursorSprite"), "height", meProp(_me, "m_shootableCursor").height);
  }

  } else {
  if (lingoBinary("neq", meProp(_me, "m_rGraphicCursorSprite").member, meProp(_me, "m_navigatableCursor"))) {
  setThePropOf(meProp(_me, "m_rGraphicCursorSprite"), "member", meProp(_me, "m_navigatableCursor"));
  setThePropOf(meProp(_me, "m_rGraphicCursorSprite"), "width", meProp(_me, "m_navigatableCursor").width);
  setThePropOf(meProp(_me, "m_rGraphicCursorSprite"), "height", meProp(_me, "m_navigatableCursor").height);
  }

  }

  setThePropOf(meProp(_me, "m_rGraphicCursorSprite"), "loc", theProperty("mouseLoc"));
  callMethod("MarkMyShip", callMethod("GetVisual", meProp(_me, "m_myShip")), 1)
  callMethod("MarkMyShip", callMethod("GetFactor", meProp(_me, "m_myShip")), 1)
  if (lingoBinary("gt", callMethod("GetParam", meProp(_me, "m_myShip"), "Ammo").count, 0)) {
  if (lingoBinary("lte", lingoBinary("sub", tt, meProp(_me, "m_lastShoot")), meProp(_me, "m_shootDelay"))) {
  callMethod("SetReloadStatus", callMethod("GetVisual", meProp(_me, "m_myShip")), lingoBinary("div", callNamed("float", lingoBinary("sub", tt, meProp(_me, "m_lastShoot"))), callNamed("float", meProp(_me, "m_shootDelay"))))
  } else {
  callMethod("SetReloadStatus", callMethod("GetVisual", meProp(_me, "m_myShip")), float(1))
  }

  } else {
  callMethod("SetReloadStatus", callMethod("GetVisual", meProp(_me, "m_myShip")), float(0))
  }

  }

  if (callMethod("gameOn", callMethod("getComponent", _me))) {
  if (lingoBinary("gt", meProp(_me, "m_ar_lastClicks").count, 0)) {
  if (lingoBinary("gt", lingoBinary("sub", theProperty("milliSeconds"), meProp(_me, "m_ar_lastClicks")[1].time), meProp(_me, "m_dblClickDelay"))) {
  while (lingoBinary("gt", meProp(_me, "m_ar_lastClicks").count, 0)) {
  if (lingoBinary("gt", meProp(_me, "m_ar_lastClicks").count, 1)) {
  callMethod("dblClick", _me, meProp(_me, "m_ar_lastClicks")[2].loc)
  callMethod("deleteAt", meProp(_me, "m_ar_lastClicks"), 1)
  callMethod("deleteAt", meProp(_me, "m_ar_lastClicks"), 1)
  continue;
  }

  callMethod("singleClick", _me, meProp(_me, "m_ar_lastClicks")[1].loc)
  callMethod("deleteAt", meProp(_me, "m_ar_lastClicks"), 1)
  }

  setMeProp(_me, "m_ar_lastClicks", new LingoList([]));
  }

  if ((lingoTruthy(callNamed("timeoutExists", "HideIdleWarning")) ? 0 : 1)) {
  callNamed("createTimeout", "HideIdleWarning", 700, symbol("HideIdleKickWarning"), callMethod("getID", _me), undefined, 1)
  }

  }

  }

  setGlobal("g_profInterface", lingoBinary("sub", theProperty("milliSeconds"), tt));
}

