// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageBase / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue, a_mp_kType_mp_iRef_rItem: LingoValue, a_kAlteredCategory: LingoValue) {
  setMeProp(_me, "m_mp_kType_mp_iRef_rItem", a_mp_kType_mp_iRef_rItem);
  if ((lingoTruthy(meProp(_me, "m_bReady")) ? 0 : 1)) {
  var t_sID = callNamed("getUniqueID");
  if (callNamed("createWindow", t_sID)) {
  setMeProp(_me, "m_rWindow", callNamed("getWindow", t_sID));
  callMethod("registerClient", meProp(_me, "m_rWindow"), callMethod("getID", _this))
  callMethod("registerProcedure", meProp(_me, "m_rWindow"), symbol("_EventProc"), callMethod("getID", _this), symbol("mouseUp"))
  if (callMethod("merge", meProp(_me, "m_rWindow"), "vmk_inv.window")) {
  callMethod("center", meProp(_me, "m_rWindow"))
  setMeProp(_me, "m_bReady", 1);
  setMeProp(_me, "m_bVisible", 1);
  callMethod("_ChangePage", _this, symbol("pins"))
  } else {
  return callNamed("error", _this, "Failed to open inventory page!", symbol("update"));
  }

  }

  callNamed("registerMessage", symbol("ui_inventory"), callMethod("getID", _this), symbol("_ShowHideUI"))
  callNamed("registerMessage", "room_leave", callMethod("getID", _this), symbol("close"))
  callNamed("registerMessage", "hide_inventory", callMethod("getID", _this), symbol("close"))
  callNamed("registerMessage", "show_inventory", callMethod("getID", _this), symbol("open"))
  }

  callMethod("update", meProp(_me, "m_rCurPageObj"), meProp(_me, "m_mp_kType_mp_iRef_rItem"), a_kAlteredCategory)
}

