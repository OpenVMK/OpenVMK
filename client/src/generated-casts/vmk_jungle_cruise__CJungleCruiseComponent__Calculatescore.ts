// vmk_jungle_cruise.cct / CJungleCruiseComponent / Calculatescore

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Calculatescore(_me: LingoMe, a_ar_hits: LingoValue) {
  var SCORE_MULTIPLIER = 1;
  var tScore = 0;
  for (var tHit of a_ar_hits.toArray()) {
  tScore = lingoBinary("add", tScore, lingoBinary("div", lingoBinary("mul", lingoBinary("mul", SCORE_MULTIPLIER, meProp(_me, "m_ar_animalscores")[callMethod("GetAnimalID", meProp(_me, "m_animalMgr"), tHit.ref)]), lingoBinary("add", tHit.accuracy, tHit.time)), 200));
  }

  return tScore;
}

