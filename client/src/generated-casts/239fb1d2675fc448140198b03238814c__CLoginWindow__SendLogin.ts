// 239fb1d2675fc448140198b03238814c.cct / CLoginWindow / SendLogin

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SendLogin(_me: LingoMe) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_windowTitle"));
  var tField = callMethod("getElement", tWndObj, "login");
  var tName = callMethod("getText", tField);
  var tPassword = "";
  for (var c of meProp(_me, "pTempPassword").toArray()) {
  tPassword = lingoBinary("join", tPassword, c);
  }

  if (lingoBinary("or", lingoBinary("eq", theProperty("runMode"), "Author"), lingoBinary("eq", theProperty("runMode"), "Projector"))) {
  callNamed("setPref", "vmk_cached_name", tName)
  callNamed("setPref", "vmk_cached_pass", tPassword)
  }

  var tCmd = 10;
  var tMsg = new LingoPropList([symbol("str"), tName, symbol("str"), tPassword, symbol("str"), callNamed("getMachineID")]);
  if (meProp(_me, "m_bLoginAllowed")) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), tCmd, tMsg)
  callMethod("ShowLoginLoadingScreen", _me)
  }

}

