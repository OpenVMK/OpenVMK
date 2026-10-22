// registration.cct / CRegPageBase / _EventProc

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EventProc(_me: LingoMe, _this: LingoValue, a_kEvent: LingoValue, a_sElem: LingoValue, a_vParam: LingoValue) {
  switch (a_sElem) {
case "reg.imready.button":
  var t_MpData = callMethod("GetData", meProp(_me, "m_rCurPageObj"));
  if (callNamed("listp", t_MpData)) {
  callMethod("_ChangePage", _this, 5)
  callMethod("setData", meProp(_me, "m_rCurPageObj"), t_MpData)
  }

  break;
case "reg.regstep2.button":
  callMethod("ShowConfirmName", meProp(_me, "m_rCurPageObj"))
  break;
case "reg.regstep3.button":
  callMethod("_ChangePage", _this, 3)
  break;
case "reg.regstep4.button":
  if (callMethod("DataGathered", meProp(_me, "m_rCurPageObj"))) {
  callMethod("_ChangePage", _this, 4)
  }

  break;
case "reg.regstep5.agree":
  callMethod("SendData", meProp(_me, "m_rCurPageObj"))
  callMethod("close", _this)
  callNamed("executeMessage", "show_mod_window")
  callMethod("send", callNamed("getConnection", "VMK"), "NavigatorHandshake")
  if (callNamed("integerp", meProp(_me, "m_iLandingRoom"))) {
  if (lingoBinary("gt", meProp(_me, "m_iLandingRoom"), -float(1))) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "InstanceInfoByTag", new LingoPropList([symbol("integer"), meProp(_me, "m_iLandingRoom")]))
  }

  }

  break;
case "reg.regstep5.cancel":
  callMethod("ShowConfirm", meProp(_me, "m_rCurPageObj"))
  break;
case "close":
  callMethod("close", _this)
  break;
case "help":
  callNamed("error", _this, "Help not yet implemented!", symbol("_EventProc"))
  break;
  }

  return callNamed("call", symbol("_EventProc"), new LingoList([meProp(_me, "m_rCurPageObj")]), a_kEvent, a_sElem, a_vParam);
}

