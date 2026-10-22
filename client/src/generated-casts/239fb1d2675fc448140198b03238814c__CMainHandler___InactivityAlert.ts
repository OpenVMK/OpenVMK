// 239fb1d2675fc448140198b03238814c.cct / CMainHandler / _InactivityAlert

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _InactivityAlert(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_iTime = callNamed("integer", callNamed("getText", "notice.inactivity.countdown"));
  var t = callNamed("createDialogWindow", callMethod("getID", _this), "InactivityAlert", 1, 1);
  callMethod("show", t)
  if (callNamed("windowExists", "InactivityAlert_window")) {
  callMethod("moveZ", callNamed("getWindow", "InactivityAlert_window"), 1000)
  }

  callMethod("_InactivityUpdater", _this, new LingoList([t, t_iTime]))
}

