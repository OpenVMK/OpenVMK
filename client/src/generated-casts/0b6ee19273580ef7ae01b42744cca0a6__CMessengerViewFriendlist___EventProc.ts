// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerViewFriendlist / _EventProc

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
case "mes.friendslist":
  var t_ar_event = new LingoPropList([symbol("found"), 0, symbol("event"), "", symbol("client"), undefined, symbol("route"), new LingoPropList([])]);
  callMethod("EventProc", meProp(_me, "m_rAddressbookList"), a_rParam, t_ar_event)
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), a_sElemID), callMethod("render", meProp(_me, "m_rAddressbookList")))
  if (t_ar_event.found) {
  callMethod("changeView", callMethod("getInterface", _me), "friendinfo")
  }

  break;
case "mes.friends.requestamount":
case "mes.view.button":
  if (lingoBinary("gt", meProp(_me, "m_ar_Requests").count, 0)) {
  callMethod("changeView", callMethod("getInterface", _me), "friendrequest")
  }

  break;
  break;
  }

}

