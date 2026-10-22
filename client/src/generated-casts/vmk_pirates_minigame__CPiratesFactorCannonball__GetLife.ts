// vmk_pirates_minigame.cct / CPiratesFactorCannonball / GetLife

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetLife(_me: LingoMe) {
  /* global */ var g_profCannonballFactorAcc = globalVar("g_profCannonballFactorAcc");
  /* global */ var g_profCollisionAcc = globalVar("g_profCollisionAcc");
  return callMethod("GetParam", callMethod("getObject", _me), "GameParams")[4];
}

