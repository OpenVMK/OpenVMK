// 565d7caa66391c8e45a3923725ba051b.cct / CInvPagePins / _ActivateWornPinWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ActivateWornPinWindow(_me: LingoMe, t_bState: LingoValue) {
  var t_mp_wornPins = callMethod("GetItemListByCategory", callMethod("GetInventory", callNamed("getThread", "inventory").component, 3), symbol("pins"));
  if (t_bState) {
  for (var tPin of t_mp_wornPins.toArray()) {
  callMethod("setaProp", tPin, symbol("state"), symbol("normal"))
  }

  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.takeoff.button"), symbol("blend"), 100)
  } else {
  for (var tPin of t_mp_wornPins.toArray()) {
  callMethod("setaProp", tPin, symbol("state"), symbol("invalid"))
  }

  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.takeoff.button"), symbol("blend"), 50)
  }

  return 1;
}

