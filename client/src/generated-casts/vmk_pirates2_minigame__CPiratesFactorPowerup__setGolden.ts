// vmk_pirates2_minigame.cct / CPiratesFactorPowerup / setGolden

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setGolden(_me: LingoMe, a_bGolden: LingoValue) {
  /* global */ var g_profCollisionAcc = globalVar("g_profCollisionAcc");
  var tstate = callMethod("GetParam", callMethod("getObject", _me), "State");
  if (a_bGolden) {
  tstate = callNamed("SetBit", tstate, meProp(_me, "m_GOLDENBIT"));
  } else {
  tstate = callNamed("SetBit", tstate, meProp(_me, "m_GOLDENBIT"));
  }

  callMethod("SetParam", callMethod("getObject", _me), "State", tstate)
}

