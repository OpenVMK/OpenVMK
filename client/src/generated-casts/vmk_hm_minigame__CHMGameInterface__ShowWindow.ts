// vmk_hm_minigame.cct / CHMGameInterface / ShowWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowWindow(_me: LingoMe, t_sWindow: LingoValue, i_rParam: LingoValue) {
  var tPos = callMethod("findPos", meProp(_me, "m_ar_Windows"), t_sWindow);
  if (callNamed("voidp", tPos)) {
  return callNamed("error", _me, "HMG, no such window", symbol("ShowWindow"));
  }

  var t_rWindow = meProp(_me, "m_ar_Windows")[t_sWindow];
  switch (t_sWindow) {
case "UI":
  break;
case "Results":
  break;
case "GetReady":
  callMethod("HideWindow", _me, "Waiting")
  break;
case "GameOver":
  callMethod("HideWindow", _me, "Results")
  break;
case "Waiting":
  callMethod("HideWindow", _me, "Results")
  break;
case "Keys":
  break;
case "Notice":
  callMethod("HideWindow", _me, "Notice")
  break;
  }

  if (callNamed("objectp", t_rWindow)) {
  callMethod("Init", t_rWindow, _me, i_rParam)
  callMethod("show", t_rWindow)
  } else {
  t_rWindow = callNamed("createObject", lingoBinary("join", "HMG WindowContainer ", t_sWindow), lingoBinary("join", "CHMWindow", t_sWindow));
  callMethod("Init", t_rWindow, _me, i_rParam)
  callMethod("show", t_rWindow)
  meProp(_me, "m_ar_Windows")[t_sWindow] = t_rWindow;
  }

}

