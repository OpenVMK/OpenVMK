// vmk_pirates_game.cct / CPiratesFactorPowerup / SyncGameParameters

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SyncGameParameters(_me: LingoMe) {
  /* global */ var g_profCollisionAcc = globalVar("g_profCollisionAcc");
  var t_params = new LingoList([]);
  t_params[1] = callMethod("GetParam", callMethod("getObject", _me), "PowerupType");
  t_params[2] = callMethod("GetParam", callMethod("getObject", _me), "State");
  t_params[3] = callMethod("GetParam", callMethod("getObject", _me), "PowerupAmount");
  callMethod("SetParam", callMethod("getObject", _me), "GameParams", t_params)
}

