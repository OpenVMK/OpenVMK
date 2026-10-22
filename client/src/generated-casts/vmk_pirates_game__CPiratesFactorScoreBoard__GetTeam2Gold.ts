// vmk_pirates_game.cct / CPiratesFactorScoreBoard / GetTeam2Gold

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetTeam2Gold(_me: LingoMe) {
  return callMethod("GetParam", callMethod("getObject", _me), "GameParams")[2];
}

