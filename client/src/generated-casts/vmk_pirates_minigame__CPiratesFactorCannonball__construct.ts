// vmk_pirates_minigame.cct / CPiratesFactorCannonball / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  /* global */ var g_profCannonballFactorAcc = globalVar("g_profCannonballFactorAcc");
  /* global */ var g_profCollisionAcc = globalVar("g_profCollisionAcc");
  setMeProp(_me, "m_BIT_INVINCIBLE", 1);
  setMeProp(_me, "m_BIT_BROADSIDE", 2);
  setMeProp(_me, "m_BIT_SHRAPNEL", 3);
  return 1;
}

