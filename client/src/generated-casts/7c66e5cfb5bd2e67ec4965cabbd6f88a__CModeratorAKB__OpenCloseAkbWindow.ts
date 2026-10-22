// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorAKB / OpenCloseAkbWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function OpenCloseAkbWindow(_me: LingoMe, _this: LingoValue) {
  if (callNamed("createWindow", meProp(_me, "m_sWindowID"), "vmk_mods_akb.window")) {
  setMeProp(_me, "m_rWnd", callNamed("getWindow", meProp(_me, "m_sWindowID")));
  callMethod("center", meProp(_me, "m_rWnd"))
  callMethod("registerClient", meProp(_me, "m_rWnd"), callMethod("getID", _this))
  callMethod("registerProcedure", meProp(_me, "m_rWnd"), symbol("_EventProcAKB"), callMethod("getID", _this), symbol("mouseDown"))
  var t_sHdTxt = callNamed("getText", "mods.akb.hd");
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWnd"), "mods.window.title"), t_sHdTxt)
  callMethod("_HandleRadioButtons", _this, 2)
  callMethod("_CheckPermissions", _this)
  callMethod("_SetNameText", _this)
  callMethod("_PopulateReasonList", _this)
  callMethod("setFocus", callMethod("getElement", meProp(_me, "m_rWnd"), "mods.tousers.input"), 1)
  } else {
  callNamed("removeWindow", meProp(_me, "m_sWindowID"))
  callNamed("createWindow", meProp(_me, "m_sWindowID"), "vmk_mods_akb.window")
  setMeProp(_me, "m_rWnd", callNamed("getWindow", meProp(_me, "m_sWindowID")));
  callMethod("center", meProp(_me, "m_rWnd"))
  callMethod("registerClient", meProp(_me, "m_rWnd"), callMethod("getID", _this))
  callMethod("registerProcedure", meProp(_me, "m_rWnd"), symbol("_EventProcModeratorMessages"), callMethod("getID", _this), symbol("mouseDown"))
  t_sHdTxt = callNamed("getText", "mods.akb.hd");
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWnd"), "mods.window.title"), t_sHdTxt)
  callMethod("_HandleRadioButtons", _this, 2)
  callMethod("_CheckPermissions", _this)
  callMethod("_SetNameText", _this)
  callMethod("_PopulateReasonList", _this)
  callMethod("setFocus", callMethod("getElement", meProp(_me, "m_rWnd"), "mods.tousers.input"), 1)
  return 0;
  }

}

