// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegistrationHandler / LoginTimeout

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
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

