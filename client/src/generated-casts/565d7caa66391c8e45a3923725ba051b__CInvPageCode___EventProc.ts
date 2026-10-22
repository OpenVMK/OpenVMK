// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageCode / _EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EventProc(_me: LingoMe, _this: LingoValue, a_kEvent: LingoValue, a_sElem: LingoValue, a_vParam: LingoValue, a_sWndID: LingoValue) {
  if (lingoBinary("eq", a_kEvent, symbol("keyUp"))) {
  var tStart = theProperty("selStart");
  if (lingoBinary("or", lingoBinary("eq", theProperty("key"), "\b"), lingoBinary("eq", theProperty("keyCode"), 117))) {
  var t_ar_rFields = new LingoList([]);
  callMethod("add", t_ar_rFields, callMethod("getElement", meProp(_me, "m_rWindow"), "inv.codes.input1"))
  callMethod("add", t_ar_rFields, callMethod("getElement", meProp(_me, "m_rWindow"), "inv.codes.input2"))
  callMethod("add", t_ar_rFields, callMethod("getElement", meProp(_me, "m_rWindow"), "inv.codes.input3"))
  callMethod("add", t_ar_rFields, callMethod("getElement", meProp(_me, "m_rWindow"), "inv.codes.input4"))
  var t_iField = callNamed("integer", lastChunk(a_sElem, "char"));
  var t_rField = t_ar_rFields[t_iField];
  var t_sText = callMethod("getText", t_rField);
  var t_iLength = t_sText.length;
  if (lingoBinary("eq", t_iLength, 0)) {
  if (lingoBinary("eq", t_iField, 1)) {
  return 0;
  } else {
  t_rField = t_ar_rFields[lingoBinary("sub", t_iField, 1)];
  t_sText = callMethod("getText", t_rField);
  }

  }

  if (lingoBinary("eq", theProperty("key"), "\b")) {
  t_sText = deleteStringChunk(t_sText, "char", tStart, tStart);
  } else {
  if (lingoBinary("eq", theProperty("keyCode"), 117)) {
  t_sText = deleteStringChunk(t_sText, "char", lingoBinary("add", tStart, 1), lingoBinary("add", tStart, 1));
  }

  }

  callMethod("setEdit", t_rField, 1)
  callMethod("setText", t_rField, t_sText)
  callMethod("_DimSendButton", _this)
  return 1;
  }

  } else {
  if (lingoBinary("eq", a_kEvent, symbol("keyDown"))) {
  if (lingoBinary("or", lingoBinary("or", theProperty("commandDown"), theProperty("optionDown")), theProperty("controlDown"))) {
  if (lingoBinary("or", lingoBinary("eq", theProperty("key"), "v"), lingoBinary("eq", theProperty("key"), "V"))) {
  return 1;
  }

  }

  if (lingoBinary("or", lingoBinary("eq", theProperty("key"), "\b"), lingoBinary("eq", theProperty("keyCode"), 117))) {
  return 1;
  } else {
  if (lingoBinary("or", lingoBinary("eq", theProperty("keyCode"), 123), lingoBinary("eq", theProperty("keyCode"), 124))) {
  return 1;
  } else {
  if (lingoBinary("eq", theProperty("key"), callNamed("space"))) {
  callNamed("stopEvent")
  return 1;
  } else {
  var tValidKeys = "abcdefghijlkmnopqrstuvwxyz0123456789";
  var tAscii = callNamed("charToNum", theProperty("key"));
  var t_allow = 0;
  if (lingoBinary("and", lingoBinary("gt", tAscii, 31), lingoBinary("lt", tAscii, 128))) {
  if (lingoBinary("or", lingoBinary("contains", tValidKeys, theProperty("key")), lingoBinary("eq", tValidKeys, ""))) {
  t_allow = 1;
  }

  }

  if ((lingoTruthy(t_allow) ? 0 : 1)) {
  callNamed("stopEvent")
  return 1;
  }

  if (lingoBinary("eq", callMethod("getText", callMethod("getElement", meProp(_me, "m_rWindow"), a_sElem)).length, 3)) {
  t_sText = callMethod("getText", callMethod("getElement", meProp(_me, "m_rWindow"), a_sElem));
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), a_sElem), lingoBinary("join", t_sText, theProperty("key")))
  switch (a_sElem) {
case "inv.codes.input1":
  callMethod("setEdit", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.codes.input2"), 1)
  break;
case "inv.codes.input2":
  callMethod("setEdit", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.codes.input3"), 1)
  break;
case "inv.codes.input3":
  callMethod("setEdit", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.codes.input4"), 1)
  break;
  }

  callMethod("_DimSendButton", _this)
  return 1;
  } else {
  if (lingoBinary("eq", callMethod("getText", callMethod("getElement", meProp(_me, "m_rWindow"), a_sElem)).length, 4)) {
  switch (a_sElem) {
case "inv.codes.input1":
  callMethod("setEdit", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.codes.input2"), 1)
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.codes.input2"), theProperty("key"))
  break;
case "inv.codes.input2":
  callMethod("setEdit", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.codes.input3"), 1)
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.codes.input3"), theProperty("key"))
  break;
case "inv.codes.input3":
  callMethod("setEdit", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.codes.input4"), 1)
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.codes.input4"), theProperty("key"))
  break;
case "inv.codes.input4":
  t_sText = callMethod("getText", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.codes.input4"));
  callNamed("stopEvent")
  callMethod("_DimSendButton", _this)
  return 1;
  }

  callMethod("_DimSendButton", _this)
  return 0;
  }

  }

  }

  }

  }

  } else {
  switch (a_sElem) {
case "inv.entercode.button":
  var t_sCode = "";
  t_sCode = t_sCode + callMethod("getText", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.codes.input1"));
  t_sCode = t_sCode + callMethod("getText", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.codes.input2"));
  t_sCode = t_sCode + callMethod("getText", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.codes.input3"));
  t_sCode = t_sCode + callMethod("getText", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.codes.input4"));
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.codes.input1"), "")
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.codes.input2"), "")
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.codes.input3"), "")
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.codes.input4"), "")
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.entercode.button"), symbol("blend"), 50)
  if (callNamed("connectionExists", "VMK")) {
  callMethod("send", callNamed("getConnection", "VMK"), "CodeRedemption", new LingoPropList([symbol("str"), t_sCode]))
  }

  break;
case "help":
  callNamed("executeMessage", "ui_help", "help.inventory.codes")
  break;
  }

  }

  }

}

