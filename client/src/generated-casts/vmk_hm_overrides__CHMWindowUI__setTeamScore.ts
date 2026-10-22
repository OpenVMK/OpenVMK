// vmk_hm_overrides.cct / CHMWindowUI / setTeamScore

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setTeamScore(_me: LingoMe, i_team: LingoValue, i_score: LingoValue) {
  var tScore100 = callNamed("integer", lingoBinary("div", lingoBinary("mod", i_score, 1000), 100));
  var tScore010 = callNamed("integer", lingoBinary("div", lingoBinary("mod", i_score, 100), 10));
  var tScore001 = callNamed("integer", lingoBinary("div", lingoBinary("mod", i_score, 10), 1));
  var t_num100b = callNamed("member", lingoBinary("join", "hmb_", tScore100));
  var t_num010b = callNamed("member", lingoBinary("join", "hmb_", tScore010));
  var t_num001b = callNamed("member", lingoBinary("join", "hmb_", tScore001));
  if (lingoBinary("eq", i_team, symbol("purple"))) {
  callMethod("SetNumber", _me.m_rClient, _me.m_sWindowName, "ghosts.red.01", t_num001b)
  callMethod("SetNumber", _me.m_rClient, _me.m_sWindowName, "ghosts.red.10", t_num010b)
  callMethod("SetNumber", _me.m_rClient, _me.m_sWindowName, "ghosts.red.100", t_num100b)
  if (lingoBinary("lt", i_score, 100)) {
  callMethod("hide", callMethod("getElement", callNamed("getWindow", _me.m_sWindowName), "ghosts.red.100"))
  } else {
  callMethod("show", callMethod("getElement", callNamed("getWindow", _me.m_sWindowName), "ghosts.red.100"))
  }

  } else {
  if (lingoBinary("eq", i_team, symbol("green"))) {
  callMethod("SetNumber", _me.m_rClient, _me.m_sWindowName, "ghosts.green.01", t_num001b)
  callMethod("SetNumber", _me.m_rClient, _me.m_sWindowName, "ghosts.green.10", t_num010b)
  callMethod("SetNumber", _me.m_rClient, _me.m_sWindowName, "ghosts.green.100", t_num100b)
  if (lingoBinary("lt", i_score, 100)) {
  callMethod("hide", callMethod("getElement", callNamed("getWindow", _me.m_sWindowName), "ghosts.green.100"))
  } else {
  callMethod("show", callMethod("getElement", callNamed("getWindow", _me.m_sWindowName), "ghosts.green.100"))
  }

  } else {
  return 0;
  }

  }

}

