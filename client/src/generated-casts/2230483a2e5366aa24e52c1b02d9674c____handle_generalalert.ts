// 2230483a2e5366aa24e52c1b02d9674c.cct /  / handle_generalalert

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handle_generalalert(_me: LingoMe, _this: LingoValue, a_arMsg: LingoValue) {
  /* global */ var g_rCore = globalVar("g_rCore");
  var t_sMsg = callMethod("GetStrFrom", a_arMsg.connection);
  var t_sTxt = callMethod("GetStrFrom", a_arMsg.connection);
  var t = callNamed("createDialogWindow", callMethod("getID", _this), "AdminMessage", 1, 1);
  callMethod("show", t)
  callMethod("setText", t, t_sMsg, t_sTxt, "OK")
}

