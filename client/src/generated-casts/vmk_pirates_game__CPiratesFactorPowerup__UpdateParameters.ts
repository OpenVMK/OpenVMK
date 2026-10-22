// vmk_pirates_game.cct / CPiratesFactorPowerup / UpdateParameters

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateParameters(_me: LingoMe, i_ar_data: LingoValue) {
  /* global */ var g_profCollisionAcc = globalVar("g_profCollisionAcc");
  callMethod("SetParam", callMethod("getObject", _me), "PowerupType", i_ar_data[1])
  callMethod("SetParam", callMethod("getObject", _me), "State", i_ar_data[2])
  callMethod("SetParam", callMethod("getObject", _me), "PowerupAmount", i_ar_data[3])
}

