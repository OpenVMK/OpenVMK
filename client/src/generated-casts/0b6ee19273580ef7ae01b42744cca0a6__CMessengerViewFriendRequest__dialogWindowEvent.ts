// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerViewFriendRequest / dialogWindowEvent

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
case "mes.confirm.ignore.dialog":
  switch (t_dialogEvent) {
case symbol("dialogOK"):
  if (callNamed("objectp", meProp(_me, "m_rRequest"))) {
  var tMsg = new LingoPropList([symbol("int"), meProp(_me, "m_rRequest").requester_id]);
  callMethod("DeclineFriendRequest", callMethod("getHandler", _me), tMsg)
  callMethod("IgnoreFriend", callMethod("getHandler", _me), tMsg)
  }

  callMethod("removeRequest", _me)
  break;
  }

  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Unknown Dialog Window", t_dialogName))
  }

}

