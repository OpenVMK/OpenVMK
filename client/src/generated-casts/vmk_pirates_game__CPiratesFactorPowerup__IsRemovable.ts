// vmk_pirates_game.cct / CPiratesFactorPowerup / IsRemovable

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function IsRemovable(_me: LingoMe) {
  /* global */ var g_profCollisionAcc = globalVar("g_profCollisionAcc");
  return meProp(_me, "m_collided");
}

