// vmk_pirates_game.cct / CPiratesFactorShip / SetSpeedAndHealth

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetSpeedAndHealth(_me: LingoMe) {
  /* global */ var g_profShipFactorAcc = globalVar("g_profShipFactorAcc");
  /* global */ var g_profCollisionAcc = globalVar("g_profCollisionAcc");
  var t_ar_param = callMethod("GetParam", callMethod("getObject", _me), "GameParams");
  var t_iShipSpeed = 666;
  var t_iMaxHealth = 5;
  var t_iMaxAmmo = 5;
  var t_iTurningRate = 14;
  var t_iHealth = 5;
  var t_iShipType = callNamed("integer", t_ar_param[10]);
  switch (t_iShipType) {
case 1:
  t_iShipSpeed = 1024;
  t_iMaxHealth = 3;
  t_iTurningRate = 17;
  break;
case 2:
  t_iShipSpeed = 666;
  t_iMaxHealth = 4;
  t_iTurningRate = 14;
  break;
case 3:
  t_iShipSpeed = 666;
  t_iMaxHealth = 3;
  t_iTurningRate = 14;
  break;
  default:
  t_iShipSpeed = 666;
  t_iMaxHealth = 5;
  t_iTurningRate = 14;
  }

  if (callMethod("IsRowingBoat", _me)) {
  t_iShipSpeed = 444;
  t_iMaxHealth = 0;
  t_iMaxAmmo = 0;
  t_iTurningRate = 14;
  } else {
  }

  var t_iDefaultHealth = callMethod("GetParam", callMethod("getObject", _me), "Health");
  t_iHealth = callNamed("min", t_iMaxHealth, t_iDefaultHealth);
  callMethod("SetParam", callMethod("getObject", _me), "Health", t_iHealth)
  callMethod("SetParam", callMethod("getObject", _me), "MaxHealth", t_iMaxHealth)
  callMethod("SetParam", callMethod("getObject", _me), "Speed", t_iShipSpeed)
  callMethod("SetParam", callMethod("getObject", _me), "MaxAmmo", t_iMaxAmmo)
  callMethod("SetParam", callMethod("getObject", _me), "TurningRate", t_iTurningRate)
  callMethod("SetParam", callMethod("getObject", _me), "Score", t_ar_param[8])
  callMethod("SetParam", callMethod("getObject", _me), "WhirlpoolSuckState", t_ar_param[9])
  callMethod("SetParam", callMethod("getObject", _me), "Type", t_ar_param[10])
  callMethod("SetParam", callMethod("getObject", _me), "Gold", t_ar_param[11])
}

