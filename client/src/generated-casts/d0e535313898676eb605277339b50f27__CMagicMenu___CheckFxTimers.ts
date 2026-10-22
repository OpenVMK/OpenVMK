// d0e535313898676eb605277339b50f27.cct / CMagicMenu / _CheckFxTimers

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _CheckFxTimers(_me: LingoMe, _this: LingoValue) {
  if (callNamed("listp", meProp(_me, "m_arAvailableTimes"))) {
  var t_iCount = meProp(_me, "m_arAvailableTimes").count;
  if (lingoBinary("gt", t_iCount, 0)) {
  var t_iUpdateNeeded = 0;
  for (var i = 1; i <= t_iCount; ++i) {
  var t_iTime = meProp(_me, "m_arAvailableTimes")[i];
  meProp(_me, "m_arAvailableTimes")[i] = lingoBinary("sub", t_iTime, 1);
  if (lingoBinary("gt", lingoBinary("sub", t_iTime, 1), 0)) {
  t_iUpdateNeeded = lingoBinary("add", t_iUpdateNeeded, 1);
  }

  }

  if (lingoBinary("and", callNamed("windowExists", meProp(_me, "m_sWindowID")), lingoBinary("neq", meProp(_me, "m_iActiveFx"), meProp(_me, "m_iSelectedFx")))) {
  if (callMethod("findPos", meProp(_me, "m_arAvailableTimes"), callNamed("string", meProp(_me, "m_iSelectedFx")))) {
  var t_rWnd = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.timeout.hd"), symbol("visible"), 1)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.timeout"), symbol("visible"), 1)
  if (callMethod("elementExists", t_rWnd, "magics.timeout")) {
  var t_iCurrentMseconds = meProp(_me, "m_arAvailableTimes")[callNamed("string", meProp(_me, "m_iSelectedFx"))];
  var t_iCurrentMinutes = lingoBinary("div", t_iCurrentMseconds, 60);
  var t_iCurrentSeconds = lingoBinary("mod", t_iCurrentMseconds, 60);
  if (lingoBinary("lt", t_iCurrentSeconds, 10)) {
  t_iCurrentSeconds = lingoBinary("join", "0", t_iCurrentSeconds);
  }

  var t_sTxt = lingoBinary("joinPad", lingoBinary("join", lingoBinary("join", t_iCurrentMinutes, ":"), t_iCurrentSeconds), callNamed("getText", "magics.minutes"));
  callMethod("setText", callMethod("getElement", t_rWnd, "magics.timeout"), t_sTxt)
  }

  }

  }

  if (lingoBinary("neq", t_iUpdateNeeded, t_iCount)) {
  setMeProp(_me, "m_arAvailableTimes", new LingoPropList([]));
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "QueryMagicFx")
  return 1;
  } else {
  callMethod("delay", _this, 1000, symbol("_CheckFxTimers"))
  }

  } else {
  return 0;
  }

  }

}

