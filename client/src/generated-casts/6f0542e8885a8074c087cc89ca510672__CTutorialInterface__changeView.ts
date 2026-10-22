// 6f0542e8885a8074c087cc89ca510672.cct / CTutorialInterface / changeView

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function changeView(_me: LingoMe, i_sWindowName: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_windowTitle"));
  var tLastView = meProp(_me, "m_currentView");
  if (lingoBinary("eq", tWndObj, 0)) {
  if ((lingoTruthy(callNamed("createWindow", meProp(_me, "m_windowTitle"), "vmk_hlp.window")) ? 0 : 1)) {
  return callNamed("error", _me, "Failed to open help window!!!", symbol("changeView"));
  } else {
  tWndObj = callNamed("getWindow", meProp(_me, "m_windowTitle"));
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("eventProcHelp"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("registerProcedure", tWndObj, symbol("eventProcHelp"), callMethod("getID", _me), symbol("mouseDown"))
  callMethod("registerProcedure", tWndObj, symbol("eventProcHelp"), callMethod("getID", _me), symbol("keyDown"))
  callMethod("merge", tWndObj, meProp(_me, "m_currentView"))
  }

  } else {
  if (lingoBinary("neq", tLastView, i_sWindowName)) {
  callMethod("unmerge", tWndObj)
  }

  }

  if (lingoBinary("neq", tLastView, i_sWindowName)) {
  callMethod("merge", tWndObj, i_sWindowName)
  }

  setMeProp(_me, "m_currentView", i_sWindowName);
}

