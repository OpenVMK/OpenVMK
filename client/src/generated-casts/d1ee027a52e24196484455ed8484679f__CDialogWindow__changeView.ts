// d1ee027a52e24196484455ed8484679f.cct / CDialogWindow / changeView

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function changeView(_me: LingoMe, tView: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_wWindowTitle"));
  var tLastView = meProp(_me, "m_currentView");
  if (lingoBinary("eq", tWndObj, 0)) {
  if (meProp(_me, "m_bModal")) {
  var t_window = callNamed("createWindow", meProp(_me, "m_wWindowTitle"), "vmk_modal.window", 0, 0, symbol("modal"));
  } else {
  t_window = callNamed("createWindow", meProp(_me, "m_wWindowTitle"), "vmk_modal.window");
  }

  if ((lingoTruthy(t_window) ? 0 : 1)) {
  return callNamed("error", _me, lingoBinary("join", lingoBinary("joinPad", "Failed to open Dialog Window", meProp(_me, "m_sDialogTitle")), "!!!"), symbol("changeView"));
  } else {
  tWndObj = callNamed("getWindow", meProp(_me, "m_wWindowTitle"));
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("eventProcMessenger"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("merge", tWndObj, meProp(_me, "m_currentView"))
  callMethod("center", tWndObj)
  }

  }

  if (lingoBinary("neq", tLastView, tView)) {
  callMethod("unmerge", tWndObj)
  callMethod("merge", tWndObj, tView)
  setMeProp(_me, "m_currentView", tView);
  }

  switch (meProp(_me, "m_currentView")) {
case "vmk_basic_1.window":
case "vmk_basic_2.window":
case "vmk_basic_3.window":
  callMethod("updateInterface", _me)
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "[DialogWindow] #changeView, unknown view", meProp(_me, "m_currentView")))
  break;
  break;
  }

}

