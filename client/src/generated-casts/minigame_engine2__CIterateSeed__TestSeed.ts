// minigame_engine2.cct / CIterateSeed / TestSeed

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TestSeed(_me: LingoMe, _this: LingoValue, a_iSeed: LingoValue) {
  for (var i = 1; i <= 1000; ++i) {
  callNamed("put", lingoBinary("joinPad", callMethod("IntToBits", _this, a_iSeed), a_iSeed))
  a_iSeed = callMethod("IterateSeed", _this, a_iSeed);
  }

}

