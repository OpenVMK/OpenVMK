// core.old.cct / CFPSTester / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_iFrames", lingoBinary("mod", lingoBinary("add", meProp(_me, "m_iFrames"), 1), theProperty("frameTempo")));
  var t_iTime = lingoBinary("sub", theProperty("milliSeconds"), meProp(_me, "m_iTimerA"));
  var t_rWnd = callNamed("getWindow", meProp(_me, "m_sWndID"));
  callMethod("setText", callMethod("getElement", t_rWnd, "perf_per_frm"), lingoBinary("joinPad", t_iTime, "ms."))
  if (lingoBinary("eq", meProp(_me, "m_iFrames"), 0)) {
  var t_iCurrMs = lingoBinary("sub", theProperty("milliSeconds"), meProp(_me, "m_iTimerB"));
  if (lingoBinary("neq", t_iCurrMs, meProp(_me, "m_iCurrMs"))) {
  setMeProp(_me, "m_iCurrMs", t_iCurrMs);
  callMethod("setText", callMethod("getElement", t_rWnd, "perf_total"), lingoBinary("joinPad", meProp(_me, "m_iCurrMs"), "ms."))
  }

  setMeProp(_me, "m_iTimerB", theProperty("milliSeconds"));
  }

  setMeProp(_me, "m_iTimerA", theProperty("milliSeconds"));
}

