// 239fb1d2675fc448140198b03238814c.cct / CMainHandler / OpenConnection

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function OpenConnection(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("neq", callMethod("get", callNamed("getObject", symbol("session")), "ExternalTexts"), 1)) {
  if ((lingoTruthy(callNamed("DialogWindowExists", "DictionaryError")) ? 0 : 1)) {
  var t = callNamed("createDialogWindow", callMethod("getID", _this), "DictionaryError", 1, 1);
  callMethod("setText", t, "Cannot start VMK. The game was unable to download all required resources. Please first check your Internet connection and Firewall settings and then retry logging into the game. If the problem persists, please send feedback using the feedback forms in VMK.com.", "ERROR", "OK")
  callMethod("show", t)
  return 0;
  }

  }

  var t_sIP = callNamed("getVariable", "main.connection.ip");
  var t_sID = callNamed("getVariable", "main.connection.id", "VMK");
  var t_iPt = callNamed("getIntVariable", "main.connection.pt");
  callNamed("createConnection", t_sID, t_sIP, t_iPt)
}

