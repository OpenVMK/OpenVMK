// registration.cct / CRegNameResubmit / _EventProc

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EventProc(_me: LingoMe, _this: LingoValue, a_kEvent: LingoValue, a_sElem: LingoValue, a_vParam: LingoValue) {
  switch (1) {
case lingoBinary("eq", a_sElem, "reg.playnewname"):
  callMethod("ShowConfirmName", _this)
  break;
case lingoBinary("eq", a_sElem, "reg.morenames.button"):
  callMethod("GenerateNames", _this)
  break;
case lingoBinary("eq", a_sElem, "reg.namelist"):
  var t_ar_event = new LingoPropList([symbol("found"), 0, symbol("event"), "", symbol("client"), undefined, symbol("route"), new LingoPropList([])]);
  callMethod("EventProc", meProp(_me, "m_rComponentsPage"), a_vParam, t_ar_event)
  if (t_ar_event.found) {
  callMethod("GetActiveName", _this, t_ar_event.event)
  }

  break;
  }

  if (lingoBinary("eq", a_kEvent, symbol("keyDown"))) {
  switch (a_sElem) {
case "reg.username.input":
  switch (theProperty("keyCode")) {
case 123:
case 124:
case 125:
case 126:
  callNamed("pass")
  break;
case 117:
case 51:
  callNamed("pass")
  break;
case 36:
  return 1;
case 49:
  return 1;
  default:
  callMethod("InactivateNameSelector", _this)
  var t_sValidKeys = lingoBinary("join", " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!?.-_", "\"");
  var t_iAscii = callNamed("charToNum", theProperty("key"));
  var t_bAllow = 0;
  if (lingoBinary("or", lingoBinary("contains", t_sValidKeys, theProperty("key")), lingoBinary("eq", t_sValidKeys, ""))) {
  t_bAllow = 1;
  }

  if (!lingoTruthy(t_bAllow)) {
  var t = callNamed("createDialogWindow", callMethod("getID", _this), "CharNotAllowed", 1, 1);
  callMethod("show", t)
  var t_sMsg = callNamed("getText", "reg.char.not.allowed");
  callMethod("setText", t, t_sMsg, "Error", "OK")
  return 1;
  }

  var t_txt = callMethod("getText", callMethod("getElement", meProp(_me, "m_rWindow"), "reg.username.input"));
  var t_iMaxlength = 18;
  var tElem = callMethod("getElement", meProp(_me, "m_rWindow"), a_sElem);
  if (lingoBinary("neq", tElem, 0)) {
  if (lingoBinary("gte", tElem.pMember.text.char.count, t_iMaxlength)) {
  setThePropOf(tElem.pMember, "text", tElem.pMember.char.range(1, t_iMaxlength));
  t = callNamed("createDialogWindow", callMethod("getID", _this), "CheckNameLength", 1, 1);
  callMethod("show", t)
  t_sMsg = callNamed("getText", "reg.name.toolong");
  callMethod("setText", t, t_sMsg, "Error", "OK")
  return 1;
  }

  }

  break;
  break;
  break;
  break;
  }

  break;
  }

  }

}

