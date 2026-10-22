// vmk_casual.cct / CCasualGameEngine / GameEnd

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GameEnd(_me: LingoMe, _this: LingoValue, a_iWinnerRef: LingoValue, a_rMsg: LingoValue) {
  callNamed("put", "CCasualGameEngine::GameEnd")
}

