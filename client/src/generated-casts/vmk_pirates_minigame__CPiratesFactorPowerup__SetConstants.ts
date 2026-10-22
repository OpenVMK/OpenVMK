// vmk_pirates_minigame.cct / CPiratesFactorPowerup / SetConstants

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetConstants(_me: LingoMe) {
  /* global */ var g_profCollisionAcc = globalVar("g_profCollisionAcc");
  callMethod("SetParam", callMethod("getObject", _me), "BoundsType", symbol("circle"))
  callMethod("SetParam", callMethod("getObject", _me), "BoundingCircleRadius", 550)
  callMethod("SetParam", callMethod("getObject", _me), "WindAffects", 1)
  callMethod("setCollisionVisualization", callMethod("GetVisual", callMethod("getObject", _me)), 0)
}

