// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerViewFriendRequest / _EventProc

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
case "mes.accept.button":
  if (callNamed("objectp", meProp(_me, "m_rRequest"))) {
  var tMsg = new LingoPropList([symbol("int"), meProp(_me, "m_rRequest").requester_id]);
  callMethod("AcceptFriendRequest", callMethod("getHandler", _me), tMsg)
  }

  callMethod("removeRequest", _me)
  break;
case "mes.deny.button":
  if (callNamed("objectp", meProp(_me, "m_rRequest"))) {
  tMsg = new LingoPropList([symbol("int"), meProp(_me, "m_rRequest").requester_id]);
  callMethod("DeclineFriendRequest", callMethod("getHandler", _me), tMsg)
  }

  callMethod("removeRequest", _me)
  break;
case "mes.ignore.button":
  var t_txt = callNamed("getText", "mes.dialog.ignorerequest.info");
  var t_title = callNamed("getText", "mes.dialog.ignorerequest.title");
  var t_btn1 = callNamed("getText", "mes.dialog.ignorerequest.btn1");
  var t_btn2 = callNamed("getText", "mes.dialog.ignorerequest.btn2");
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "mes.confirm.ignore.dialog", 2, 1);
  callMethod("setText", t, t_txt, t_title, t_btn1, t_btn2)
  callMethod("show", t)
  break;
  }

}

