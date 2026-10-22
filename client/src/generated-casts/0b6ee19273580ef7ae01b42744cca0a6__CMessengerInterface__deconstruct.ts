// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerInterface / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  callNamed("removeWindow", callMethod("getID", meProp(_me, "m_rWindow")))
  }

  if (callNamed("objectp", meProp(_me, "m_rCurrentView"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rCurrentView")))
  }

  if (callNamed("objectp", meProp(_me, "m_rAddressbookList"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rAddressbookList")))
  }

  if (callNamed("objectp", meProp(_me, "m_rPulser"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rPulser")))
  }

  setMeProp(_me, "m_rWindow", undefined);
  setMeProp(_me, "m_rCurrentView", undefined);
  setMeProp(_me, "m_rAddressbookList", undefined);
  callNamed("unregisterMessage", symbol("MinigameState"), callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("room_ready"), callMethod("getID", _me))
  callNamed("unregisterMessage", symbol("room_leave"), callMethod("getID", _me))
  return 1;
}

