// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerInterface / toggleTabs

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function toggleTabs(_me: LingoMe, a_sView: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rCurrentView"))) {
  var t_messages = callMethod("getElement", meProp(_me, "m_rWindow"), "mes.tab.messages.active");
  var t_friends = callMethod("getElement", meProp(_me, "m_rWindow"), "mes.tab.friends.active");
  switch (a_sView) {
case "friendlist":
case "friendinfo":
case "friendrequest":
  callMethod("hide", t_messages)
  callMethod("show", t_friends)
  callMethod("startPolling", callMethod("getComponent", _me))
  break;
case "messagesnone":
case "messagesnew":
case "messagescompose":
  callMethod("show", t_messages)
  callMethod("hide", t_friends)
  callMethod("stopPolling", callMethod("getComponent", _me))
  break;
  break;
  break;
  break;
  break;
  }

  }

}

