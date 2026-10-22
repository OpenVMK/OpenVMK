// vmk_pirates_minigame.cct / CPiratesFactorShip / Shoot

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Shoot(_me: LingoMe) {
  /* global */ var g_profShipFactorAcc = globalVar("g_profShipFactorAcc");
  /* global */ var g_profCollisionAcc = globalVar("g_profCollisionAcc");
  var tAmmo = callMethod("GetParam", callMethod("getObject", _me), "Ammo");
  if (lingoBinary("gt", tAmmo, 0)) {
  tAmmo = lingoBinary("sub", tAmmo, 1);
  callMethod("SetParam", callMethod("getObject", _me), "Ammo", tAmmo)
  return 1;
  }

  return 0;
}

