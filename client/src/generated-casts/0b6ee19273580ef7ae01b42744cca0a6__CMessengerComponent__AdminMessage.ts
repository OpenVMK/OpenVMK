// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerComponent / AdminMessage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AdminMessage(_me: LingoMe, a_ar_msg: LingoValue) {
  a_ar_msg[symbol("senderID")] = 0;
  callMethod("addPrivilegedMessage", _me, a_ar_msg)
  var t_iState = callMethod("GetState", callMethod("getInterface", _me));
  if (lingoBinary("eq", t_iState, symbol("normal"))) {
  if (a_ar_msg[symbol("flash")]) {
  callMethod("show", callMethod("getInterface", _me))
  callMethod("changeView", callMethod("getInterface", _me), "messagesnew")
  } else {
  }

  }

  if (lingoBinary("eq", t_iState, symbol("hidden"))) {
  callMethod("setState", callMethod("getInterface", _me), symbol("waiting"))
  callMethod("changeView", callMethod("getInterface", _me), "messagesnew")
  } else {
  callNamed("executeMessage", "PlayInterfaceSound", "UI-message")
  }

  callMethod("setIconPulse", callMethod("getInterface", _me), 1)
  callMethod("updateCurrentView", callMethod("getInterface", _me))
}

