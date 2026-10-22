// vmk_pirates_minigame.cct / CPiratesFactorPowerup / move

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function move(_me: LingoMe) {
  /* global */ var g_profCollisionAcc = globalVar("g_profCollisionAcc");
  if (callMethod("getSyncState", meProp(_me, "m_rMGE"))) {
  var tcol = theProperty("milliSeconds");
  var t_mp_ships = callMethod("GetObjectsByCode", meProp(_me, "m_rMGE"), 1);
  for (var tShip of t_mp_ships.toArray()) {
  if ((lingoTruthy(callNamed("TestBit", callMethod("GetParam", tShip, "State"), 4)) ? 0 : 1)) {
  if (callMethod("_TestCollision", meProp(_me, "m_rMGE"), callMethod("getObject", _me), tShip)) {
  setMeProp(_me, "m_collided", 1);
  }

  }

  }

  setGlobal("g_profCollisionAcc", lingoBinary("add", globalVar("g_profCollisionAcc"), lingoBinary("sub", theProperty("milliSeconds"), tcol)));
  }

}

