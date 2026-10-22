// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpHandler / HelpReceivedOK

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HelpReceivedOK(_me: LingoMe, tMsg: LingoValue) {
  var t_pHelpDialog = callNamed("createDialogWindow", callMethod("getID", _me), "hlp.dialog.cfh.sent", 1, 1);
  callMethod("show", t_pHelpDialog)
  callMethod("setText", t_pHelpDialog, callNamed("getText", "hlp.dialog.cfh.sent.text"), callNamed("getText", "hlp.dialog.cfh.sent.title"), callNamed("getText", "hlp.dialog.cfh.sent.btn"))
}

