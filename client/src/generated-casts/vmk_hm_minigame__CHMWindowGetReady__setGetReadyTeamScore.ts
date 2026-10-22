// vmk_hm_minigame.cct / CHMWindowGetReady / setGetReadyTeamScore

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setGetReadyTeamScore(_me: LingoMe, i_team: LingoValue, i_score: LingoValue) {
  var t_num01b = callNamed("member", lingoBinary("join", "hm_", i_score));
  switch (i_team) {
case symbol("purple"):
  callMethod("SetNumber", meProp(_me, "m_rClient"), meProp(_me, "m_sWindowName"), "score.red", t_num01b)
  break;
case symbol("green"):
  callMethod("SetNumber", meProp(_me, "m_rClient"), meProp(_me, "m_sWindowName"), "score.green", t_num01b)
  break;
  }

  return 0;
}

