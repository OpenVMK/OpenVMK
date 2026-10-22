// 312ea5aa5d6c166d8f614e2d3c0e4920.cct / CGiftInterface / _GiftEventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _GiftEventProc(_me: LingoMe, a_kEvent: LingoValue, a_sElemID: LingoValue, a_vParam: LingoValue, a_sID: LingoValue) {
  if ((lingoTruthy(meProp(_me, "m_bLoadingImage")) ? 0 : 1)) {
  if (lingoBinary("eq", a_kEvent, symbol("mouseUp"))) {
  switch (a_sElemID) {
case "gift.template1":
case "gift.template2":
case "gift.template3":
case "gift.template4":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callMethod("clickElement", meProp(_me, "m_pRadioButtons"), a_sElemID)
  callMethod("updateMenu", meProp(_me, "m_pRadioButtons"))
  callMethod("UpdateView", _me, a_sElemID)
  break;
case "close":
case "mes.cancelcompose.button":
case "basic.dialog1.button1":
  callNamed("removeObject", callMethod("getID", _me))
  break;
case "help":
  callNamed("executeMessage", symbol("open_help_page"), "help.stuff.gifts", 1)
  break;
case "mes.sendmessage.button":
  callMethod("ConfirmData", _me)
  break;
  default:
  callNamed("put", a_sElemID)
  break;
  break;
  break;
  break;
  break;
  }

  }

  if (lingoBinary("or", lingoBinary("eq", a_sElemID, "mes.messages.messageinput"), lingoBinary("eq", a_sElemID, "gift.message.hd"))) {
  if (lingoBinary("eq", a_sElemID, "mes.messages.messageinput")) {
  var t_pCannedField = meProp(_me, "m_pComposeMessage");
  } else {
  t_pCannedField = meProp(_me, "m_rMessageHd");
  }

  var tElem = callMethod("getElement", meProp(_me, "m_rWindow"), a_sElemID);
  if (lingoBinary("eq", a_kEvent, symbol("keyDown"))) {
  var t_iKeyCode = theProperty("keyCode");
  if (lingoBinary("or", lingoBinary("eq", theProperty("key"), "\r"), lingoBinary("eq", theProperty("key"), "\x03"))) {
  t_iKeyCode = 36;
  }

  if (lingoBinary("and", lingoBinary("neq", t_pCannedField, 0), tElem.pMember.editable)) {
  switch (t_iKeyCode) {
case 123:
case 124:
case 125:
case 126:
  callMethod("updateContent", t_pCannedField)
  callNamed("pass")
  break;
case 117:
case 51:
  callMethod("updateContent", t_pCannedField)
  callNamed("pass")
  break;
case 36:
  var t_pass = callMethod("CheckContent", t_pCannedField);
  break;
case 49:
  var tSelection = tElem.pMember.selection;
  var tCharcount = tElem.pMember.text.char.count;
  if (lingoBinary("gt", tCharcount, 0)) {
  if (lingoBinary("eq", tElem.pMember.text.char[tSelection[2]], " ")) {
  return 1;
  }

  if (lingoBinary("lte", lingoBinary("add", tSelection[2], 1), tCharcount)) {
  if (lingoBinary("eq", tElem.pMember.text.char[lingoBinary("add", tSelection[2], 1)], " ")) {
  return 1;
  }

  }

  }

  t_pass = callMethod("CheckContent", t_pCannedField);
  if (t_pass) {
  callMethod("updateContent", t_pCannedField)
  }

  break;
  default:
  if ((lingoTruthy(callMethod("updateContent", t_pCannedField)) ? 0 : 1)) {
  return 1;
  }

  var tValidKeys = lingoBinary("join", "abcdefghijlkmnopqrstuvwxyz0123456789_-=+?!@<>:.,'*/()[]\\#;", "\"");
  var tAscii = callNamed("charToNum", theProperty("key"));
  var t_allow = 0;
  if (lingoBinary("and", lingoBinary("gt", tAscii, 31), lingoBinary("lt", tAscii, 128))) {
  if (lingoBinary("or", lingoBinary("contains", tValidKeys, theProperty("key")), lingoBinary("eq", tValidKeys, ""))) {
  t_allow = 1;
  }

  }

  if ((lingoTruthy(t_allow) ? 0 : 1)) {
  return 1;
  }

  break;
  break;
  break;
  break;
  }

  if (lingoBinary("neq", tElem, 0)) {
  var t_iChar = lingoBinary("add", tElem.pMember.text.char.count, 1);
  if (lingoBinary("gte", callMethod("charPosToLoc", tElem.pMember, t_iChar).locH, lingoBinary("sub", tElem.pMember.width, 10))) {
  return 1;
  }

  var m_ar_lastSelection = tElem.pMember.selection;
  }

  }

  } else {
  if (lingoBinary("eq", a_kEvent, symbol("keyUp"))) {
  t_iKeyCode = theProperty("keyCode");
  if (lingoBinary("and", lingoBinary("neq", t_pCannedField, 0), tElem.pMember.editable)) {
  switch (t_iKeyCode) {
case 36:
case 49:
  break;
  default:
  callMethod("CheckWord", t_pCannedField)
  break;
  }

  tElem = callMethod("getElement", meProp(_me, "m_rWindow"), a_sElemID);
  if (lingoBinary("neq", tElem, 0)) {
  m_ar_lastSelection = tElem.pMember.selection;
  }

  }

  }

  }

  }

  } else {
  if (lingoBinary("eq", a_kEvent, symbol("mouseUp"))) {
  switch (a_sElemID) {
case "close":
  callNamed("removeObject", callMethod("getID", _me))
  break;
case "help":
  callNamed("executeMessage", symbol("open_help_page"), "help.stuff.gifts", 1)
  break;
  }

  }

  }

}

