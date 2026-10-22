// registration.cct / CRegistrationInterface / deconstruct

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rCurPageObj"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rCurPageObj")))
  setMeProp(_me, "m_rCurPageObj", undefined);
  }

  if (callNamed("windowExists", "NameRejected")) {
  callNamed("removeWindow", "NameRejected")
  }

  setMeProp(_me, "m_obj_NameRejectionWindow", undefined);
  setMeProp(_me, "m_rWindow", undefined);
  return 1;
}

