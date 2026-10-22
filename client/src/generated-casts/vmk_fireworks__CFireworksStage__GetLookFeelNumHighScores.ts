// vmk_fireworks.cct / CFireworksStage / GetLookFeelNumHighScores

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetLookFeelNumHighScores(_me: LingoMe) {
  return meProp(_me, "m_iLookFeelNumHighScores");
}

