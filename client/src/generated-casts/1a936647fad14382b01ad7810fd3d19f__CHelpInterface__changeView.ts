// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpInterface / changeView

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function changeView(_me: LingoMe, i_sWindowName: LingoValue, t_sHelpPage: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_windowTitle"));
  var tLastView = meProp(_me, "m_currentView");
  if (lingoBinary("or", lingoBinary("contains", t_sHelpPage, "trading"), meProp(_me, "m_bModal"))) {
  if (lingoBinary("neq", tWndObj, 0)) {
  callNamed("removeWindow", meProp(_me, "m_windowTitle"))
  tWndObj = 0;
  }

  var t_windowMode = symbol("modal");
  } else {
  t_windowMode = symbol("normal");
  }

  if (lingoBinary("eq", tWndObj, 0)) {
  if ((lingoTruthy(callNamed("createWindow", meProp(_me, "m_windowTitle"), "vmk_hlp.window", undefined, undefined, t_windowMode)) ? 0 : 1)) {
  return callNamed("error", _me, "Failed to open help window!!!", symbol("changeView"));
  } else {
  tWndObj = callNamed("getWindow", meProp(_me, "m_windowTitle"));
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("eventProcHelp"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("registerProcedure", tWndObj, symbol("eventProcHelp"), callMethod("getID", _me), symbol("mouseDown"))
  callMethod("registerProcedure", tWndObj, symbol("eventProcHelp"), callMethod("getID", _me), symbol("keyDown"))
  callMethod("registerProcedure", tWndObj, symbol("eventProcHelp"), callMethod("getID", _me), symbol("keyUp"))
  callMethod("merge", tWndObj, meProp(_me, "m_currentView"))
  callMethod("showSelectedTab", _me, "topics")
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
  switch (meProp(_me, "m_currentView")) {
case "vmk_hlp_topics.window":
  callMethod("showSelectedTab", _me, "topics")
  var tIndexField = callMethod("getElement", tWndObj, "hlp.topicslist");
  var tContentField = callMethod("getElement", tWndObj, "hlp.answerslist");
  callMethod("feedImage", tIndexField, callMethod("getImage", meProp(_me, "m_pHelpMenu")))
  callMethod("feedImage", tContentField, callMethod("getImage", meProp(_me, "m_pHelpMenu").pContent))
  break;
case "vmk_hlp_askmods.window":
  callMethod("showSelectedTab", _me, "askmods")
  if (callNamed("voidp", meProp(_me, "m_pRadioButtons"))) {
  callMethod("createRadioButtonMenu", _me)
  }

  callMethod("inactivateOld", meProp(_me, "m_pRadioButtons"))
  callMethod("updateMenu", meProp(_me, "m_pRadioButtons"))
  callMethod("createWebLinks", _me)
  if (lingoBinary("eq", meProp(_me, "m_rHelpField"), 0)) {
  setMeProp(_me, "m_rHelpField", callNamed("CreateCannedField", meProp(_me, "m_windowTitle"), "hlp.describe.input"));
  }

  callMethod("deactivate", callMethod("getElement", tWndObj, "hlp.alertmod.button"))
  break;
  }

}

