// vmk_pirates_minigame.cct / CPiratesBridgeFactor / Kill

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Kill(_me: LingoMe) {
  callMethod("SetParam", callMethod("getObject", _me), "Killed", 1)
}

