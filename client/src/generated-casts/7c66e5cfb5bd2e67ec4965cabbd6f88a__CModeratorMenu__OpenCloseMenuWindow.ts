// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorMenu / OpenCloseMenuWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function OpenCloseMenuWindow(_me: LingoMe, _this: LingoValue) {
  if (callNamed("createWindow", meProp(_me, "m_sWindowID"), "vmk_mods_menu.window")) {
  setMeProp(_me, "m_rWnd", callNamed("getWindow", meProp(_me, "m_sWindowID")));
  callMethod("center", meProp(_me, "m_rWnd"))
  callMethod("registerClient", meProp(_me, "m_rWnd"), callMethod("getID", _this))
  callMethod("registerProcedure", meProp(_me, "m_rWnd"), symbol("_EventProcModMenu"), callMethod("getID", _this), symbol("mouseDown"))
  callMethod("registerProcedure", meProp(_me, "m_rWnd"), symbol("_EventProcModMenu"), callMethod("getID", _this), symbol("keyDown"))
  var t_sHdTxt = callNamed("getText", "mods.menu.hd");
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWnd"), "mods.window.title"), t_sHdTxt)
  callMethod("_CheckPermissions", _this)
  } else {
  callNamed("removeWindow", meProp(_me, "m_sWindowID"))
  callNamed("createWindow", meProp(_me, "m_sWindowID"), "vmk_mods_menu.window")
  setMeProp(_me, "m_rWnd", callNamed("getWindow", meProp(_me, "m_sWindowID")));
  callMethod("center", meProp(_me, "m_rWnd"))
  callMethod("registerClient", meProp(_me, "m_rWnd"), callMethod("getID", _this))
  callMethod("registerProcedure", meProp(_me, "m_rWnd"), symbol("_EventProcModMenu"), callMethod("getID", _this), symbol("mouseDown"))
  callMethod("registerProcedure", meProp(_me, "m_rWnd"), symbol("_EventProcModMenu"), callMethod("getID", _this), symbol("keyDown"))
  t_sHdTxt = callNamed("getText", "mods.menu.hd");
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWnd"), "mods.window.title"), t_sHdTxt)
  callMethod("_CheckPermissions", _this)
  return 0;
  }

}

