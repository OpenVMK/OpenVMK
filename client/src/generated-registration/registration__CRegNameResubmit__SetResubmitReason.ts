// registration.cct / CRegNameResubmit / SetResubmitReason

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetResubmitReason(_me: LingoMe, _this: LingoValue, a_sReason: LingoValue, a_sName: LingoValue) {
  setMeProp(_me, "m_sResubmitReason", a_sReason);
  setMeProp(_me, "m_sName", a_sName);
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  if (lingoBinary("eq", meProp(_me, "m_sResubmitReason"), "resubmit")) {
  var t_sTxt = callNamed("getText", "reg.name.resubmit.hd");
  } else {
  t_sTxt = callNamed("getText", "reg.username.refused.hd");
  }

  t_sTxt = callNamed("replaceChunks", t_sTxt, "\\$", meProp(_me, "m_sName"));
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "reg.username.refused.hd"), t_sTxt)
  }

}

