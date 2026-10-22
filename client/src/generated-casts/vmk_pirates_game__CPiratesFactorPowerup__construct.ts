// vmk_pirates_game.cct / CPiratesFactorPowerup / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  /* global */ var g_profCollisionAcc = globalVar("g_profCollisionAcc");
  setMeProp(_me, "m_rMGE", callMethod("getComponent", callNamed("getThread", "minigame")));
  setMeProp(_me, "m_collided", 0);
  setMeProp(_me, "m_GOLDENBIT", 1);
  return 1;
}

