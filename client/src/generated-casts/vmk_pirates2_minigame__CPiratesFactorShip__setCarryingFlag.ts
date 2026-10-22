// vmk_pirates2_minigame.cct / CPiratesFactorShip / setCarryingFlag

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setCarryingFlag(_me: LingoMe, a_bFlagOnShip: LingoValue, a_bOwnFlag: LingoValue) {
  /* global */ var g_profShipFactorAcc = globalVar("g_profShipFactorAcc");
  /* global */ var g_profCollisionAcc = globalVar("g_profCollisionAcc");
  var tstate = callMethod("GetParam", callMethod("getObject", _me), "State");
  if (a_bFlagOnShip) {
  if (a_bOwnFlag) {
  tstate = callNamed("SetBit", tstate, meProp(_me, "m_CARRYINGOWNFLAGBIT"));
  } else {
  tstate = callNamed("SetBit", tstate, meProp(_me, "m_CARRYINGENEMYFLAGBIT"));
  }

  } else {
  if (a_bOwnFlag) {
  tstate = callNamed("ClearBit", tstate, meProp(_me, "m_CARRYINGOWNFLAGBIT"));
  } else {
  tstate = callNamed("ClearBit", tstate, meProp(_me, "m_CARRYINGENEMYFLAGBIT"));
  }

  }

  callMethod("SetParam", callMethod("getObject", _me), "State", tstate)
}

