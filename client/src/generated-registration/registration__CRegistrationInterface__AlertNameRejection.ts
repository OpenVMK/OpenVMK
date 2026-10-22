// registration.cct / CRegistrationInterface / AlertNameRejection

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AlertNameRejection(_me: LingoMe, _this: LingoValue, a_iReason: LingoValue, a_sInfo: LingoValue) {
  var t_wnd = callNamed("createDialogWindow", callMethod("getID", _this), "NameNotAccepted", 1, 1);
  callMethod("show", t_wnd)
  var t_sMsg = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", callNamed("getText", "reg.name.not.accepted"), "\r"), callNamed("getText", lingoBinary("join", "reg.name.rejection.", a_iReason))), "\r"), a_sInfo);
  callMethod("setText", t_wnd, t_sMsg, "Error", "OK")
}

