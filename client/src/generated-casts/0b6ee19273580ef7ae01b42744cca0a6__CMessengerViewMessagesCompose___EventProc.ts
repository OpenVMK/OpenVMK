// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerViewMessagesCompose / _EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EventProc(_me: LingoMe, a_kEvent: LingoValue, a_sElemID: LingoValue, a_rParam: LingoValue) {
  if (lingoBinary("eq", a_sElemID, "mes.messages.messageinput")) {
  if (lingoBinary("eq", a_kEvent, symbol("keyUp"))) {
  switch (theProperty("keyCode")) {
case 36:
case 49:
  break;
  default:
  callMethod("CheckWord", meProp(_me, "m_pComposeMessage"))
  break;
  }

  } else {
  if (lingoBinary("eq", a_kEvent, symbol("keyDown"))) {
  var t_iKeyCode = theProperty("keyCode");
  switch (t_iKeyCode) {
case 123:
case 124:
case 125:
case 126:
  callMethod("updateContent", meProp(_me, "m_pComposeMessage"))
  callNamed("pass")
  break;
case 117:
case 51:
  callMethod("updateContent", meProp(_me, "m_pComposeMessage"))
  callNamed("pass")
  break;
case 36:
case 49:
  var t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), a_sElemID);
  var tSelection = t_rElem.pMember.selection;
  var tCharcount = t_rElem.pMember.text.char.count;
  if (lingoBinary("gt", tCharcount, 0)) {
  if (lingoBinary("eq", t_rElem.pMember.text.char[tSelection[2]], " ")) {
  return 1;
  }

  if (lingoBinary("lte", lingoBinary("add", tSelection[2], 1), tCharcount)) {
  if (lingoBinary("eq", t_rElem.pMember.text.char[lingoBinary("add", tSelection[2], 1)], " ")) {
  return 1;
  }

  }

  }

  callMethod("updateContent", meProp(_me, "m_pComposeMessage"))
  var t_bCheck = callMethod("CheckContent", meProp(_me, "m_pComposeMessage"));
  break;
  default:
  if ((lingoTruthy(callMethod("updateContent", meProp(_me, "m_pComposeMessage"))) ? 0 : 1)) {
  return 1;
  }

  break;
  break;
  break;
  break;
  break;
  }

  t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), a_sElemID);
  if (lingoBinary("neq", t_rElem, 0)) {
  if (lingoBinary("gte", t_rElem.pMember.text.char.count, 255)) {
  var t_txt = callNamed("getText", "mes.msgtoolong.text");
  var t_title = callNamed("getText", "mes.msgtoolong.title");
  var t_btn1 = callNamed("getText", "mes.msgtoolong.OK");
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "mes.msgtoolong.dialog", 1, 1);
  callMethod("setText", t, t_txt, t_title, t_btn1)
  callMethod("show", t)
  setThePropOf(t_rElem.pMember, "text", t_rElem.pMember.char.range(1, 255));
  return 1;
  }

  }

  }

  }

  }

  switch (a_sElemID) {
case "mes.cancelcompose.button":
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "mes.messages.messageinput"), "")
  callMethod("changeView", callMethod("getInterface", _me), "friendlist")
  break;
case "mes.sendmessage.button":
  var t_okToSend = callMethod("CheckContent", meProp(_me, "m_pComposeMessage"));
  callMethod("setRecipient", callMethod("getComponent", _me), undefined)
  if (t_okToSend) {
  callMethod("SendInstantMessage", callMethod("getHandler", _me), new LingoList([1, new LingoList([meProp(_me, "m_rRecipient").userID]), callMethod("GetContent", meProp(_me, "m_pComposeMessage"))]))
  callMethod("changeView", callMethod("getInterface", _me), "friendlist")
  callMethod("reset", meProp(_me, "m_pComposeMessage"))
  } else {
  t_txt = callNamed("getText", "mes.dialog.dictionaryError.info");
  t_title = callNamed("getText", "mes.dialog.dictionaryError.title");
  t_btn1 = callNamed("getText", "mes.dialog.dictionaryError.btn1");
  t = callNamed("createDialogWindow", callMethod("getID", _me), "mes.dialog.dictionaryError", 1, 1);
  callMethod("setText", t, t_txt, t_title, t_btn1)
  callMethod("show", t)
  }

  break;
  }

}

