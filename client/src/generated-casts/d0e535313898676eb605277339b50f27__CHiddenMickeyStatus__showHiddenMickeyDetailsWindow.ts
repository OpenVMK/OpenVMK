// d0e535313898676eb605277339b50f27.cct / CHiddenMickeyStatus / showHiddenMickeyDetailsWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showHiddenMickeyDetailsWindow(_me: LingoMe, a_true: LingoValue) {
  a_true = 1;
  if (a_true) {
  if (callNamed("windowExists", meProp(_me, "m_sHiddenMickeyDetailWindowTitle"))) {
  callMethod("setProperty", callNamed("getWindow", meProp(_me, "m_sHiddenMickeyDetailWindowTitle")), symbol("visible"), 1)
  } else {
  if (callNamed("createWindow", meProp(_me, "m_sHiddenMickeyDetailWindowTitle"), "vmk_basic.window")) {
  if (callMethod("merge", callNamed("getWindow", meProp(_me, "m_sHiddenMickeyDetailWindowTitle")), "vmk_hidden_mickey_details.window")) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sHiddenMickeyDetailWindowTitle"));
  callMethod("registerClient", tWndObj, callMethod("getID", _me))
  callMethod("registerProcedure", tWndObj, symbol("EventProcHMDetails"), callMethod("getID", _me), symbol("mouseDown"))
  callMethod("center", tWndObj)
  if (callNamed("voidp", meProp(_me, "m_pMickeyList"))) {
  setMeProp(_me, "m_pMickeyList", callNamed("createObject", "VMKCenterMickeyDetailsList", "HMMickeyDetailsList"));
  }

  if (callNamed("voidp", meProp(_me, "m_pMickeyList"))) {
  return 0;
  } else {
  callMethod("SetItemWidth", meProp(_me, "m_pMickeyList"), callMethod("getProperty", callMethod("getElement", tWndObj, "hm.details"), symbol("width")))
  callMethod("SetItemHeight", meProp(_me, "m_pMickeyList"), 16)
  callMethod("setClientElement", meProp(_me, "m_pMickeyList"), callMethod("getElement", tWndObj, "hm.details"))
  callMethod("DrawHMDetailsList", _me)
  }

  var tElem = callMethod("getElement", tWndObj, "basic.window.title");
  if (lingoBinary("neq", tElem, 0)) {
  callMethod("setText", tElem, callNamed("getText", "hm.info.window.title"))
  }

  } else {
  callNamed("error", _me, "Failed to merge HM Details window", symbol("showHiddenMickeyDetailsWindow"))
  }

  } else {
  callNamed("error", _me, "Failed to create HM Details window", symbol("showHiddenMickeyDetailsWindow"))
  }

  }

  callMethod("send", callNamed("getConnection", "VMK"), "RequestHiddenMickeyList")
  } else {
  callNamed("removeWindow", meProp(_me, "m_sHiddenMickeyDetailWindowTitle"))
  }

}

