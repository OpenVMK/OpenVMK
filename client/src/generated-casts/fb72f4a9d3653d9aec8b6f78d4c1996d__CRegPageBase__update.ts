// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegPageBase / update

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
  callMethod("registerProcedure", meProp(_me, "m_rWindow"), symbol("_EventProc"), callMethod("getID", _this), symbol("keyDown"))
  callMethod("registerProcedure", meProp(_me, "m_rWindow"), symbol("_EventProc"), callMethod("getID", _this), symbol("keyUp"))
  if (callMethod("merge", meProp(_me, "m_rWindow"), "vmk_reg.window")) {
  callMethod("center", meProp(_me, "m_rWindow"))
  setMeProp(_me, "m_bReady", 1);
  callMethod("_ChangePage", _this, 1)
  callMethod("close", _this)
  } else {
  return callNamed("error", _this, "Failed to open registration page!", symbol("update"));
  }

  }

  callNamed("registerMessage", symbol("ui_registration"), callMethod("getID", _this), symbol("_ShowHideUI"))
  callMethod("_ShowHideUI", _this)
  }

  if (lingoBinary("eq", a_kAlteredCategory, "AvatarCreated")) {
  callMethod("update", meProp(_me, "m_rCurPageObj"), meProp(_me, "m_mp_kType_mp_iRef_rItem"), a_kAlteredCategory)
  callMethod("_ChangePage", _this, 2)
  } else {
  callMethod("update", meProp(_me, "m_rCurPageObj"), meProp(_me, "m_mp_kType_mp_iRef_rItem"), a_kAlteredCategory)
  }

  if (lingoBinary("eq", a_kAlteredCategory, "LandingRoom")) {
  setMeProp(_me, "m_iLandingRoom", meProp(_me, "m_mp_kType_mp_iRef_rItem")["LandingRoom"]);
  }

  if (lingoBinary("eq", a_kAlteredCategory, "NoEULA")) {
  callMethod("_ChangePage", _this, 3)
  }

  if (lingoBinary("eq", a_kAlteredCategory, "LandingRoomRealID")) {
  var t_iLandingRoomID = meProp(_me, "m_mp_kType_mp_iRef_rItem")["LandingRoomRealID"];
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 31, new LingoPropList([symbol("integer"), t_iLandingRoomID, symbol("integer"), -float(1)]))
  }

}

