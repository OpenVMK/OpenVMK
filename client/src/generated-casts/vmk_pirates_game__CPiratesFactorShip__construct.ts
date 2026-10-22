// vmk_pirates_game.cct / CPiratesFactorShip / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  /* global */ var g_profShipFactorAcc = globalVar("g_profShipFactorAcc");
  /* global */ var g_profCollisionAcc = globalVar("g_profCollisionAcc");
  setMeProp(_me, "m_rGameEngine", callNamed("getObject", symbol("minigame_component")));
  setMeProp(_me, "m_rPiratesEngine", callNamed("getObject", symbol("piratesminigame_component")));
  setMeProp(_me, "m_lastTime", theProperty("milliSeconds"));
  setMeProp(_me, "m_MOVEBIT", 1);
  setMeProp(_me, "m_SLOWBIT", 2);
  setMeProp(_me, "m_SHOOTBIT", 3);
  setMeProp(_me, "m_DESTROYEDBIT", 4);
  setMeProp(_me, "m_FLOATINGWRECKBIT", 5);
  setMeProp(_me, "m_INVINCIBILITYBIT", 6);
  setMeProp(_me, "m_CARRYINGOWNFLAGBIT", 7);
  setMeProp(_me, "m_ROWINGBOATBIT", 8);
  setMeProp(_me, "m_CARRYINGENEMYFLAGBIT", 9);
  setMeProp(_me, "m_myShip", 0);
  setMeProp(_me, "m_a3_ws", callNamed("value", callNamed("getMember", "wp3suck").text));
  return 1;
}

