// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerViewFriendInfo / _EventProc

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
  callMethod("showAddressBookEntryInfo", _me)
  }

  break;
case "mes.sameroom.button":
  if (callNamed("windowExists", "Navigator Window")) {
  var t_rNavigator = callNamed("getWindow", "Navigator Window");
  if (callMethod("getProperty", t_rNavigator, symbol("visible"))) {
  callNamed("executeMessage", symbol("ui_navigator"))
  }

  }

  var t_rFriend = callMethod("GetNode", callMethod("GetActive", meProp(_me, "m_rAddressbookList")));
  callMethod("GoToFriend", callMethod("getHandler", _me), new LingoList([t_rFriend.userID]))
  callNamed("executeMessage", "PlayInterfaceSound", "close-popup")
  callMethod("hide", callMethod("getInterface", _me))
  break;
case "mes.remove.button":
  t_rFriend = callMethod("GetNode", callMethod("GetActive", meProp(_me, "m_rAddressbookList")));
  var t_txt = callNamed("replaceChunks", callNamed("getText", "mes.friends.removeConfirmInfo"), "%friendName%", t_rFriend.buddyname);
  var t_title = callNamed("getText", "mes.friends.removeConfirmHD");
  var t_btn1 = callNamed("getText", "mes.friends.removeConfirmDialogButton1");
  var t_btn2 = callNamed("getText", "mes.friends.removeConfirmDialogButton2");
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "mes.remove.dialog", 2, 1);
  callMethod("setText", t, t_txt, t_title, t_btn1, t_btn2)
  callMethod("show", t)
  break;
case "mes.sendmessage.button":
  t_rFriend = callMethod("GetNode", callMethod("GetActive", meProp(_me, "m_rAddressbookList")));
  callMethod("setRecipient", callMethod("getComponent", _me), t_rFriend)
  callMethod("changeView", callMethod("getInterface", _me), "messagescompose")
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

