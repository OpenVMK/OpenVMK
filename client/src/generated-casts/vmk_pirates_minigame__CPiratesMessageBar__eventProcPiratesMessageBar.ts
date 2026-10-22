// vmk_pirates_minigame.cct / CPiratesMessageBar / eventProcPiratesMessageBar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcPiratesMessageBar(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWndTitle"));
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  switch (tElemID) {
case "pirates.exitgame.button":
  if ((lingoTruthy(callNamed("DialogWindowExists", "pirates_exit")) ? 0 : 1)) {
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "pirates_exit", 2);
  callMethod("show", t)
  callMethod("setText", t, "Do you want to exit?", "Pirates Of The Caribbean", "No", "Yes")
  }

  break;
case "button.invinsibility":
  callNamed("executeMessage", symbol("SendMinigameAction"), 5, new LingoList([]))
  break;
  }

  } else {
  if (lingoBinary("eq", tEvent, symbol("keyDown"))) {
  var t_iKeyCode = theProperty("keyCode");
  if (lingoBinary("or", lingoBinary("eq", theProperty("key"), "\r"), lingoBinary("eq", theProperty("key"), "\x03"))) {
  t_iKeyCode = 36;
  }

  if (lingoBinary("neq", meProp(_me, "m_pCannedField"), 0)) {
  switch (t_iKeyCode) {
case 123:
case 124:
case 125:
case 126:
  callMethod("updateContent", meProp(_me, "m_pCannedField"))
  callNamed("pass")
  break;
case 117:
case 51:
  callMethod("updateContent", meProp(_me, "m_pCannedField"))
  callNamed("pass")
  break;
case 36:
  var t_pass = callMethod("CheckContent", meProp(_me, "m_pCannedField"));
  if (t_pass) {
  callMethod("SendMessage", _me, meProp(_me, "m_pCannedField").m_ar_cWords)
  callMethod("reset", meProp(_me, "m_pCannedField"))
  }

  return 1;
case 49:
  t_pass = callMethod("CheckContent", meProp(_me, "m_pCannedField"));
  if (t_pass) {
  callMethod("updateContent", meProp(_me, "m_pCannedField"))
  }

  break;
  default:
  if ((lingoTruthy(callMethod("updateContent", meProp(_me, "m_pCannedField"))) ? 0 : 1)) {
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

  var tElem = callMethod("getElement", tWndObj, tElemID);
  if (lingoBinary("neq", tElem, 0)) {
  var t_iChar = lingoBinary("add", tElem.pMember.text.char.count, 1);
  if (lingoBinary("gte", callMethod("charPosToLoc", tElem.pMember, t_iChar).locH, lingoBinary("sub", tElem.pMember.width, 10))) {
  return 1;
  }

  }

  }

  }

  }

}

