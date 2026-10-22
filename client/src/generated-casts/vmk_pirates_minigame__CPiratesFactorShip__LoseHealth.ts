// vmk_pirates_minigame.cct / CPiratesFactorShip / LoseHealth

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LoseHealth(_me: LingoMe) {
  /* global */ var g_profShipFactorAcc = globalVar("g_profShipFactorAcc");
  /* global */ var g_profCollisionAcc = globalVar("g_profCollisionAcc");
  var tHealth = lingoBinary("sub", callMethod("GetParam", callMethod("getObject", _me), "Health"), 1);
  if (lingoBinary("lt", tHealth, 0)) {
  tHealth = 0;
  }

  callMethod("SetParam", callMethod("getObject", _me), "Health", tHealth)
  if (meProp(_me, "m_myShip")) {
  if (lingoBinary("neq", tHealth, 0)) {
  if (lingoBinary("lte", tHealth, 2)) {
  callMethod("PlayVoiceOver", callMethod("GetSoundPlayer", callMethod("getComponent", callNamed("getThread", "piratesminigame"))), symbol("LowHealth"))
  } else {
  callMethod("PlayVoiceOver", callMethod("GetSoundPlayer", callMethod("getComponent", callNamed("getThread", "piratesminigame"))), symbol("OwnShipHit"))
  }

  }

  }

  callMethod("SyncGameParameters", _me)
}

