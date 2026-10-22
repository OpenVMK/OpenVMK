// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerViewFriendInfo / dialogWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, t_dialogName: LingoValue, t_dialogEvent: LingoValue) {
  switch (t_dialogName) {
case "mes.remove.dialog":
  switch (t_dialogEvent) {
case symbol("dialogOK"):
  var t_rFriend = callMethod("GetNode", callMethod("GetActive", meProp(_me, "m_rAddressbookList")));
  if (callNamed("objectp", t_rFriend)) {
  callMethod("RemoveFriendship", callMethod("getHandler", _me), new LingoList([t_rFriend.userID]))
  callMethod("removeFriend", callMethod("getComponent", _me), t_rFriend.userID)
  }

  callMethod("changeView", callMethod("getInterface", _me), "friendlist")
  break;
  }

  break;
  default:
  callNamed("put", lingoBinary("joinPad", "CMessengerViewFriendInfo: Unknown Dialog", t_dialogName))
  }

}

