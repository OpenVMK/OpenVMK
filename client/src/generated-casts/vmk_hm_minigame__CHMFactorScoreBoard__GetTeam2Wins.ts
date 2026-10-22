// vmk_hm_minigame.cct / CHMFactorScoreBoard / GetTeam2Wins

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetTeam2Wins(_me: LingoMe) {
  return callMethod("GetParam", callMethod("getObject", _me), "GameParams")[4];
}

