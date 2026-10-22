// vmk_hm_overrides.cct /  / SetTeamWins

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetTeamWins(_me: LingoMe, i_score: LingoValue, i_team: LingoValue) {
  var t_num01b = callNamed("member", lingoBinary("join", "hm_", i_team));
  if (lingoBinary("eq", i_score, symbol("purple"))) {
  callMethod("SetNumber", _me.m_rClient, _me.m_sWindowName, "score.red", t_num01b)
  } else {
  if (lingoBinary("eq", i_score, symbol("green"))) {
  callMethod("SetNumber", _me.m_rClient, _me.m_sWindowName, "score.green", t_num01b)
  } else {
  return 0;
  }

  }

}

