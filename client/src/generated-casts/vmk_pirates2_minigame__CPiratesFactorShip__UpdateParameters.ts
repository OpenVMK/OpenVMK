// vmk_pirates2_minigame.cct / CPiratesFactorShip / UpdateParameters

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateParameters(_me: LingoMe, i_ar_data: LingoValue) {
  /* global */ var g_profShipFactorAcc = globalVar("g_profShipFactorAcc");
  /* global */ var g_profCollisionAcc = globalVar("g_profCollisionAcc");
  callMethod("SetParam", callMethod("getObject", _me), "Velocity", callNamed("intvector", i_ar_data[1], i_ar_data[2], 0))
  callMethod("SetParam", callMethod("getObject", _me), "Health", i_ar_data[3])
  var t = new LingoList([]);
  if (lingoBinary("gt", i_ar_data[4], 0)) {
  t[i_ar_data[4]] = 0;
  }

  callMethod("SetParam", callMethod("getObject", _me), "Ammo", t)
  callMethod("SetParam", callMethod("getObject", _me), "State", i_ar_data[5])
  callMethod("SetParam", callMethod("getObject", _me), "NavigationTarget", callNamed("intvector", i_ar_data[6], i_ar_data[7], 0))
  callMethod("SetParam", callMethod("getObject", _me), "Score", i_ar_data[8])
  callMethod("SetParam", callMethod("getObject", _me), "WhirlpoolSuckState", i_ar_data[9])
  callMethod("SetParam", callMethod("getObject", _me), "Type", i_ar_data[10])
  callMethod("SetParam", callMethod("getObject", _me), "Gold", i_ar_data[11])
}

