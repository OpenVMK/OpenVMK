// 312ea5aa5d6c166d8f614e2d3c0e4920.cct / CGiftInterface / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("unregisterMessage", symbol("room_leave"), callMethod("getID", _me), symbol("leaveRoom"))
  callNamed("removeCannedField", callMethod("getID", meProp(_me, "m_rWindow")), "mes.messages.messageinput")
  callNamed("removeCannedField", callMethod("getID", meProp(_me, "m_rWindow")), "gift.message.hd")
  setMeProp(_me, "m_bLoadingImage", 0);
  if (callNamed("objectp", meProp(_me, "m_rGridLoadAnim"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rGridLoadAnim")))
  setMeProp(_me, "m_rGridLoadAnim", undefined);
  }

  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  callNamed("removeWindow", callMethod("getID", meProp(_me, "m_rWindow")))
  }

}

