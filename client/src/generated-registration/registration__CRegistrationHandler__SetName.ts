// registration.cct / CRegistrationHandler / SetName

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetName(_me: LingoMe, _this: LingoValue, tMsg: LingoValue) {
  var t_sName = callMethod("GetStrFrom", tMsg.connection);
  callMethod("set", callNamed("getObject", symbol("session")), "name", t_sName)
  var t_ar_Permissions = new LingoList([]);
  var t_iDatacount = callMethod("GetIntFrom", tMsg.connection);
  if (lingoBinary("gt", t_iDatacount, 0)) {
  for (var i = 1; i <= t_iDatacount; ++i) {
  callMethod("add", t_ar_Permissions, callMethod("GetIntFrom", tMsg.connection))
  }

  callMethod("set", callNamed("getObject", symbol("session")), "permissions", t_ar_Permissions)
  }

  if (meProp(_me, "m_bRegistrationGoingOn")) {
  callNamed("executeMessage", "init_messenger")
  }

  callNamed("executeMessage", symbol("login_hide"))
  if (!lingoTruthy(meProp(_me, "m_bRegistrationGoingOn"))) {
  callMethod("send", callNamed("getConnection", "VMK"), "NavigatorHandshake")
  callNamed("executeMessage", "show_mod_window")
  }

}

