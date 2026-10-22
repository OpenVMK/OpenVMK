// vmk_hm_overrides.cct /  / SetTimerDisplay

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetTimerDisplay(_me: LingoMe, a_iSecondsLeft: LingoValue) {
  if (lingoBinary("eq", a_iSecondsLeft, 10)) {
  callNamed("executeMessage", "PlayInterfaceSound", "HMG-bell")
  callMethod("ShowWindow", _me.m_rClient, "Notice", "hurry up")
  }

  if (lingoBinary("gt", a_iSecondsLeft, 30)) {
  callMethod("SetNumber", _me.m_rClient, _me.m_sWindowName, "time.green", callNamed("member", "time.green"))
  } else {
  callMethod("SetNumber", _me.m_rClient, _me.m_sWindowName, "time.green", callNamed("member", "time.red"))
  }

  var tMinutes = lingoBinary("div", a_iSecondsLeft, 60);
  var tSeconds = lingoBinary("sub", a_iSecondsLeft, lingoBinary("mul", 60, tMinutes));
  if (lingoBinary("lt", tMinutes, 10)) {
  callMethod("SetNumber", _me.m_rClient, _me.m_sWindowName, "time.minutes", callNamed("member", lingoBinary("join", "hm_", tMinutes)))
  } else {
  callMethod("SetNumber", _me.m_rClient, _me.m_sWindowName, "time.minutes", callNamed("member", "hm_9"))
  }

  var tSec10 = lingoBinary("div", tSeconds, 10);
  var tSec01 = lingoBinary("sub", tSeconds, lingoBinary("mul", 10, tSec10));
  callMethod("SetNumber", _me.m_rClient, _me.m_sWindowName, "time.seconds.10", callNamed("member", lingoBinary("join", "hm_", tSec10)))
  callMethod("SetNumber", _me.m_rClient, _me.m_sWindowName, "time.seconds.01", callNamed("member", lingoBinary("join", "hm_", tSec01)))
}

