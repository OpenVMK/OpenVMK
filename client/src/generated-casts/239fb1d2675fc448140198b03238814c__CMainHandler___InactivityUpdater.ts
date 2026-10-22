// 239fb1d2675fc448140198b03238814c.cct / CMainHandler / _InactivityUpdater

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _InactivityUpdater(_me: LingoMe, _this: LingoValue, t_ar_param: LingoValue) {
  var t = t_ar_param[1];
  var t_iTime = t_ar_param[2];
  if (callNamed("voidp", t)) {
  return 0;
  }

  if (lingoBinary("lt", t_iTime, 0)) {
  t_iTime = 0;
  }

  var t_sTxt = callNamed("getText", "notice.inactivity");
  var t_sHd = callNamed("getText", "notice.hd");
  var t_sBtn = callNamed("getText", "notice.btn.ok");
  var t_rTime = callMethod("int2time", _this, t_iTime);
  if (lingoBinary("lt", t_rTime.s, 10)) {
  setThePropOf(t_rTime, "s", lingoBinary("join", "0", t_rTime.s));
  }

  t_sTxt = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", t_sTxt, "\r"), t_rTime.m), ":"), t_rTime.s);
  callMethod("setText", t, t_sTxt, t_sHd, t_sBtn)
  callNamed("createTimeout", "InactivityAlertTimer", 1000, symbol("_InactivityUpdater"), callMethod("getID", _this), new LingoList([t, lingoBinary("sub", t_iTime, 1)]), 1)
}

