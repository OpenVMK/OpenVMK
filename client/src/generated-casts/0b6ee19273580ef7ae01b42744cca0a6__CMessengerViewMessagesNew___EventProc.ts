// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerViewMessagesNew / _EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EventProc(_me: LingoMe, a_kEvent: LingoValue, a_sElemID: LingoValue, a_rParam: LingoValue) {
  switch (a_sElemID) {
case "mes.reply.button":
  var t_rRecipient = new LingoPropList([symbol("buddyname"), meProp(_me, "m_sSender"), symbol("userID"), meProp(_me, "m_rCurrentMessage").senderID]);
  callMethod("setRecipient", callMethod("getComponent", _me), t_rRecipient)
  callMethod("changeView", callMethod("getInterface", _me), "messagescompose")
  break;
case "mes.nextmessage.button":
  var t_bNormalMessage = callNamed("voidp", callMethod("getaProp", meProp(_me, "m_rCurrentMessage"), symbol("url")));
  if (t_bNormalMessage) {
  callMethod("deleteMessage", callMethod("getComponent", _me))
  } else {
  callMethod("moveMessageToBack", callMethod("getComponent", _me))
  }

  callMethod("changeView", callMethod("getInterface", _me), "messagesnone")
  break;
case "mes.report.button":
  var t_txt = callNamed("getText", "mes.dialog.confirm.report.text");
  var t_title = callNamed("getText", "mes.dialog.confirm.report.title");
  var t_btn1 = callNamed("getText", "mes.dialog.confirm.report.btn.cancel");
  var t_btn2 = callNamed("getText", "mes.dialog.confirm.report.btn.ok");
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "mes.report.dialog", 2, 1);
  callMethod("setText", t, t_txt, t_title, t_btn1, t_btn2)
  callMethod("show", t)
  break;
  }

}

