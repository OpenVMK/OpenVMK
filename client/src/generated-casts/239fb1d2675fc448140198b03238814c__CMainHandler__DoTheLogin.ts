// 239fb1d2675fc448140198b03238814c.cct / CMainHandler / DoTheLogin

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DoTheLogin(_me: LingoMe, _this: LingoValue) {
  if (meProp(_me, "m_bFurniMapsLoaded")) {
  if (callNamed("timeoutExists", "login_starter")) {
  callNamed("removeTimeout", "login_starter")
  }

  if (lingoBinary("contains", theProperty("runMode"), "Plugin")) {
  if (lingoBinary("and", callNamed("variableExists", "username"), callNamed("variableExists", "password"))) {
  var t_mp_Msg = new LingoPropList([symbol("str"), callNamed("getVariable", "username"), symbol("str"), callNamed("getVariable", "password"), symbol("str"), callNamed("getMachineID")]);
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "login", t_mp_Msg)
  callMethod("ShowLoginLoadingScreen", _this)
  } else {
  if (callNamed("variableExists", "at")) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 720, new LingoPropList([symbol("str"), callNamed("getVariable", "at"), symbol("str"), callNamed("getMachineID")]))
  callMethod("ShowLoginLoadingScreen", _this)
  }

  }

  } else {
  var t_rLogin = callNamed("getObject", "login");
  if (lingoBinary("neq", t_rLogin, 0)) {
  callMethod("enableLogin", t_rLogin)
  }

  }

  }

}

