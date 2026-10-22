// vmk_pirates_minigame.cct / CPiratesFactorShip / SyncGameParameters

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SyncGameParameters(_me: LingoMe) {
  /* global */ var g_profShipFactorAcc = globalVar("g_profShipFactorAcc");
  /* global */ var g_profCollisionAcc = globalVar("g_profCollisionAcc");
  var t_params = new LingoList([]);
  var tVel = callMethod("GetParam", callMethod("getObject", _me), "Velocity");
  t_params[1] = tVel.x;
  t_params[2] = tVel.y;
  t_params[3] = callMethod("GetParam", callMethod("getObject", _me), "Health");
  t_params[4] = callMethod("GetParam", callMethod("getObject", _me), "Ammo");
  t_params[5] = callMethod("GetParam", callMethod("getObject", _me), "State");
  var tNavTarget = callMethod("GetParam", callMethod("getObject", _me), "NavigationTarget");
  t_params[6] = tNavTarget.x;
  t_params[7] = tNavTarget.y;
  t_params[8] = callMethod("GetParam", callMethod("getObject", _me), "Score");
  t_params[9] = callMethod("GetParam", callMethod("getObject", _me), "WhirlpoolSuckState");
  callMethod("SetParam", callMethod("getObject", _me), "GameParams", t_params)
}

