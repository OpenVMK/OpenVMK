// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerViewMessagesNew / showCurrentMessage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showCurrentMessage(_me: LingoMe) {
  if (lingoBinary("eq", meProp(_me, "m_ar_inbox").count, 1)) {
  callMethod("setButtonTxt", _me, "mes.nextmessage.button", callNamed("getText", "mes.deletemessage"))
  if (callNamed("stringp", callMethod("getaProp", meProp(_me, "m_rCurrentMessage"), symbol("url")))) {
  callMethod("setButtonState", _me, "mes.nextmessage.button", 0)
  } else {
  callMethod("setButtonState", _me, "mes.nextmessage.button", 1)
  }

  } else {
  callMethod("setButtonTxt", _me, "mes.nextmessage.button", callNamed("getText", "mes.nextmessage"))
  }

  if (lingoBinary("eq", meProp(_me, "m_rCurrentMessage").senderID, 0)) {
  var t_sName = callNamed("getText", "mes.administrator.name", "VMK Administrator");
  callMethod("setButtonState", _me, "mes.reply.button", 0)
  callMethod("setButtonState", _me, "mes.report.button", 0)
  } else {
  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", meProp(_me, "m_rCurrentMessage"), symbol("reported")))) ? 0 : 1)) {
  callMethod("setButtonState", _me, "mes.report.button", 0)
  } else {
  callMethod("setButtonState", _me, "mes.report.button", 1)
  }

  var t_ar_entry = new LingoPropList([symbol("index"), -float(1), symbol("entry"), undefined]);
  if (callMethod("findAddressbookEntry", callMethod("getComponent", _me), meProp(_me, "m_rCurrentMessage").senderID, t_ar_entry)) {
  t_sName = t_ar_entry.entry.buddyname;
  } else {
  t_sName = "Unknown";
  }

  }

  setMeProp(_me, "m_sSender", t_sName);
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "mes.messages.sender"), t_sName)
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "mes.messages.time"), meProp(_me, "m_rCurrentMessage").date)
  var t_bNormalMessage = callNamed("voidp", callMethod("getaProp", meProp(_me, "m_rCurrentMessage"), symbol("url")));
  if (t_bNormalMessage) {
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "mes.messages.messagetext"), meProp(_me, "m_rCurrentMessage").content)
  } else {
  var t_sText = lingoBinary("join", lingoBinary("join", lingoBinary("join", meProp(_me, "m_rCurrentMessage").content, "\r"), "\r"), meProp(_me, "m_rCurrentMessage").Caption);
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "mes.messages.messagetext"), t_sText)
  var t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), "mes.messages.messagetext");
  meProp(_me, "m_rCurrentMessage")[symbol("clickarea")] = t_rElem.pTextMem.rect;
  }

}

