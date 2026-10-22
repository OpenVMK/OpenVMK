// vmk_pirates_game.cct / CPiratesFactorShip / SetNavigationTarget

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetNavigationTarget(_me: LingoMe, i_iX: LingoValue, i_iY: LingoValue) {
  /* global */ var g_profShipFactorAcc = globalVar("g_profShipFactorAcc");
  /* global */ var g_profCollisionAcc = globalVar("g_profCollisionAcc");
  callMethod("SetParam", callMethod("getObject", _me), "NavigationTarget", callNamed("intvector", i_iX, i_iY, 0))
  var tstate = callMethod("GetParam", callMethod("getObject", _me), "State");
  tstate = callNamed("SetBit", tstate, meProp(_me, "m_MOVEBIT"));
  tstate = callNamed("ClearBit", tstate, meProp(_me, "m_SHOOTBIT"));
  callMethod("SetParam", callMethod("getObject", _me), "State", tstate)
}

