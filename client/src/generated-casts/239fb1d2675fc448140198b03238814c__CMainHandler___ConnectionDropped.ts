// 239fb1d2675fc448140198b03238814c.cct / CMainHandler / _ConnectionDropped

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ConnectionDropped(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var tCode = callMethod("GetIntFrom", a_rMsg.connection);
  var t = callNamed("createDialogWindow", callMethod("getID", _this), "ConnectionLost", 1, 0);
  callMethod("show", t)
  var t_sTxt = callNamed("getText", lingoBinary("join", "connection.dropped.", tCode));
  callMethod("setText", t, t_sTxt, "Error", "OK")
}

