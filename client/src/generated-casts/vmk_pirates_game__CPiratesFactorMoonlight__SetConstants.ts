// vmk_pirates_game.cct / CPiratesFactorMoonlight / SetConstants

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetConstants(_me: LingoMe) {
  callMethod("SetParam", callMethod("getObject", _me), "BoundsType", symbol("circle"))
  callMethod("SetParam", callMethod("getObject", _me), "BoundingCircleRadius", 5000)
}

