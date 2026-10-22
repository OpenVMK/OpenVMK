// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorMessage / CreateModeratorMessage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateModeratorMessage(_me: LingoMe, _this: LingoValue, a_mp_Data: LingoValue) {
  if (callNamed("listp", a_mp_Data)) {
  var t_sWndName = lingoBinary("join", meProp(_me, "m_sWindowID"), callNamed("getUniqueID"));
  if (callNamed("createWindow", t_sWndName, "vmk_mods_window.window")) {
  var t_rWnd = callNamed("getWindow", t_sWndName);
  callMethod("center", t_rWnd)
  callMethod("registerClient", t_rWnd, callMethod("getID", _this))
  callMethod("registerProcedure", t_rWnd, symbol("_EventProcModeratorMessages"), callMethod("getID", _this), symbol("mouseDown"))
  callMethod("registerProcedure", t_rWnd, symbol("_EventProcModeratorMessages"), callMethod("getID", _this), symbol("keyDown"))
  callMethod("registerProcedure", t_rWnd, symbol("_EventProcModeratorMessages"), callMethod("getID", _this), symbol("keyUp"))
  var t_sHdTxt = callNamed("getText", "mods.message.hd");
  callMethod("setText", callMethod("getElement", t_rWnd, "mods.window.title"), t_sHdTxt)
  } else {
  return 0;
  }

  }

  if (a_mp_Data.Response) {
  callMethod("merge", t_rWnd, "vmk_mods_message_edit.window")
  var t_sTxt = a_mp_Data.message;
  callMethod("setText", callMethod("getElement", t_rWnd, "mods.message.text"), t_sTxt)
  callMethod("setFocus", callMethod("getElement", t_rWnd, "mods.messagereply.input"), 1)
  var t_iID = a_mp_Data.id;
  callMethod("addProp", meProp(_me, "m_mp_MessageIDList"), t_sWndName, t_iID)
  var t_rModReplyField = callNamed("CreateCannedField", t_sWndName, "mods.messagereply.input");
  callMethod("addProp", meProp(_me, "m_mp_MessageIDList"), lingoBinary("join", t_sWndName, "_field"), t_rModReplyField)
  } else {
  callMethod("merge", t_rWnd, "vmk_mods_message.window")
  t_sTxt = a_mp_Data.message;
  callMethod("setText", callMethod("getElement", t_rWnd, "mods.message.text"), t_sTxt)
  t_iID = a_mp_Data.id;
  callMethod("addProp", meProp(_me, "m_mp_MessageIDList"), t_sWndName, t_iID)
  }

}

