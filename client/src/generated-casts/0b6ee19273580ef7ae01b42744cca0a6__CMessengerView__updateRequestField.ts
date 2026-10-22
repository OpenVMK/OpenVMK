// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerView / updateRequestField

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateRequestField(_me: LingoMe) {
  var tElem = callMethod("getElement", _me.m_rWindow, "mes.friends.requestamount");
  var t_ar_requests = callMethod("GetRequests", callMethod("getComponent", _me));
  var t_iCount = t_ar_requests.count;
  if (callNamed("objectp", tElem)) {
  if (lingoBinary("gt", t_iCount, 0)) {
  callMethod("setButtonState", _me, "mes.view.button", 1)
  if (lingoBinary("eq", t_iCount, 1)) {
  var t_txt = callNamed("getText", "mes.friends.requestamount.one");
  } else {
  t_txt = callNamed("replaceChunks", callNamed("getText", "mes.friends.requestamount.many"), "%requestCount%", t_iCount);
  }

  callMethod("setText", tElem, t_txt)
  callMethod("setProperty", tElem, symbol("cursor"), new LingoList(["cursor.finger", "cursor.finger.mask"]))
  } else {
  callMethod("setButtonState", _me, "mes.view.button", 0)
  callMethod("setText", tElem, callNamed("getText", "mes.friends.requestamount"))
  callMethod("setProperty", tElem, symbol("cursor"), symbol("arrow"))
  }

  }

}

