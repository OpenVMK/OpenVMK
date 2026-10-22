// 239fb1d2675fc448140198b03238814c.cct / CLoginWindow / eventProcLogin

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcLogin(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_windowTitle"));
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  switch (tElemID) {
case "send_login":
  callMethod("SendLogin", _me)
  break;
case "roomqueue.preloader.ok":
  if (callNamed("textExists", "game.exit.url")) {
  var t_sURL = callNamed("getText", " game.exit.url");
  } else {
  t_sURL = callNamed("getVariable", "client.reload.url");
  }

  if (callNamed("stringp", t_sURL)) {
  callNamed("gotoNetPage", t_sURL, "_self")
  }

  break;
  }

  } else {
  if (lingoBinary("eq", tEvent, symbol("keyDown"))) {
  var tKey = theProperty("key");
  if (lingoBinary("eq", tElemID, "login")) {
  switch (tKey) {
case "\t":
  var tField = callMethod("getElement", tWndObj, "login");
  callMethod("setFocus", tField, 0)
  tField = callMethod("getElement", tWndObj, "password");
  callMethod("setFocus", tField, 1)
  setTheProperty("selStart", 0);
  setTheProperty("selEnd", callMethod("getText", tField).char.count);
  break;
case "\r":
  callMethod("SendLogin", _me)
  break;
  }

  } else {
  if (lingoBinary("eq", tElemID, "password")) {
  switch (tKey) {
case "\t":
  tField = callMethod("getElement", tWndObj, "password");
  callMethod("setFocus", tField, 0)
  tField = callMethod("getElement", tWndObj, "login");
  callMethod("setFocus", tField, 1)
  setTheProperty("selStart", 0);
  setTheProperty("selEnd", callMethod("getText", tField).char.count);
  break;
case "\r":
  callMethod("SendLogin", _me)
  break;
  }

  switch (theProperty("keyCode")) {
case 48:
  return 0;
case 49:
  return 1;
case 51:
  if (lingoBinary("gt", meProp(_me, "pTempPassword").count, 0)) {
  callMethod("deleteAt", meProp(_me, "pTempPassword"), meProp(_me, "pTempPassword").count)
  }

  break;
case 117:
  setMeProp(_me, "pTempPassword", new LingoList([]));
  break;
  default:
  var tValidKeys = "abcdefghijlkmnopqrstuvwxyz0123456789_-=+?!@<>:.,";
  var tAscii = callNamed("charToNum", theProperty("key"));
  var tMaxLen = 36;
  if (lingoBinary("and", lingoBinary("gt", tAscii, 31), lingoBinary("lt", tAscii, 128))) {
  if (lingoBinary("or", lingoBinary("contains", tValidKeys, theProperty("key")), lingoBinary("eq", tValidKeys, ""))) {
  if (lingoBinary("lt", meProp(_me, "pTempPassword").count, tMaxLen)) {
  callMethod("append", meProp(_me, "pTempPassword"), theProperty("key"))
  }

  }

  }

  }

  callMethod("updatePassword", _me)
  return 1;
  }

  }

  }

  }

}

