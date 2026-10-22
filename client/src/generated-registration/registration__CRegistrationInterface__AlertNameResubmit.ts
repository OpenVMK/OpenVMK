// registration.cct / CRegistrationInterface / AlertNameResubmit

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AlertNameResubmit(_me: LingoMe, _this: LingoValue, a_sName: LingoValue) {
  if (callNamed("voidp", meProp(_me, "m_obj_NameRejectionWindow"))) {
  setMeProp(_me, "m_obj_NameRejectionWindow", callNamed("createObject", "NameRejection", "CRegNameResubmit"));
  callMethod("SetResubmitReason", meProp(_me, "m_obj_NameRejectionWindow"), "resubmit", a_sName)
  }

}

