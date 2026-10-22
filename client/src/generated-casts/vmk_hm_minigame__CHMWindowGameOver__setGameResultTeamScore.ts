// vmk_hm_minigame.cct / CHMWindowGameOver / setGameResultTeamScore

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setGameResultTeamScore(_me: LingoMe, i_team: LingoValue, i_score: LingoValue) {
  var tScore100 = callNamed("integer", lingoBinary("div", lingoBinary("mod", i_score, 1000), 100));
  var tScore010 = callNamed("integer", lingoBinary("div", lingoBinary("mod", i_score, 100), 10));
  var tScore001 = callNamed("integer", lingoBinary("div", lingoBinary("mod", i_score, 10), 1));
  var t_num100b = callNamed("member", lingoBinary("join", "hm_", tScore100));
  var t_num010b = callNamed("member", lingoBinary("join", "hm_", tScore010));
  var t_num001b = callNamed("member", lingoBinary("join", "hm_", tScore001));
  switch (i_team) {
case symbol("green"):
  callMethod("SetNumber", meProp(_me, "m_rClient"), meProp(_me, "m_sWindowName"), "ghosts.green.01", t_num001b)
  callMethod("SetNumber", meProp(_me, "m_rClient"), meProp(_me, "m_sWindowName"), "ghosts.green.10", t_num010b)
  callMethod("SetNumber", meProp(_me, "m_rClient"), meProp(_me, "m_sWindowName"), "ghosts.green.100", t_num100b)
  break;
case symbol("purple"):
  callMethod("SetNumber", meProp(_me, "m_rClient"), meProp(_me, "m_sWindowName"), "ghosts.red.01", t_num001b)
  callMethod("SetNumber", meProp(_me, "m_rClient"), meProp(_me, "m_sWindowName"), "ghosts.red.10", t_num010b)
  callMethod("SetNumber", meProp(_me, "m_rClient"), meProp(_me, "m_sWindowName"), "ghosts.red.100", t_num100b)
  break;
  }

  return 0;
}

