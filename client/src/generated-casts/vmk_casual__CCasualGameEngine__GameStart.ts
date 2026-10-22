// vmk_casual.cct / CCasualGameEngine / GameStart

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GameStart(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  callNamed("put", "CCasualGameEngine::GameStart")
}

