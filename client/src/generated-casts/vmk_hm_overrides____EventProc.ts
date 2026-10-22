// vmk_hm_overrides.cct /  / EventProc

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
  var t_iKeyCode = callNamed("createDialogWindow", callMethod("getID", _me), "hauntedmansion_exit", 2, 1);
  callMethod("show", t_iKeyCode)
  callMethod("setText", t_iKeyCode, callNamed("getText", "hmg.dialog.exit.text"), callNamed("getText", "hmg.dialog.exit.title"), callNamed("getText", "hmg.dialog.exit.no"), callNamed("getText", "hmg.dialog.exit.yes"))
  }

  }

  }

  } else {
  if (lingoBinary("eq", tEvent, symbol("keyDown"))) {
  var tElem = callNamed("keyCode");
  callNamed("trace", tElem)
  if (lingoBinary("and", lingoBinary("gte", tElem, 82), lingoBinary("lte", tElem, 92))) {
  callNamed("trace", "skipping key?")
  return 1;
  }

  if (lingoBinary("or", lingoBinary("eq", callNamed("key"), "\r"), lingoBinary("eq", callNamed("key"), "\x03"))) {
  tElem = 36;
  }

  if (lingoBinary("eq", tElem, 51)) {
  callMethod("updateContent", _me.m_pCannedField)
  callNamed("pass")
  } else {
  if (lingoBinary("eq", tElem, 36)) {
  var tValidKeys = callMethod("CheckContent", _me.m_pCannedField);
  if (tValidKeys) {
  callMethod("sendMessage", _me, _me.m_pCannedField.m_ar_cWords)
  callMethod("setText", callMethod("getElement", callNamed("getWindow", _me.m_sWindowName), "pirates.chat.field"), "")
  }

  return 1;
  } else {
  if (lingoBinary("eq", tElem, 49)) {
  tValidKeys = callMethod("CheckContent", _me.m_pCannedField);
  if (tValidKeys) {
  callMethod("updateContent", _me.m_pCannedField)
  }

  } else {
  if ((lingoTruthy(callMethod("updateContent", _me.m_pCannedField)) ? 0 : 1)) {
  return 1;
  }

  }

  }

  }

  var t_iChar = "";
  var t_allow = callNamed("charToNum", callNamed("key"));
  var tAscii = 0;
  if (lingoBinary("and", lingoBinary("gt", t_allow, 31), lingoBinary("lt", t_allow, 128))) {
  if (lingoBinary("or", lingoBinary("contains", t_iChar, callNamed("key")), lingoBinary("eq", t_iChar, ""))) {
  tAscii = 1;
  }

  }

  if ((lingoTruthy(tAscii) ? 0 : 1)) {
  return 1;
  }

  var t_pass = callMethod("getElement", tWndObj, tElemID);
  if (lingoBinary("neq", t_pass, 0)) {
  var t = lingoBinary("add", t_pass.pMember.text.char.count, 1);
  if (lingoBinary("gte", callMethod("charPosToLoc", t_pass.pMember, t).locH, lingoBinary("sub", t_pass.pMember.width, 10))) {
  return 1;
  }

  }

  } else {
  if (lingoBinary("eq", tEvent, symbol("keyUp"))) {
  tElem = callNamed("keyCode");
  if (lingoBinary("neq", _me.m_pCannedField, 0)) {
  if (lingoBinary("neq", tElem, 36)) {
  if (lingoBinary("eq", tElem, 49)) {
  } else {
  callMethod("CheckWord", _me.m_pCannedField)
  }

  }

  }

  }

  }

  }

}

