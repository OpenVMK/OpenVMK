// 239fb1d2675fc448140198b03238814c.cct / CMainHandler / _GenericError

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _GenericError(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var tCode = callMethod("GetIntFrom", a_rMsg.connection);
  callNamed("executeMessage", "GenericError", tCode)
  callNamed("error", _this, lingoBinary("joinPad", "Server sent generic error! Errorcode:", tCode), symbol("_GenericError"))
  var t_ar_sErrorClasses = callNamed("value", callNamed("getVariable", "errorclasses"));
  var t_sHeadline = "Error";
  var tModal = 0;
  if (callNamed("ilk", t_ar_sErrorClasses, symbol("linearList"))) {
  var tLayout = "Dialog";
  for (var sClass of t_ar_sErrorClasses.toArray()) {
  var t_ar_iErrorList = callNamed("value", callNamed("getVariable", lingoBinary("join", lingoBinary("join", "errorprops.", sClass), ".list")));
  if (callMethod("getPos", t_ar_iErrorList, tCode)) {
  t_sHeadline = callNamed("getText", callNamed("getVariable", lingoBinary("join", lingoBinary("join", "errorprops.", sClass), ".headline")));
  tModal = callNamed("value", callNamed("getVariable", lingoBinary("join", lingoBinary("join", "errorprops.", sClass), ".modal")));
  tLayout = callNamed("getVariable", lingoBinary("join", lingoBinary("join", "errorprops.", sClass), ".layout"));
  break;
  }

  if (callMethod("exists", callNamed("getObject", symbol("session")), "minigame")) {
  if (lingoBinary("eq", callMethod("get", callNamed("getObject", symbol("session")), "minigame"), sClass)) {
  t_sHeadline = callNamed("getText", callNamed("getVariable", lingoBinary("join", lingoBinary("join", "errorprops.", sClass), ".headline")));
  tModal = callNamed("value", callNamed("getVariable", lingoBinary("join", lingoBinary("join", "errorprops.", sClass), ".modal")));
  tLayout = callNamed("getVariable", lingoBinary("join", lingoBinary("join", "errorprops.", sClass), ".layout"));
  break;
  }

  }

  }

  if (lingoBinary("or", lingoBinary("eq", tLayout, "Dialog"), lingoBinary("eq", tLayout, "dialog"))) {
  var t = callNamed("createDialogWindow", callMethod("getID", _this), "ErrorDialog", 1, tModal);
  callMethod("show", t)
  var t_sTxt = callNamed("getText", lingoBinary("join", "error.", tCode));
  callMethod("setText", t, t_sTxt, t_sHeadline, "OK")
  } else {
  if (callNamed("windowExists", "ErrorDialogSpecial")) {
  callNamed("removeWindow", "ErrorDialogSpecial")
  }

  if (tModal) {
  var tProps = symbol("modal");
  } else {
  tProps = undefined;
  }

  if ((lingoTruthy(callNamed("createWindow", "ErrorDialogSpecial", undefined, 0, 0, tProps)) ? 0 : 1)) {
  return callNamed("error", _this, "Failed to create special error Dialog with id ErrorDialogSpecial!!", symbol("_GenericError"));
  }

  var tWndObj = callNamed("getWindow", "ErrorDialogSpecial");
  if ((lingoTruthy(callMethod("merge", tWndObj, tLayout)) ? 0 : 1)) {
  return callNamed("error", _this, lingoBinary("joinPad", "Failed to create special error Dialog from layout!!", tLayout), symbol("_GenericError"));
  } else {
  callMethod("registerClient", tWndObj, callMethod("getID", _this))
  callMethod("registerProcedure", tWndObj, symbol("eventProcSpecialError"), callMethod("getID", _this), symbol("mouseUp"))
  callMethod("setText", callMethod("getElement", tWndObj, "content.text"), callNamed("getText", lingoBinary("join", "error.", tCode)))
  callMethod("setText", callMethod("getElement", tWndObj, "window.title"), t_sHeadline)
  callMethod("center", tWndObj)
  }

  }

  } else {
  t = callNamed("createDialogWindow", callMethod("getID", _this), "ErrorDialog", 1, tModal);
  callMethod("show", t)
  t_sTxt = callNamed("getText", lingoBinary("join", "error.", tCode));
  callMethod("setText", t, t_sTxt, t_sHeadline, "OK")
  }

}

