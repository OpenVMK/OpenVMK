// vmk_pirates2_minigame.cct / CPiratesFactorShip / setRowingBoat

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setRowingBoat(_me: LingoMe, a_bRowingBoat: LingoValue) {
  /* global */ var g_profShipFactorAcc = globalVar("g_profShipFactorAcc");
  /* global */ var g_profCollisionAcc = globalVar("g_profCollisionAcc");
  var tstate = callMethod("GetParam", callMethod("getObject", _me), "State");
  if (a_bRowingBoat) {
  tstate = callNamed("SetBit", tstate, meProp(_me, "m_ROWINGBOATBIT"));
  } else {
  tstate = callNamed("ClearBit", tstate, meProp(_me, "m_ROWINGBOATBIT"));
  }

  callMethod("SetParam", callMethod("getObject", _me), "State", tstate)
  callMethod("SetSpeedAndHealth", _me)
}

