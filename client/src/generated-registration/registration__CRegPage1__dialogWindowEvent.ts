// registration.cct / CRegPage1 / dialogWindowEvent

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, _this: LingoValue, t_dialogName: LingoValue, t_dialogEvent: LingoValue) {
  if (lingoBinary("eq", t_dialogName, "CheckName")) {
  var t_txt = callMethod("getText", callMethod("getElement", meProp(_me, "m_rWindow"), "reg.username.input"));
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "reg.username.input"), t_txt)
  }

  if (lingoBinary("eq", t_dialogName, "ConfirmAvatarName")) {
  if (lingoBinary("eq", t_dialogEvent, symbol("dialogOK"))) {
  callMethod("_GatherData", _this)
  }

  }

}

