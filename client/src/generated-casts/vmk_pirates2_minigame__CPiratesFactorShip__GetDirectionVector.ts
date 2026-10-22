// vmk_pirates2_minigame.cct / CPiratesFactorShip / GetDirectionVector

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetDirectionVector(_me: LingoMe) {
  /* global */ var g_profShipFactorAcc = globalVar("g_profShipFactorAcc");
  /* global */ var g_profCollisionAcc = globalVar("g_profCollisionAcc");
  var tdir = callMethod("GetParam", callMethod("getObject", _me), "Direction");
  return callNamed("intvector", callMethod("GetBaseVelX", callMethod("GetVelocityTable", meProp(_me, "m_rGameEngine")), tdir), callMethod("GetBaseVelY", callMethod("GetVelocityTable", meProp(_me, "m_rGameEngine")), tdir), 0);
}

