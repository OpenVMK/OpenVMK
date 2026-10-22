// vmk_pirates_minigame.cct / CPiratesFactorCannonball / SetConstants

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetConstants(_me: LingoMe) {
  /* global */ var g_profCannonballFactorAcc = globalVar("g_profCannonballFactorAcc");
  /* global */ var g_profCollisionAcc = globalVar("g_profCollisionAcc");
  callMethod("SetParam", callMethod("getObject", _me), "BoundsType", symbol("point"))
  callMethod("SetParam", callMethod("getObject", _me), "WindAffects", 0)
  callMethod("SetParam", callMethod("getObject", _me), "LastMove", theProperty("milliSeconds"))
  setMeProp(_me, "m_collided", 0);
  setMeProp(_me, "m_rPiratesEngine", callMethod("getComponent", callNamed("getThread", "piratesminigame")));
  setMeProp(_me, "m_rGameEngine", callMethod("getComponent", callNamed("getThread", "minigame")));
}

