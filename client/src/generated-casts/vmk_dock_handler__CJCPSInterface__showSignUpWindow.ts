// vmk_dock_handler.cct / CJCPSInterface / showSignUpWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showSignUpWindow(_me: LingoMe, a_true: LingoValue) {
  if (a_true) {
  if (callNamed("windowExists", meProp(_me, "m_sSignupWndTitle"))) {
  callMethod("setProperty", callNamed("getWindow", meProp(_me, "m_sSignupWndTitle")), symbol("visible"), 1)
  } else {
  if (callNamed("createWindow", meProp(_me, "m_sSignupWndTitle"), "vmk_jc_main.window")) {
  if (callMethod("merge", callNamed("getWindow", meProp(_me, "m_sSignupWndTitle")), "vmk_jc_instructions.window")) {
  setMeProp(_me, "m_iCurPage", 1);
  callMethod("registerClient", callNamed("getWindow", meProp(_me, "m_sSignupWndTitle")), callMethod("getID", _me))
  callMethod("registerProcedure", callNamed("getWindow", meProp(_me, "m_sSignupWndTitle")), symbol("SignupEventProc"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("hide", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sSignupWndTitle")), "button.arrowprev.active"))
  callMethod("fixAntialiasing", _me, meProp(_me, "m_sSignupWndTitle"), "jc.window.hd", 0, callNamed("getText", "junglecruise.signup.window.title"))
  callMethod("feedImage", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sSignupWndTitle")), "jc.instructions.image"), meProp(_me, "m_ar_rImages")[meProp(_me, "m_iCurPage")])
  } else {
  callNamed("error", _me, "Failed to merge instructions to jungle cruise signup window", symbol("showSignUpWindow"))
  }

  } else {
  callNamed("error", _me, "Failed to create jungle cruise signup window", symbol("showSignUpWindow"))
  }

  }

  } else {
  callNamed("removeWindow", meProp(_me, "m_sSignupWndTitle"))
  }

}

