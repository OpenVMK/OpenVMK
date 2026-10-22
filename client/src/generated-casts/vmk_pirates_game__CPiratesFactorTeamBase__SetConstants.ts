// vmk_pirates_game.cct / CPiratesFactorTeamBase / SetConstants

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetConstants(_me: LingoMe) {
  if (lingoBinary("eq", callMethod("GetParam", callMethod("getObject", _me), "GameParams")[1], 0)) {
  setMeProp(_me, "m_carryingFlag", 0);
  } else {
  setMeProp(_me, "m_carryingFlag", 1);
  }

  callMethod("SetParam", callMethod("getObject", _me), "Killed", 0)
  callMethod("SetParam", callMethod("getObject", _me), "BoundsType", symbol("circle"))
  callMethod("SetParam", callMethod("getObject", _me), "BoundingCircleRadius", 3000)
  callMethod("SetParam", callMethod("getObject", _me), "WindAffects", 0)
  callMethod("setCollisionVisualization", callMethod("GetVisual", callMethod("getObject", _me)), 0)
}

