// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerComponent / InstantmessageReceived

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function InstantmessageReceived(_me: LingoMe, a_ar_msg: LingoValue) {
  if (lingoBinary("eq", a_ar_msg.senderID, 0)) {
  a_ar_msg[symbol("flash")] = 0;
  callMethod("AdminMessage", _me, a_ar_msg)
  } else {
  var i = 1;
  for (var t_ar_Msg of meProp(_me, "m_ar_inbox").toArray()) {
  if (lingoBinary("gt", t_ar_Msg.senderID, 0)) {
  if (callNamed("compareDates", a_ar_msg.date, t_ar_Msg.date)) {
  break;
  }

  }

  i = lingoBinary("add", i, 1);
  }

  callMethod("addAt", meProp(_me, "m_ar_inbox"), i, a_ar_msg)
  callMethod("updateCurrentView", callMethod("getInterface", _me))
  callMethod("setIconPulse", callMethod("getInterface", _me), 1)
  var t_iState = callMethod("GetState", callMethod("getInterface", _me));
  if (lingoBinary("eq", t_iState, symbol("hidden"))) {
  callMethod("setState", callMethod("getInterface", _me), symbol("waiting"))
  } else {
  callNamed("executeMessage", "PlayInterfaceSound", "UI-message")
  }

  }

}

