// vmk_pirates_minigame.cct / CPiratesInterface / update

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
  /* global */ var g_gfxCbRed = globalVar("g_gfxCbRed");
  /* global */ var g_gfxCbWhite = globalVar("g_gfxCbWhite");
  /* global */ var g_gfxCbFire = globalVar("g_gfxCbFire");
  /* global */ var g_gfxPickupAmmo = globalVar("g_gfxPickupAmmo");
  /* global */ var g_gfxPickupHealth = globalVar("g_gfxPickupHealth");
  var tt = theProperty("milliSeconds");
  switch (1) {
case callNamed("keyPressed", 123):
  var t_direction = -float(1);
  break;
case callNamed("keyPressed", 124):
  t_direction = 1;
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

  if (lingoBinary("and", lingoBinary("gt", lingoBinary("sub", tt, meProp(_me, "m_mp_shootState").time), meProp(_me, "m_iShootPntrDelay")), lingoBinary("neq", meProp(_me, "m_mp_shootState").state, symbol("none")))) {
  callMethod("MarkShoot", callMethod("GetVisual", meProp(_me, "m_myShip")), symbol("none"))
  setThePropOf(meProp(_me, "m_mp_shootState"), "state", symbol("none"));
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_myShip"))) ? 0 : 1)) {
  var tAmmo = callMethod("GetParam", meProp(_me, "m_myShip"), "Ammo");
  var tHealth = callMethod("GetParam", meProp(_me, "m_myShip"), "Health");
  if (lingoBinary("neq", tAmmo, meProp(_me, "m_lastammo"))) {
  callMethod("setAmmoindicator", meProp(_me, "m_piratesBar"), tAmmo)
  }

  if (lingoBinary("neq", tHealth, meProp(_me, "m_lasthealth"))) {
  callMethod("setHealthIndicator", meProp(_me, "m_piratesBar"), tHealth)
  }

  setMeProp(_me, "m_lastammo", tAmmo);
  setMeProp(_me, "m_lasthealth", tHealth);
  }

  var tScoreBoard = callMethod("GetObjectsByCode", callMethod("getComponent", callNamed("getThread", "minigame")), 9);
  if (lingoBinary("eq", tScoreBoard.count, 1)) {
  var tRedScore = callMethod("GetTeam1Score", callMethod("GetFactor", tScoreBoard[1]));
  var tBlueScore = callMethod("GetTeam2Score", callMethod("GetFactor", tScoreBoard[1]));
  if (lingoBinary("neq", tRedScore, meProp(_me, "m_lastRedScore"))) {
  callMethod("setRedScore", meProp(_me, "m_piratesBar"), tRedScore)
  }

  if (lingoBinary("neq", tBlueScore, meProp(_me, "m_lastBlueScore"))) {
  callMethod("setBlueScore", meProp(_me, "m_piratesBar"), tBlueScore)
  }

  setMeProp(_me, "m_lastRedScore", tRedScore);
  setMeProp(_me, "m_lastBlueScore", tBlueScore);
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_myShip"))) ? 0 : 1)) {
  var tCurPoint = callNamed("intvector", callNamed("InverseAxonometricPosition", theProperty("mouseLoc")).locH, callNamed("InverseAxonometricPosition", theProperty("mouseLoc")).locV, 0);
  if (lingoBinary("and", lingoBinary("or", callMethod("getBroadsideStatus", meProp(_me, "m_piratesBar")), callMethod("IsShootable", callMethod("GetFactor", meProp(_me, "m_myShip")), tCurPoint)), lingoBinary("gt", lingoBinary("sub", tt, meProp(_me, "m_lastShoot")), meProp(_me, "m_shootDelay")))) {
  if (lingoBinary("neq", meProp(_me, "m_rGraphicCursorSprite").member, meProp(_me, "m_shootableCursor"))) {
  setThePropOf(meProp(_me, "m_rGraphicCursorSprite"), "member", meProp(_me, "m_shootableCursor"));
  }

  } else {
  if (lingoBinary("neq", meProp(_me, "m_rGraphicCursorSprite").member, meProp(_me, "m_navigatableCursor"))) {
  setThePropOf(meProp(_me, "m_rGraphicCursorSprite"), "member", meProp(_me, "m_navigatableCursor"));
  }

  }

  setThePropOf(meProp(_me, "m_rGraphicCursorSprite"), "loc", theProperty("mouseLoc"));
  callMethod("MarkMyShip", callMethod("GetVisual", meProp(_me, "m_myShip")), 1)
  callMethod("MarkMyShip", callMethod("GetFactor", meProp(_me, "m_myShip")), 1)
  if (lingoBinary("gt", callMethod("GetParam", meProp(_me, "m_myShip"), "Ammo"), 0)) {
  if (lingoBinary("lte", lingoBinary("sub", tt, meProp(_me, "m_lastShoot")), meProp(_me, "m_shootDelay"))) {
  callMethod("SetReloadStatus", callMethod("GetVisual", meProp(_me, "m_myShip")), lingoBinary("div", callNamed("float", lingoBinary("sub", tt, meProp(_me, "m_lastShoot"))), callNamed("float", meProp(_me, "m_shootDelay"))))
  } else {
  callMethod("SetReloadStatus", callMethod("GetVisual", meProp(_me, "m_myShip")), float(1))
  }

  } else {
  callMethod("SetReloadStatus", callMethod("GetVisual", meProp(_me, "m_myShip")), float(0))
  }

  }

  if (callMethod("GameOn", callMethod("getComponent", _me))) {
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

