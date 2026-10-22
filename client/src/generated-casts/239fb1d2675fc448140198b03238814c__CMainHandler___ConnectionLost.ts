// 239fb1d2675fc448140198b03238814c.cct / CMainHandler / _ConnectionLost

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ConnectionLost(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("and", (lingoTruthy(callNamed("windowExists", "LoginFail")) ? 0 : 1), (lingoTruthy(callNamed("DialogWindowExists", "AdminMessage")) ? 0 : 1))) {
  var t = callNamed("createDialogWindow", callMethod("getID", _this), "ConnectionLost", 1, 1);
  callMethod("show", t)
  var t_sText = callNamed("getText", "error.connection.lost");
  callMethod("setText", t, t_sText, "Disconnected", "OK")
  }

  if (lingoBinary("neq", theProperty("runMode"), "Author")) {
  callMethod("_RemoveRoom", callMethod("getComponent", callNamed("getThread", "room")))
  }

}

