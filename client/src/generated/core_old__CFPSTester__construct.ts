// core.old.cct / CFPSTester / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_sWndID", "PerfTest");
  setMeProp(_me, "m_iTimerA", theProperty("milliSeconds"));
  setMeProp(_me, "m_iTimerB", theProperty("milliSeconds"));
  setMeProp(_me, "m_iFrames", 0);
  setMeProp(_me, "m_iCurrMs", 0);
  if (!lingoTruthy(callNamed("createWindow", meProp(_me, "m_sWndID")))) {
  return 0;
  }

  var t_rWnd = callNamed("getWindow", meProp(_me, "m_sWndID"));
  callMethod("merge", t_rWnd, "performance.window")
  callMethod("center", t_rWnd)
  callMethod("registerClient", t_rWnd, callMethod("getID", _this))
  callMethod("registerProcedure", t_rWnd, symbol("EventProc"), callMethod("getID", _this), symbol("mouseUp"))
  callMethod("setEdit", callMethod("getElement", t_rWnd, "perf_per_frm"), 0)
  callMethod("setEdit", callMethod("getElement", t_rWnd, "perf_total"), 0)
  callMethod("setEdit", callMethod("getElement", t_rWnd, "close"), 0)
  callMethod("setText", callMethod("getElement", t_rWnd, "close"), "x")
  return callNamed("receiveUpdate", callMethod("getID", _this));
}

