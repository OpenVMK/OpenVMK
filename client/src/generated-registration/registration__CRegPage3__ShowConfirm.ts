// registration.cct / CRegPage3 / ShowConfirm

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowConfirm(_me: LingoMe, _this: LingoValue) {
  var t_sMsg = callNamed("getText", "reg.check.roomname");
  var t = callNamed("createDialogWindow", callMethod("getID", _this), "ConfirmReg", 2, 1);
  callMethod("show", t)
  var t_mp_ButtonData1 = new LingoPropList([symbol("text"), callNamed("getText", "reg.cancel"), symbol("eventID"), "cancel"]);
  var t_mp_ButtonData2 = new LingoPropList([symbol("text"), callNamed("getText", "reg.agree"), symbol("eventID"), "ok"]);
  var t_sHd = callNamed("getText", "reg.confirm");
  var t_sTxt = callNamed("getText", "reg.confirm.eula");
  callMethod("setText", t, t_sTxt, t_sHd, t_mp_ButtonData1, t_mp_ButtonData2)
}

