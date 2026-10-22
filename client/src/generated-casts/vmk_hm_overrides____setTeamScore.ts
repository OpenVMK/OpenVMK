// vmk_hm_overrides.cct /  / setTeamScore

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setTeamScore(_me: LingoMe, i_score: LingoValue, i_team: LingoValue) {
  var tScore001 = callNamed("integer", lingoBinary("div", lingoBinary("mod", i_team, 1000), 100));
  var t_num100b = callNamed("integer", lingoBinary("div", lingoBinary("mod", i_team, 100), 10));
  var t_num010b = callNamed("integer", lingoBinary("div", lingoBinary("mod", i_team, 10), 1));
  var t_num001b = callNamed("member", lingoBinary("join", "hmb_", tScore001));
  var tScore100 = callNamed("member", lingoBinary("join", "hmb_", t_num100b));
  var tScore010 = callNamed("member", lingoBinary("join", "hmb_", t_num010b));
  if (lingoBinary("eq", i_score, symbol("purple"))) {
  callMethod("SetNumber", _me.m_rClient, _me.m_sWindowName, "ghosts.red.01", tScore010)
  callMethod("SetNumber", _me.m_rClient, _me.m_sWindowName, "ghosts.red.10", tScore100)
  callMethod("SetNumber", _me.m_rClient, _me.m_sWindowName, "ghosts.red.100", t_num001b)
  if (lingoBinary("lt", i_team, 100)) {
  callMethod("hide", callMethod("getElement", callNamed("getWindow", _me.m_sWindowName), "ghosts.red.100"))
  } else {
  callMethod("show", callMethod("getElement", callNamed("getWindow", _me.m_sWindowName), "ghosts.red.100"))
  }

  } else {
  if (lingoBinary("eq", i_score, symbol("green"))) {
  callMethod("SetNumber", _me.m_rClient, _me.m_sWindowName, "ghosts.green.01", tScore010)
  callMethod("SetNumber", _me.m_rClient, _me.m_sWindowName, "ghosts.green.10", tScore100)
  callMethod("SetNumber", _me.m_rClient, _me.m_sWindowName, "ghosts.green.100", t_num001b)
  if (lingoBinary("lt", i_team, 100)) {
  callMethod("hide", callMethod("getElement", callNamed("getWindow", _me.m_sWindowName), "ghosts.green.100"))
  } else {
  callMethod("show", callMethod("getElement", callNamed("getWindow", _me.m_sWindowName), "ghosts.green.100"))
  }

  } else {
  return 0;
  }

  }

}

