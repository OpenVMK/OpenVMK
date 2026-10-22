// vmk_pirates2_minigame.cct / CPiratesFactorShip / LoseGold

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LoseGold(_me: LingoMe, a_iAmount: LingoValue) {
  /* global */ var g_profShipFactorAcc = globalVar("g_profShipFactorAcc");
  /* global */ var g_profCollisionAcc = globalVar("g_profCollisionAcc");
  if (lingoBinary("neq", a_iAmount, 0)) {
  var tGold = callMethod("GetParam", callMethod("getObject", _me), "Gold");
  tGold = lingoBinary("sub", tGold, a_iAmount);
  if (lingoBinary("lt", tGold, 0)) {
  tGold = 0;
  }

  callMethod("SetParam", callMethod("getObject", _me), "Gold", tGold)
  callMethod("SyncGameParameters", _me)
  }

}

