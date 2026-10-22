// vmk_pirates_minigame.cct / CPiratesFactorShip / TestCollision

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TestCollision(_me: LingoMe) {
  /* global */ var g_profShipFactorAcc = globalVar("g_profShipFactorAcc");
  /* global */ var g_profCollisionAcc = globalVar("g_profCollisionAcc");
  var tMyObject = callMethod("getObject", _me);
  var tstate = callMethod("GetParam", tMyObject, "State");
  var tCMap = callMethod("GetCollisionMap", callMethod("getComponent", callNamed("getThread", "piratesminigame")));
  if ((lingoTruthy(callNamed("voidp", tCMap)) ? 0 : 1)) {
  var tMapHeight = callNamed("TestShipToCMap", tMyObject, tCMap);
  if (lingoBinary("or", lingoBinary("eq", tMapHeight, 0), lingoBinary("eq", tMapHeight, -float(1)))) {
  } else {
  if (lingoBinary("eq", tMapHeight, 1)) {
  } else {
  if (lingoBinary("gt", tMapHeight, 1)) {
  return 1;
  }

  }

  }

  } else {
  callNamed("error", _me, "Collision Map Data is missing!!", symbol("move"))
  }

  var t_ar_ships = callMethod("GetObjectsByCode", meProp(_me, "m_rGameEngine"), 1);
  for (var tObj of t_ar_ships.toArray()) {
  if (lingoBinary("neq", tObj, tMyObject)) {
  var tShipNotCollidable = lingoBinary("and", callNamed("TestBit", callMethod("GetParam", tObj, "State"), meProp(_me, "m_DESTROYEDBIT")), (lingoTruthy(callNamed("TestBit", callMethod("GetParam", tObj, "State"), meProp(_me, "m_FLOATINGWRECKBIT"))) ? 0 : 1));
  if ((lingoTruthy(tShipNotCollidable) ? 0 : 1)) {
  if (callMethod("_TestCollision", meProp(_me, "m_rGameEngine"), tMyObject, tObj)) {
  return 1;
  }

  }

  }

  }

  return 0;
}

