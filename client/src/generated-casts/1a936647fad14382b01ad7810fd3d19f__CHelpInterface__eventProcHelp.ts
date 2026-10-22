// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpInterface / eventProcHelp

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcHelp(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_windowTitle"));
  if (lingoBinary("eq", tEvent, symbol("mouseDown"))) {
  } else {
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  switch (tElemID) {
case "hlp.tab.topics.passive":
  callNamed("executeMessage", "PlayInterfaceSound", "popup-tab-change")
  callMethod("changeView", _me, "vmk_hlp_topics.window")
  callMethod("UpdateScrollBar", _me)
  break;
case "hlp.tab.askmods.passive":
  callNamed("executeMessage", "PlayInterfaceSound", "popup-tab-change")
  callMethod("changeView", _me, "vmk_hlp_askmods.window")
  break;
case "hlp.nextpage.button":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callMethod("nextPage", _me.m_pHelpMenu.pContent)
  callMethod("changeView", _me, "vmk_hlp_topics.window")
  callMethod("UpdateScrollBar", _me)
  break;
case "hlp.previouspage.button":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callMethod("previousPage", _me.m_pHelpMenu.pContent)
  callMethod("changeView", _me, "vmk_hlp_topics.window")
  callMethod("UpdateScrollBar", _me)
  break;
case "hlp.topicslist":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callMethod("clickMenu", meProp(_me, "m_pHelpMenu"), tParm.locV)
  callMethod("changeView", _me, "vmk_hlp_topics.window")
  callMethod("UpdateScrollBar", _me)
  break;
case "hlp.answerslist":
  callNamed("put", lingoBinary("joinPad", "Click page", tParm))
  var t_clickOnLink = callMethod("clickPage", meProp(_me, "m_pHelpMenu").pContent, tParm);
  if (t_clickOnLink) {
  callMethod("changeView", _me, "vmk_hlp_topics.window")
  }

  break;
case "hlp.problem1":
case "hlp.problem2":
case "hlp.problem3":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callMethod("clickElement", meProp(_me, "m_pRadioButtons"), lingoBinary("join", tElemID, ".button"))
  callMethod("updateMenu", meProp(_me, "m_pRadioButtons"))
  callMethod("checkActivateCallforhelp", _me)
  break;
case "hlp.problem1.button":
case "hlp.problem2.button":
case "hlp.problem3.button":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callMethod("clickElement", meProp(_me, "m_pRadioButtons"), tElemID)
  callMethod("updateMenu", meProp(_me, "m_pRadioButtons"))
  callMethod("checkActivateCallforhelp", _me)
  break;
case "hlp.cancel.button":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callMethod("setText", callMethod("getElement", tWndObj, "hlp.harrasser.input"), "")
  callMethod("setText", callMethod("getElement", tWndObj, "hlp.describe.input"), "")
  callMethod("clickElement", meProp(_me, "m_pRadioButtons"), "hlp.problem3.button")
  callMethod("updateMenu", meProp(_me, "m_pRadioButtons"))
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callNamed("removeUpdate", callMethod("getID", _me))
  callMethod("showHideHelp", callMethod("getComponent", _me))
  break;
case "hlp.alertmod.button":
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  callMethod("checkCallForHelp", _me)
  break;
case "close":
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callNamed("removeUpdate", callMethod("getID", _me))
  callMethod("showHideHelp", callMethod("getComponent", _me))
  break;
  break;
  break;
  break;
  break;
  }

  } else {
  if (lingoBinary("eq", tEvent, symbol("keyDown"))) {
  if (lingoBinary("eq", tElemID, "hlp.describe.input")) {
  if (lingoBinary("neq", meProp(_me, "m_rHelpField"), 0)) {
  switch (theProperty("keyCode")) {
case 123:
case 124:
case 125:
case 126:
  callMethod("updateContent", meProp(_me, "m_rHelpField"))
  callNamed("pass")
  break;
case 117:
case 51:
  callMethod("updateContent", meProp(_me, "m_rHelpField"))
  callNamed("pass")
  break;
case 36:
  var t_pass = callMethod("CheckContent", meProp(_me, "m_rHelpField"));
  if (t_pass) {
  callMethod("updateContent", meProp(_me, "m_rHelpField"))
  var m_bHelpContentOk = 1;
  }

  break;
case 49:
  var tElem = callMethod("getElement", tWndObj, tElemID);
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

  t_pass = callMethod("CheckContent", meProp(_me, "m_rHelpField"));
  if (t_pass) {
  callMethod("updateContent", meProp(_me, "m_rHelpField"))
  }

  break;
  default:
  if ((lingoTruthy(callMethod("updateContent", meProp(_me, "m_rHelpField"))) ? 0 : 1)) {
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

  tElem = callMethod("getElement", tWndObj, tElemID);
  if (lingoBinary("neq", tElem, 0)) {
  if (lingoBinary("gte", tElem.pMember.text.char.count, 255)) {
  var t_txt = callNamed("getText", "mes.msgtoolong.text");
  var t_title = callNamed("getText", "mes.msgtoolong.title");
  var t_btn1 = callNamed("getText", "mes.msgtoolong.OK");
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "mes.msgtoolong.dialog", 1, 1);
  callMethod("setText", t, t_txt, t_title, t_btn1)
  callMethod("show", t)
  setThePropOf(tElem.pMember, "text", tElem.pMember.char.range(1, 255));
  return 1;
  }

  callMethod("checkActivateCallforhelp", _me)
  }

  break;
  break;
  break;
  break;
  }

  }

  }

  } else {
  if (lingoBinary("eq", tEvent, symbol("keyUp"))) {
  if (lingoBinary("eq", tElemID, "hlp.describe.input")) {
  if (lingoBinary("neq", meProp(_me, "m_rHelpField"), 0)) {
  switch (theProperty("keyCode")) {
case 36:
case 49:
  break;
  default:
  callMethod("CheckWord", meProp(_me, "m_rHelpField"))
  break;
  }

  }

  callMethod("checkActivateCallforhelp", _me)
  }

  }

  }

  }

  }

}

