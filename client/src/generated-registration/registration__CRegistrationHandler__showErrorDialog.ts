// registration.cct / CRegistrationHandler / showErrorDialog

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showErrorDialog(_me: LingoMe, _this: LingoValue, a_iID: LingoValue, a_sExtraMsg: LingoValue) {
  var t_sTxt = callNamed("string", a_iID);
  switch (a_iID) {
case -float(1):
  t_sTxt = callNamed("getText", "Login.undefined.error");
  break;
case 2:
case 11:
  t_sTxt = callNamed("getText", "Login.wrong.password");
  break;
case 3:
  t_sTxt = callNamed("getText", "Login.avatar.banned");
  break;
case 4:
case 5:
  t_sTxt = callNamed("getText", "Login.server.error");
  break;
case 6:
  t_sTxt = callNamed("getText", "Login.no.permission");
  break;
case 7:
  t_sTxt = callNamed("getText", "Login.machine.banned");
  break;
case 8:
  t_sTxt = callNamed("getText", "Login.ip.banned");
  break;
case 9:
  t_sTxt = callNamed("getText", "Login.site.closed");
  break;
case 10:
  t_sTxt = callNamed("getText", "Login.account.exists");
  break;
case 12:
  t_sTxt = callNamed("getText", "Login.vmk.full");
  break;
  break;
  break;
  }

  if (callNamed("createWindow", "LoginFail", "vmk_mods_window.window")) {
  setMeProp(_me, "m_rWindow", callNamed("getWindow", "LoginFail"));
  callMethod("registerClient", meProp(_me, "m_rWindow"), callMethod("getID", _this))
  callMethod("registerProcedure", meProp(_me, "m_rWindow"), symbol("_EventProcLoginFailed"), callMethod("getID", _this), symbol("mouseDown"))
  callMethod("center", meProp(_me, "m_rWindow"))
  var t_sTxt2 = callNamed("getText", "Login.error.hd");
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "mods.window.title"), t_sTxt2)
  }

  callMethod("merge", meProp(_me, "m_rWindow"), "vmk_mods_message.window")
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "mods.message.text"), lingoBinary("join", lingoBinary("join", t_sTxt, "\r"), a_sExtraMsg))
  return 1;
}

