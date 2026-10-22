// vmk_pirates2_minigame.cct / CPiratesFactorPowerup / SetConstants

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
  var t_ar_param = callMethod("GetParam", callMethod("getObject", _me), "GameParams");
  callMethod("SetParam", callMethod("getObject", _me), "PowerupType", t_ar_param[1])
  callMethod("SetParam", callMethod("getObject", _me), "State", t_ar_param[2])
  callMethod("SetParam", callMethod("getObject", _me), "PowerupAmount", t_ar_param[3])
}

