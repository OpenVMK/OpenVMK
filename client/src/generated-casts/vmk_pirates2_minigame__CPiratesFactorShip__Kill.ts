// vmk_pirates2_minigame.cct / CPiratesFactorShip / Kill

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Kill(_me: LingoMe) {
  /* global */ var g_profShipFactorAcc = globalVar("g_profShipFactorAcc");
  /* global */ var g_profCollisionAcc = globalVar("g_profCollisionAcc");
  var tstate = callMethod("GetParam", callMethod("getObject", _me), "State");
  tstate = callNamed("SetBit", tstate, meProp(_me, "m_FLOATINGWRECKBIT"));
  tstate = callNamed("SetBit", tstate, meProp(_me, "m_DESTROYEDBIT"));
  callMethod("SetParam", callMethod("getObject", _me), "State", tstate)
  callMethod("SetParam", callMethod("getObject", _me), "Health", -float(1))
  if (meProp(_me, "m_myShip")) {
  callMethod("PlayVoiceOver", callMethod("GetSoundPlayer", callMethod("getComponent", callNamed("getThread", "piratesminigame"))), symbol("Death"))
  }

}

