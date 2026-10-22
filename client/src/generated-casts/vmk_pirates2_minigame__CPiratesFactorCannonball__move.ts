// vmk_pirates2_minigame.cct / CPiratesFactorCannonball / move

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function move(_me: LingoMe) {
  /* global */ var g_profCannonballFactorAcc = globalVar("g_profCannonballFactorAcc");
  /* global */ var g_profCollisionAcc = globalVar("g_profCollisionAcc");
  var tt = theProperty("milliSeconds");
  var t_bSync = callMethod("getSyncState", callMethod("GetMinigameHandler", meProp(_me, "m_rGameEngine")));
  if (t_bSync) {
  var tMyObject = callMethod("getObject", _me);
  callMethod("SetParam", tMyObject, "LastMove", theProperty("milliSeconds"))
  var t_ar_gameParams = callMethod("GetParam", tMyObject, "GameParams");
  var tVelX = t_ar_gameParams[2];
  var tVelY = t_ar_gameParams[3];
  var tPos = callMethod("GetParam", tMyObject, "WorldPosition");
  tPos = callMethod("add", tPos, callNamed("intvector", tVelX, tVelY, 0));
  var tLife = lingoBinary("sub", t_ar_gameParams[4], 1);
  t_ar_gameParams[4] = tLife;
  var tcol = theProperty("milliSeconds");
  var tColliding = 0;
  callMethod("SetParam", tMyObject, "WorldPosition", tPos)
  var tCMap = callMethod("GetCollisionMap", meProp(_me, "m_rPiratesEngine"));
  var tMapHeight = callNamed("TestShipToCMap", callMethod("getObject", _me), tCMap);
  if (lingoBinary("gt", tMapHeight, 3)) {
  setMeProp(_me, "m_collided", 1);
  }

  var m_mp_objects = callMethod("GetAllObjects", meProp(_me, "m_rGameEngine"));
  var tOwnerShip = callMethod("GetMGObject", meProp(_me, "m_rGameEngine"), t_ar_gameParams[1]);
  var tInvincible = callNamed("TestBit", callMethod("GetParam", tMyObject, "State"), meProp(_me, "m_BIT_INVINCIBLE"));
  var tGolden = callNamed("TestBit", callMethod("GetParam", tMyObject, "State"), meProp(_me, "m_BIT_GOLDEN"));
  var t_ar_ships = callMethod("GetObjectsByCode", meProp(_me, "m_rGameEngine"), 1);
  var t_ar_turrets = callMethod("GetObjectsByCode", meProp(_me, "m_rGameEngine"), 4);
  var t_ar_buildings = callMethod("GetObjectsByCode", meProp(_me, "m_rGameEngine"), 5);
  for (var tObj of t_ar_ships.toArray()) {
  if (lingoBinary("neq", tObj, tOwnerShip)) {
  var totallyDestroyed = lingoBinary("and", callNamed("TestBit", callMethod("GetParam", tObj, "State"), 4), (lingoTruthy(callNamed("TestBit", callMethod("GetParam", tObj, "State"), 5)) ? 0 : 1));
  if ((lingoTruthy(totallyDestroyed) ? 0 : 1)) {
  var tShipInvincible = callNamed("TestBit", callMethod("GetParam", tObj, "State"), 6);
  if (lingoBinary("or", lingoBinary("and", (lingoTruthy(tInvincible) ? 0 : 1), (lingoTruthy(tShipInvincible) ? 0 : 1)), lingoBinary("and", tInvincible, tShipInvincible))) {
  if (callMethod("_TestCollision", meProp(_me, "m_rGameEngine"), tMyObject, tObj)) {
  if (tGolden) {
  }

  var tProjPos = callNamed("ProjectAxonometricPosition", callNamed("point", tPos.x, tPos.y));
  callMethod("flash", callMethod("GetVisual", tObj), tProjPos)
  callMethod("CreatePuff", meProp(_me, "m_rPiratesEngine"), tProjPos, "explosion", callMethod("GetNewReference", meProp(_me, "m_rPiratesEngine")))
  setMeProp(_me, "m_collided", 1);
  }

  }

  }

  }

  }

  for (var tObj of t_ar_turrets.toArray()) {
  if (callMethod("_TestCollision", meProp(_me, "m_rGameEngine"), tMyObject, tObj)) {
  setMeProp(_me, "m_collided", 1);
  }

  }

  for (var tObj of t_ar_buildings.toArray()) {
  if (callMethod("_TestCollision", meProp(_me, "m_rGameEngine"), tMyObject, tObj)) {
  setMeProp(_me, "m_collided", 1);
  }

  }

  setGlobal("g_profCollisionAcc", lingoBinary("add", globalVar("g_profCollisionAcc"), lingoBinary("sub", theProperty("milliSeconds"), tcol)));
  callMethod("SetParam", tMyObject, "WorldPosition", tPos)
  callMethod("SetParam", tMyObject, "GameParams", t_ar_gameParams)
  }

  setGlobal("g_profCannonballFactorAcc", lingoBinary("add", globalVar("g_profCannonballFactorAcc"), lingoBinary("sub", theProperty("milliSeconds"), tt)));
}

