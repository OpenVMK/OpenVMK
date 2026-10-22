// 239fb1d2675fc448140198b03238814c.cct / CMainInterface / ShowConnectionFailed

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowConnectionFailed(_me: LingoMe) {
  var t = callNamed("createDialogWindow", lingoBinary("join", callMethod("getID", _me), theProperty("milliSeconds")), "ConnectionFailed", 1, 1);
  callMethod("show", t)
  callMethod("setText", t, "Can not connect to the VMK server. Check your firewall/internet security settings.", "Connection Failed", "OK")
}

