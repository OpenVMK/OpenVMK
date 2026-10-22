// d1ee027a52e24196484455ed8484679f.cct / CTutorialWindow / changeView

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function changeView(_me: LingoMe, tView: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  var tLastView = meProp(_me, "m_currentView");
  if (lingoBinary("eq", tWndObj, 0)) {
  if (meProp(_me, "m_bModal")) {
  var t_window = callNamed("createWindow", meProp(_me, "m_sWindowTitle"), "vmk_tutorial.window", 0, 0, symbol("modal"));
  } else {
  t_window = callNamed("createWindow", meProp(_me, "m_sWindowTitle"), "vmk_tutorial.window");
  }

  if ((lingoTruthy(t_window) ? 0 : 1)) {
  return callNamed("error", _me, lingoBinary("join", lingoBinary("joinPad", "Failed to open Tutorial Window", meProp(_me, "m_sTutorialTitle")), "!!!"), symbol("changeView"));
  } else {
  tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("eventProcMessenger"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("registerProcedure", tWndObj, symbol("eventProcMessenger"), callMethod("getID", _me), symbol("mouseEnter"))
  callMethod("registerProcedure", tWndObj, symbol("eventProcMessenger"), callMethod("getID", _me), symbol("mouseLeave"))
  callMethod("center", tWndObj)
  }

  }

  if (lingoBinary("neq", tLastView, tView)) {
  callMethod("unmerge", tWndObj)
  callMethod("merge", tWndObj, tView)
  setMeProp(_me, "m_currentView", tView);
  }

  callMethod("hide", callMethod("getElement", tWndObj, "selector.jc"))
  callMethod("hide", callMethod("getElement", tWndObj, "selector.fw"))
  callMethod("hide", callMethod("getElement", tWndObj, "selector.potc"))
  callMethod("hide", callMethod("getElement", tWndObj, "selector.hm"))
  switch (meProp(_me, "m_currentView")) {
case "vmk_tutorial.window":
  callMethod("updateInterface", _me)
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "[TutorialWindow] #changeView, unknown view", meProp(_me, "m_currentView")))
  }

}

