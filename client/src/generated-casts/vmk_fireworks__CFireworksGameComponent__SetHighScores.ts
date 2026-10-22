// vmk_fireworks.cct / CFireworksGameComponent / SetHighScores

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetHighScores(_me: LingoMe, tNewRank: LingoValue, tScoreList: LingoValue) {
  setMeProp(_me, "m_iRank", tNewRank);
  setMeProp(_me, "m_ar_scoreList", tScoreList);
}

