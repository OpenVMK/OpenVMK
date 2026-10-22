// d0e535313898676eb605277339b50f27.cct / CAvatarBuilderPageBase / update

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
  if (lingoBinary("and", lingoBinary("eq", a_kAlteredCategory, "AvailableSets"), callNamed("voidp", meProp(_me, "m_rWindow")))) {
  } else {
  if (callNamed("voidp", meProp(_me, "m_rWindow"))) {
  var t_sID = callNamed("getUniqueID");
  if (callNamed("createWindow", t_sID)) {
  setMeProp(_me, "m_rWindow", callNamed("getWindow", t_sID));
  callMethod("registerClient", meProp(_me, "m_rWindow"), callMethod("getID", _this))
  callMethod("registerProcedure", meProp(_me, "m_rWindow"), symbol("_EventProc"), callMethod("getID", _this), symbol("mouseUp"))
  callMethod("registerProcedure", meProp(_me, "m_rWindow"), symbol("_EventProc"), callMethod("getID", _this), symbol("mouseDown"))
  callMethod("registerProcedure", meProp(_me, "m_rWindow"), symbol("_EventProc"), callMethod("getID", _this), symbol("keyDown"))
  callMethod("registerProcedure", meProp(_me, "m_rWindow"), symbol("_EventProc"), callMethod("getID", _this), symbol("keyUp"))
  if (callMethod("merge", meProp(_me, "m_rWindow"), "vmk_avatar.window")) {
  callMethod("center", meProp(_me, "m_rWindow"))
  var m_kCurPage = symbol("empty");
  callMethod("_ChangePage", _this, symbol("avatar"))
  }

  }

  }

  }

  if (callNamed("objectp", meProp(_me, "m_rCurPageObj"))) {
  callMethod("update", meProp(_me, "m_rCurPageObj"), meProp(_me, "m_mp_kType_mp_iRef_rItem"), a_kAlteredCategory)
  }

}

