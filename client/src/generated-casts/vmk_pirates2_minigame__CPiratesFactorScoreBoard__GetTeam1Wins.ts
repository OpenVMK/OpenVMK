// vmk_pirates2_minigame.cct / CPiratesFactorScoreBoard / GetTeam1Wins

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetTeam1Wins(_me: LingoMe) {
  return callMethod("GetParam", callMethod("getObject", _me), "GameParams")[3];
}

