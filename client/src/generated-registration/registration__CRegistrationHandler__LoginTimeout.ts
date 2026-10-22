// registration.cct / CRegistrationHandler / LoginTimeout

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LoginTimeout(_me: LingoMe, _this: LingoValue) {
  callNamed("removeTimeout", "login_timer")
  if (callNamed("createWindow", "LoginFail", "vmk_mods_window.window")) {
  setMeProp(_me, "m_rWindow", callNamed("getWindow", "LoginFail"));
  callMethod("registerClient", meProp(_me, "m_rWindow"), callMethod("getID", _this))
  callMethod("registerProcedure", meProp(_me, "m_rWindow"), symbol("_EventProcLoginFailed"), callMethod("getID", _this), symbol("mouseDown"))
  callMethod("center", meProp(_me, "m_rWindow"))
  var t_sTxt2 = callNamed("getText", "Login.error.hd");
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "mods.window.title"), t_sTxt2)
  }

  var t_sTxt = callNamed("getText", "Login.server.error");
  callMethod("merge", meProp(_me, "m_rWindow"), "vmk_mods_message.window")
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "mods.message.text"), t_sTxt)
  return 1;
}

