// vmk_pirates2_minigame.cct / CPiratesFactorShip / isCarryingFlag

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function isCarryingFlag(_me: LingoMe) {
  /* global */ var g_profShipFactorAcc = globalVar("g_profShipFactorAcc");
  /* global */ var g_profCollisionAcc = globalVar("g_profCollisionAcc");
  var tstate = callMethod("GetParam", callMethod("getObject", _me), "State");
  return lingoBinary("or", callNamed("TestBit", tstate, meProp(_me, "m_CARRYINGOWNFLAGBIT")), callNamed("TestBit", tstate, meProp(_me, "m_CARRYINGENEMYFLAGBIT")));
}

