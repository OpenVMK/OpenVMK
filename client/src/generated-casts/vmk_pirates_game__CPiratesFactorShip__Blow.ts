// vmk_pirates_game.cct / CPiratesFactorShip / Blow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Blow(_me: LingoMe) {
  /* global */ var g_profShipFactorAcc = globalVar("g_profShipFactorAcc");
  /* global */ var g_profCollisionAcc = globalVar("g_profCollisionAcc");
  var tstate = callMethod("GetParam", callMethod("getObject", _me), "State");
  tstate = callNamed("ClearBit", tstate, meProp(_me, "m_FLOATINGWRECKBIT"));
  callMethod("SetParam", callMethod("getObject", _me), "State", tstate)
  callMethod("SetParam", callMethod("getObject", _me), "BoundsType", symbol("none"))
}

