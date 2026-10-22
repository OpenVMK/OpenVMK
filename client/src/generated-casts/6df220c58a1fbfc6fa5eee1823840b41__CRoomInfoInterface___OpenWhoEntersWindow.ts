// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoInterface / _OpenWhoEntersWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _OpenWhoEntersWindow(_me: LingoMe, _this: LingoValue) {
  var t_sWndName = meProp(_me, "m_sWhoEntersWindow");
  if ((lingoTruthy(callNamed("createWindow", t_sWndName, "vmk_basic.window", 350, 360)) ? 0 : 1)) {
  return callNamed("error", _this, "Failed to create 'who enters' window!!!", symbol("_OpenWhoEntersWindow"));
  } else {
  var t_rWindow = callNamed("getWindow", t_sWndName);
  callMethod("merge", t_rWindow, "vmk_whoenters.window")
  callMethod("setText", callMethod("getElement", t_rWindow, "basic.window.title"), callNamed("getText", "whoenters.title", ""))
  callMethod("registerClient", t_rWindow, callMethod("getID", _this))
  callMethod("registerProcedure", t_rWindow, symbol("_WhoEntersEventProc"), callMethod("getID", _this), symbol("mouseUp"))
  setMeProp(_me, "m_iTempEntryState", callMethod("getFriendsOnly", callMethod("getComponent", _this)));
  callMethod("UpdateChoises", _this, meProp(_me, "m_iTempEntryState"), t_sWndName)
  }

}

