// vmk_hm_overrides.cct / CHMWindowUI / EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function EventProc(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  var tWndObj = callNamed("getWindow", _me.m_sWindowName);
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  if (lingoBinary("eq", tElemID, "hm.keyoptions.button")) {
  callMethod("ShowWindow", _me.m_rClient, "Keys")
  } else {
  if (lingoBinary("eq", tElemID, "pirates.exitgame.button")) {
  if ((lingoTruthy(callNamed("DialogWindowExists", "hauntedmansion_exit")) ? 0 : 1)) {
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "hauntedmansion_exit", 2, 1);
  callMethod("show", t)
  callMethod("setText", t, callNamed("getText", "hmg.dialog.exit.text"), callNamed("getText", "hmg.dialog.exit.title"), callNamed("getText", "hmg.dialog.exit.no"), callNamed("getText", "hmg.dialog.exit.yes"))
  }

  }

  }

  } else {
  if (lingoBinary("eq", tEvent, symbol("keyDown"))) {
  var t_iKeyCode = callNamed("keyCode");
  callNamed("trace", t_iKeyCode)
  if (lingoBinary("and", lingoBinary("gte", t_iKeyCode, 82), lingoBinary("lte", t_iKeyCode, 92))) {
  callNamed("trace", "skipping key?")
  return 1;
  }

  if (lingoBinary("or", lingoBinary("eq", callNamed("key"), "\r"), lingoBinary("eq", callNamed("key"), "\x03"))) {
  t_iKeyCode = 36;
  }

  if (lingoBinary("eq", t_iKeyCode, 51)) {
  callMethod("updateContent", _me.m_pCannedField)
  callNamed("pass")
  } else {
  if (lingoBinary("eq", t_iKeyCode, 36)) {
  var t_pass = callMethod("CheckContent", _me.m_pCannedField);
  if (t_pass) {
  callMethod("sendMessage", _me, _me.m_pCannedField.m_ar_cWords)
  callMethod("setText", callMethod("getElement", callNamed("getWindow", _me.m_sWindowName), "pirates.chat.field"), "")
  }

  return 1;
  } else {
  if (lingoBinary("eq", t_iKeyCode, 49)) {
  t_pass = callMethod("CheckContent", _me.m_pCannedField);
  if (t_pass) {
  callMethod("updateContent", _me.m_pCannedField)
  }

  } else {
  if ((lingoTruthy(callMethod("updateContent", _me.m_pCannedField)) ? 0 : 1)) {
  return 1;
  }

  }

  }

  }

  var tValidKeys = "";
  var tAscii = callNamed("charToNum", callNamed("key"));
  var t_allow = 0;
  if (lingoBinary("and", lingoBinary("gt", tAscii, 31), lingoBinary("lt", tAscii, 128))) {
  if (lingoBinary("or", lingoBinary("contains", tValidKeys, callNamed("key")), lingoBinary("eq", tValidKeys, ""))) {
  t_allow = 1;
  }

  }

  if ((lingoTruthy(t_allow) ? 0 : 1)) {
  return 1;
  }

  var tElem = callMethod("getElement", tWndObj, tElemID);
  if (lingoBinary("neq", tElem, 0)) {
  var t_iChar = lingoBinary("add", tElem.pMember.text.char.count, 1);
  if (lingoBinary("gte", callMethod("charPosToLoc", tElem.pMember, t_iChar).locH, lingoBinary("sub", tElem.pMember.width, 10))) {
  return 1;
  }

  }

  } else {
  if (lingoBinary("eq", tEvent, symbol("keyUp"))) {
  t_iKeyCode = callNamed("keyCode");
  if (lingoBinary("neq", _me.m_pCannedField, 0)) {
  if (lingoBinary("neq", t_iKeyCode, 36)) {
  if (lingoBinary("eq", t_iKeyCode, 49)) {
  } else {
  callMethod("CheckWord", _me.m_pCannedField)
  }

  }

  }

  }

  }

  }

}

