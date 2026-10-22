// vmk_fireworks_minigame.cct / CFireworksGameInterface / updateScores

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateScores(_me: LingoMe, a_ar_scores: LingoValue) {
  while (lingoBinary("lt", a_ar_scores.count, 3)) {
  callMethod("append", a_ar_scores, new LingoPropList([symbol("ref"), -float(1), symbol("score"), -float(1), symbol("rank"), 0]))
  }

  for (var i = 1; i <= a_ar_scores.count; ++i) {
  var t_rScore = a_ar_scores[i];
  var t_iRef = t_rScore[symbol("ref")];
  if (lingoBinary("eq", t_iRef, -float(1))) {
  var t_sName = "";
  } else {
  t_sName = callMethod("GetAvatarName", callMethod("getComponent", callNamed("getThread", "fireworks")), t_iRef);
  }

  callMethod("showScore", _me, i, t_rScore[symbol("score")], t_rScore[symbol("rank")], t_sName)
  }

}

