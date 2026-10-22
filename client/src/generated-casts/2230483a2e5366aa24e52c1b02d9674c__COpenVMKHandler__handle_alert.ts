// 2230483a2e5366aa24e52c1b02d9674c.cct / COpenVMKHandler / handle_alert

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handle_alert(_me: LingoMe, a_rMsg: LingoValue) {
  /* global */ var g_rCore = globalVar("g_rCore");
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "alert.dialog", 1, 1);
  callMethod("setText", t, callMethod("GetStrFrom", a_rMsg.connection), callMethod("GetStrFrom", a_rMsg.connection), callMethod("GetStrFrom", a_rMsg.connection))
  callMethod("show", t)
}

